"use server";
import { revalidatePath } from "next/cache";
import { TAlgopass, supabaseServer } from "@/utils/supabase";
import { Algodv2, decodeAddress } from "algosdk";
import { decodeProfile } from "@/utils/decode.util";
import { isProfileNotFound } from "@/utils/contract.util";

const appID = Number(process.env.NEXT_PUBLIC_ALGOD_APP_ID)!;

const getAlgodClient = () => {
  const algodToken = process.env.NEXT_PUBLIC_ALGOD_TOKEN;
  const algodServer = process.env.NEXT_PUBLIC_ALGOD_SERVER;
  const algodPort = process.env.NEXT_PUBLIC_ALGOD_PORT;
  if (typeof algodToken !== "string") throw new Error("Missing Algod Token");
  if (typeof algodServer !== "string") throw new Error("Missing Algod Server");
  return new Algodv2(algodToken, algodServer, algodPort);
};

export const getAlgoProfile = async (wallet: string) => {
  if (wallet.startsWith("%40")) {
    wallet = wallet.slice(3);
  }
  try {
    const box = await getAlgodClient()
      .getApplicationBoxByName(appID, decodeAddress(wallet).publicKey)
      .do();
    return decodeProfile(box.value);
  } catch (error) {
    if (isProfileNotFound(error)) return null;
    throw error;
  }
};

export const getProfile = async (wallet?: string) => {
  if (!wallet) {
    return Promise.reject(new Error("Wallet address not provided!"));
  }
  if (wallet.startsWith("%40")) {
    wallet = wallet.slice(3);
  }
  const { data, error } = await supabaseServer
    .from("algopass")
    .select("*")
    .or(`wallet.eq.${wallet},name.eq.${wallet}`)
    .maybeSingle();

  if (error) {
    return Promise.reject(error);
  }
  return data;
};

export type ProfilePayload = {
  name: string;
  bio: string;
  urls: [string, string][]
};
export const updateProfile = async (wallet: string, payload: ProfilePayload) => {
  for (const k in payload) {
    if (!payload[k as keyof ProfilePayload]) {
      delete payload[k as keyof ProfilePayload];
    }
  }
  try {
    const { error } = await supabaseServer
      .from("algopass")
      .upsert({
        wallet,
        ...payload,
      }, {
        onConflict: 'wallet'
      })
      .maybeSingle();
    if (error) {
      throw error;
    }

    revalidatePath(`/@${wallet}`);
    revalidatePath(`/@${payload.name}`);

    return getProfile(wallet);
  } catch (error) {
    console.log("Cached error", error);
    return Promise.reject(error);
  }
};


