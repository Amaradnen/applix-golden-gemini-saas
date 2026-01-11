import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/env";

// Server-side Supabase client (uses Service Role key for trusted operations)
export function supabaseAdmin() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRole = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}
