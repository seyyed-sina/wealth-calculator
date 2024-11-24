export const dbTables = {
  profiles: {
    name: 'profiles',
    columns: {
      id: 'id',
      user_id: 'user_id',
      full_name: 'full_name',
      updated_at: 'updated_at',
      created_at: 'created_at',
    },
  },
} as const;
