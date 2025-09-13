/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
	readonly VITE_SUPABASE_PROJECT_URL: string;
	readonly VITE_SUPABASE_TABLE_NAME: string;
	readonly VITE_PRAYER_TIMES_API_KEY: string;
	readonly VITE_GOOGLE_ANALYTICS_ID: string;
	readonly VITE_DEBUG_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
