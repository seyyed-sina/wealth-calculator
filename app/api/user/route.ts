import { NextResponse } from 'next/server';

import { getUser } from '@/lib/supabase/auth/server';
import { LocalResponse } from '@types';

export async function GET() {
  const res: LocalResponse<null> = {
    data: null,
    status: 500,
    message: 'Something went wrong',
    error: true,
  };

  try {
    const {
      data: { user },
      error: userError,
    } = await getUser();

    if (userError || !user) {
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
