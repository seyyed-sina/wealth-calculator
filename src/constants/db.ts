export const dbTables = {
  profiles: {
    name: 'profiles',
    columns: {
      id: 'id',
      user_id: 'user_id',
      full_name: 'full_name',
      profile_image: 'profile_image',
      updated_at: 'updated_at',
      created_at: 'created_at',
    },
  },
} as const;

export const dbStorage = {
  profileImages: 'profile-images',
} as const;
