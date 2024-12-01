'server-only';
import { SupabaseUser } from '@supabase/supabase-js';
import { v4 as uuid_v4 } from 'uuid';

import { ProfileFormData } from '@/components/feature/profile/profile.types';
import { createClient } from '@/lib/supabase/server';
import { dbStorage, dbTables } from '@constants';
import { getErrorMessage } from '@utils';

export async function getProfile(user: SupabaseUser) {
  const supabase = await createClient();
  try {
    const { data: profile, error } = await supabase
      .from(dbTables.profiles.name)
      .select('*')
      .eq(dbTables.profiles.columns.user_id, user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        const fullName = user.user_metadata?.full_name ?? '';
        const profileImage = user.user_metadata?.avatar_url ?? '';
        const email = user.email ?? '';

        // Step 3: Insert a new profile if needed
        const { data: newProfile, error: insertError } = await supabase
          .from(dbTables.profiles.name)
          .insert({
            user_id: user.id,
            full_name: fullName,
            email,
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

export async function updateProfile(
  userId: string,
  payload: Partial<ProfileFormData>,
) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from(dbTables.profiles.name)
      .upsert(
        { user_id: userId, ...payload },
        { onConflict: dbTables.profiles.columns.user_id },
      )
      .select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function uploadImageToSupabase(
  fileBuffer: Buffer,
  userId: string,
) {
  const supabase = await createClient();
  const filePath = `${userId}/${uuid_v4()}-profile-image.png`;

  try {
    const { error } = await supabase.storage
      .from(dbStorage.profileImages) // Supabase bucket name
      .upload(filePath, fileBuffer, {
        contentType: 'image/png',
        upsert: true, // Replace existing file if it exists
      });

    const { data: profileData } = await supabase
      .from(dbTables.profiles.name)
      .select(dbTables.profiles.columns.profile_image)
      .eq(dbTables.profiles.columns.user_id, userId)
      .single();

    if (profileData?.profile_image) {
      const oldFilePath = profileData.profile_image.replace(filePath, '');
      await supabase.storage
        .from(dbStorage.profileImages)
        .remove([oldFilePath]);
    }

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(dbStorage.profileImages).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
