declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_REDIRECT_URI: string;
  }
}
