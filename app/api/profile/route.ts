import { User } from '@supabase/supabase-js';
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

async function getProfile(user: User) {
  // Initialize Supabase client
  const supabase = await createClient();
  try {
    const { data: profile, error } = await supabase
      .from(dbTables.profiles.name)
      .select('*')
      .eq(dbTables.profiles.columns.user_id, user.id)
      .single();

    console.log('error: ', error);
    if (error) {
      if (error.code === 'PGRST116') {
        const fullName = user.user_metadata?.full_name ?? '';
        const profileImage = user.user_metadata?.profile_image ?? '';
        const email = user.email ?? '';

        // Step 3: Insert a new profile if needed
        const { data: newProfile, error: insertError } = await supabase
          .from(dbTables.profiles.name)
          .insert({
            user_id: user.id,
            full_name: fullName,
            profile_image: profileImage,
          })
          .select('*')
          .single(); // Return the newly created profile

        if (insertError) throw insertError;

        return { error: null, data: newProfile };
      }
      throw error;
    }
    return { error: null, data: profile };
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

    // const { id } = user;
    // console.log('user id: ', id);
    const { data, error } = await getProfile(user);
    console.log('data get profile: ', data);
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
      error: null,
      message: 'success',
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
