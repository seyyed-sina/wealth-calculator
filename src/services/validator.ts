import { z } from 'zod';

export const profileImageSchema = z.object({
  profile_image: z.string().min(1, 'Image is required'),
});
