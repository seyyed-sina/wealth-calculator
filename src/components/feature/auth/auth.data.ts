import { z } from 'zod';

export const signUpSchema = z.object({
  full_name: z.string().min(1, 'لطفا نام و نام خانوادگی خود را وارد کنید'),
  email: z
    .string()
    .min(1, 'لطفا ایمیل خود را وارد کنید')
    .email('ایمیل وارد شده نادرست است'),
  password: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
});
