import { NextResponse } from 'next/server';

import { ProfileFormData } from '@/components/feature/profile/profile.types';
import { getSupabaseAuth } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { dbTables } from '@constants';
import { LocalResponse } from '@types';
import { getErrorMessage } from '@utils';

// Default response
const res: LocalResponse<null> = {
  data: null,
  status: 500,
  message: 'Something went wrong',
  error: true,
};

async function checkUser() {
  const auth = await getSupabaseAuth();
  const {
    data: { user },
  } = await auth.getUser();

  return user;
}

async function getProfile(userId: string) {
  // Initialize Supabase client
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from(dbTables.profiles.name)
      .select('*')
      .eq(dbTables.profiles.columns.user_id, userId)
      .single();

    console.log('error: ', error);
    if (error) throw error;
    return { error: null, data };
  } catch (error) {
    return { error: getErrorMessage(error), data: null };
  }
}

async function updateProfile(
  userId: string,
  payload: Partial<ProfileFormData>,
) {
  // Initialize Supabase client
  const supabase = await createClient();
  try {
    // const { data, error } = await supabase
    // .from(dbTables.profiles.name)
    // .update(payload)
    // .eq(dbTables.profiles.columns.user_id, userId)
    // .select()
    // .single();
    const { data, error } = await supabase
      .from(dbTables.profiles.name)
      .upsert(
        { user_id: userId, ...payload },
        { onConflict: dbTables.profiles.columns.user_id },
      )
      .select();

    console.log('error to put: ', error);
    console.log('data to put: ', data);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function GET() {
  try {
    const user = await checkUser();

    if (!user) {
      return NextResponse.json({
        ...res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    const { id } = user;
    const { data, error } = await getProfile(id);
    if (error) {
      return NextResponse.json({
        ...res,
        message: error,
      });
    }

    return NextResponse.json({
      ...res,
      status: 200,
      data,
    });
  } catch {
    return NextResponse.json({
      ...res,
      status: 500,
      message: 'Something went wrong',
    });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await getSupabaseAuth();
    const {
      data: { user },
    } = await auth.getUser();
    console.log('user in api put route: ', user);

    if (!user) {
      return NextResponse.json({
        ...res,
        status: 401,
        message: 'Unauthorized',
      });
    }

    const { id } = user;
    const body = await req.json();
    const { data, error } = await updateProfile(
      id,
      body as Partial<ProfileFormData>,
    );

    if (error) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: error,
      });
    }

    return NextResponse.json({
      ...res,
      status: 200,
      data,
    });
  } catch {
    return NextResponse.json({
      ...res,
      status: 500,
      message: 'Something went wrong',
    });
  }
}
