import { NextResponse } from 'next/server';

import { getSupabaseAuth } from '@/lib/supabase/auth';
import { LocalResponse } from '@types';

export async function GET() {
  const res: LocalResponse<null> = {
    data: null,
    status: 500,
    message: 'Something went wrong',
    error: true,
  };

  try {
    const auth = await getSupabaseAuth();
    const {
      data: { user },
    } = await auth.getUser();

    if (!user) {
      return NextResponse.json({
        ...res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    return NextResponse.json({
      data: { ...user },
      status: 200,
      message: 'success',
      error: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        ...res,
        data: error.message,
      });
    }

    return NextResponse.json({
      ...res,
      status: 400,
      message: 'Invalid request data',
    });
  }
}
