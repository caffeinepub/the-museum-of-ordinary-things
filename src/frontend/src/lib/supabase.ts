import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gtourplgoowneqorkuhv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xctjnofY8H7C46ZsE7USOw_XtD5uPnr";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseArtifact {
  id: string;
  object_name: string;
  story: string;
  image_url: string | null;
  contributor_name: string | null;
  created_at: string;
}
