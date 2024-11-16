import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { env, routes } from '@constants';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

async function checkSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = new URL(request.url).pathname;

  const protectedRoutes: string[] = [routes.PROFILE];
  const authRoutes: string[] = [routes.SIGN_IN, routes.SIGN_UP];

  const isProtectedRoute = protectedRoutes.includes(path);
  // const isAuthRoute = authRoutes.includes(path);
  const isAuthRoute = authRoutes.some((p) => path.startsWith(p));

  if (isProtectedRoute || isAuthRoute) {
    const user = await checkSession(request);

    if (isProtectedRoute && !user) {
      // no user, potentially respond by redirecting the user to the login page
      // return NextResponse.redirect(new URL(routes.SIGN_IN, request.url));
      const url = request.nextUrl.clone();
      url.pathname = routes.SIGN_IN;
      return NextResponse.redirect(url);
    }

    if (isAuthRoute && user) {
      // user is signed in, potentially respond
      // by redirecting the user to the home page
      // return NextResponse.redirect(new URL('/', request.url));
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
