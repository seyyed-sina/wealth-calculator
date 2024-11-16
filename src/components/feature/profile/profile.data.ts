import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(1, 'لطفا نام و نام خانوادگی خود را وارد کنید'),
});
