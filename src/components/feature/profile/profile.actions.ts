'use server';;
import { createClient } from '@/lib/supabase/server';
import { getErrorMessage } from '@utils';

// import { ProfileForm } from './profile.types';


// export const updateUserAction = async (formData: ProfileForm) => {
//   try {
//     const supabase = await createClient();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     const { data, error } = await supabase
//       .from('profiles')
//       .upsert<{ user_id?: string; full_name: string }>({
//         user_id: user?.id,
//         full_name: formData.full_name,
//       });

//     console.log('error: ', error);
//     if (error) throw error;
//     return { errorMessage: null, data };
//   } catch (error) {
//     return { errorMessage: getErrorMessage(error) };
//   }
// };
