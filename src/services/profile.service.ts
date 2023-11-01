"use server";
import { revalidatePath } from "next/cache";
import { TSocialLink, supabaseServer } from "@/utils/supabase";

export const getProfile = async (wallet?: string) => {
  if (!wallet) {
    return Promise.reject(new Error("Wallet address not provided!"));
  }
  const { data, error } = await supabaseServer
    .from("user")
    .select("*, social_links(*)")
    .or(`wallet.eq.${wallet},username.eq.${wallet}`)
    .maybeSingle();

  if (error) {
    return Promise.reject(error);
  }
  return data;
};

type ProfilePayload = {
  username: string;
  display_name: string;
  bio: string;
  avatar?: string;
};
export const updateProfile = async (wallet: string, payload: ProfilePayload) => {
  for (const k in payload) {
    if (!payload[k as keyof ProfilePayload]) {
      delete payload[k as keyof ProfilePayload];
    }
  }
  try {
    const { error } = await supabaseServer
      .from("user")
      .upsert({
        wallet,
        ...payload,
      })
      .maybeSingle();
    if (error) {
      throw error;
    }

    revalidatePath(`/u/${wallet}`);
    revalidatePath(`/u/${payload.username}`);

    return getProfile(wallet);
  } catch (error) {
    console.log("Cached error", error);
    return Promise.reject(error);
  }
};

type SocialLinksPayload = Pick<TSocialLink, "url" | "title">[];
export const updateSocialLinks = async (wallet: string, payload: SocialLinksPayload) => {
  const profile = await getProfile(wallet);
  if (!profile) {
    return Promise.reject(new Error("Profile not found!"));
  }

  const deleteIds = profile.social_links
    .filter((link) => !payload.find((l) => l.url === link.url))
    .map((link) => link.id);

  const { error: deleteError } = await supabaseServer
    .from("social_links")
    .delete()
    .in("id", deleteIds);

  if (deleteError) {
    return Promise.reject(deleteError);
  }

  const { error: insertError } = await supabaseServer.from("social_links").upsert(
    payload.map((link) => ({ wallet, ...link })),
    {
      defaultToNull: false,
    }
  );

  if (insertError) {
    return Promise.reject(insertError);
  }

  revalidatePath(`/u/${wallet}`);
  revalidatePath(`/u/${profile.username}`);

  return getProfile(wallet);
};
