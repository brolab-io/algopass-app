import { Database } from "./supabase.types";

export { default as supabaseServer } from "./server";

export type TUser = Database["public"]["Tables"]["user"]["Row"] & {
  social_links: Database["public"]["Tables"]["social_links"]["Row"][];
};

export type TSocialLink = Database["public"]["Tables"]["social_links"]["Row"];
