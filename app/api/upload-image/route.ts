import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

import { getUser } from '@/lib/supabase/auth/server';
import { uploadImageToSupabase } from '@services/supabase';
import { LocalResponse } from '@types';
import { getErrorMessage } from '@utils';

const res: LocalResponse<null> = {
  data: null,
  status: 500,
  message: 'Something went wrong',
  error: true,
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
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

    const contentType = req.headers.get('Content-Type') ?? '';

    // Check if content type is multipart/form-data
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Invalid Content-Type, must be multipart/form-data',
      });
    }

    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Bad request',
      });
    }

    const file = formData.get('profile_image') as Blob;

    // Check image size
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Image size must be less than 1MB',
      });
    }

    // Check file format
    if (
      ![
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/webp',
      ].includes(file.type)
    ) {
      return NextResponse.json({
        ...res,
        status: 400,
        message: 'Invalid file format',
      });
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Resize/optimize the image using Sharp
    const optimizedImage = await sharp(buffer)
      .resize(300, 300)
      .toFormat('png')
      .toBuffer();

    const profile_image_url = await uploadImageToSupabase(
      optimizedImage,
      user.id,
    );

    return NextResponse.json({
      ...res,
      data: profile_image_url,
      status: 200,
      error: false,
      message: 'success',
    });
  } catch (error) {
    return NextResponse.json({
      ...res,
      status: 500,
      message: `Something went wrong ${getErrorMessage(error)}`,
    });
  }
}
