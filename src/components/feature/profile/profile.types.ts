import { SupabaseUser } from "@supabase/supabase-js";

export interface Profile extends SupabaseUser {
  user_id: string;
  full_name: string;
  profile_image?: string;
};

export interface ProfileFormData {
  full_name: string;
  profile_image?: string;
  //   password: string;
}
