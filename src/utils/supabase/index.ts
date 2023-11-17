import { Database } from "./supabase.types";

export { default as supabaseServer } from "./server";

export type TAlgopass = Database["public"]["Tables"]["algopass"]["Row"] & {
  social_links: Database["public"]["Tables"]["algopass"]["Row"][];
};

