import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(1, 'لطفا نام و نام خانوادگی خود را وارد کنید'),
  profile_image: z.string().optional(),
  email: z.string().email('ایمیل وارد شده نادرست است').optional(),
});
