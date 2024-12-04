import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

import { profileSchema } from '@/components/feature/profile/profile.data';
import { ProfileFormData } from '@/components/feature/profile/profile.types';
import { getAuth, getUser } from '@/lib/supabase/auth/server';
import { dbTables } from '@constants';
import {
  getProfile,
  updateProfile,
  uploadImageToSupabase,
} from '@services/supabase';
import { LocalResponse } from '@types';

// Default response
const res: LocalResponse<null> = {
  data: null,
  status: 500,
  message: 'Something went wrong',
  error: true,
};

const { columns } = dbTables.profiles;

function getMissingFields<T extends object>(
  body: Partial<T>,
  requiredFields: (keyof T)[],
): string[] {
  const missingFields: string[] = requiredFields
    .map((field) => field.toString())
    .filter((field) => !body[field as keyof T]);

  return missingFields;
}

export async function GET() {
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

    const { data, error } = await getProfile(user);
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
    const auth = await getAuth();
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

    const body: ProfileFormData = await req.json();
    const parsedBody = profileSchema.parse(body);

    // Define required fields
    const requiredFields = [columns.full_name, columns.profile_image];

    // Check for missing fields
    const missingFields = getMissingFields(parsedBody, requiredFields);

    if (missingFields.length > 0) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    let profileImageUrl = '';
    if (parsedBody?.profile_image?.startsWith('data:image')) {
      // Convert Blob to Buffer
      const base64Data = parsedBody.profile_image.split(',')[1]; // Extract base64 data from Data URL
      const fileBuffer = Buffer.from(base64Data, 'base64');

      // Optimize the image using Sharp
      const resizedImage = await sharp(fileBuffer)
        .resize({ width: 300, height: 300 }) // Resize image to 300x300
        .toFormat('png') // Convert to PNG
        .toBuffer();

      // Upload image to Supabase Storage
      profileImageUrl = await uploadImageToSupabase(resizedImage, user.id);

      if (!profileImageUrl) throw new Error('Failed to generate public URL');
    } else if (
      parsedBody.profile_image &&
      !parsedBody.profile_image.startsWith('data:image')
    ) {
      // If profile_image is a URL, retain it as is
      profileImageUrl = parsedBody.profile_image;
    }

    // Update profile table
    const payload: ProfileFormData = {
      full_name: parsedBody.full_name ?? '',
      profile_image: profileImageUrl ?? '',
    };

    const { data, error } = await updateProfile(user.id, payload);

    if (error) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: error,
      });
    }

    return NextResponse.json({
      ...res,
      data,
      status: 200,
      error: false,
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

export async function PATCH(req: NextRequest) {
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

    const { ...fieldsToUpdate }: Partial<ProfileFormData> = await req.json();

    if (Object.keys(fieldsToUpdate).length === 0) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Fields to update are missing',
      });
    }

    const { data, error } = await updateProfile(user.id, fieldsToUpdate);

    if (error) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: error,
      });
    }

    return NextResponse.json({
      ...res,
      data,
      status: 200,
      error: false,
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
