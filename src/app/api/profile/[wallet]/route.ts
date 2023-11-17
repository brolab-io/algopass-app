import { ProfilePayload, getProfile, updateProfile } from "@/services/profile.service";
import { decodeProfile } from "@/utils/decode.util";
import { Algodv2, decodeAddress } from "algosdk";
import { NextResponse } from "next/server";

const getAlgoClient = () => {
    const algodToken = process.env.NEXT_PUBLIC_ALGOD_TOKEN;
    const algodServer = process.env.NEXT_PUBLIC_ALGOD_SERVER;
    const algodPort = process.env.NEXT_PUBLIC_ALGOD_PORT;
    if (typeof algodToken !== "string") throw new Error("Missing Algod Token");
    if (typeof algodServer !== "string")
        throw new Error("Missing Algod Server");
    return new Algodv2(algodToken, algodServer, algodPort);
}

export async function GET(req: Request, { params }: { params: { wallet: string } }) {
    const { wallet } = params;
    const profile = await getProfile(wallet);
    if (!profile) {
        return NextResponse.json({ message: "Profile not found" }, {
            status: 404,
        });
    }
    return NextResponse.json({ data: profile })
}

type ProfileUpdatePayload = ProfilePayload & { signature: Uint8Array }

export async function POST(req: Request, { params }: { params: { wallet: string } }) {
    const { wallet } = params;
    // const { name, bio, urls, signature }: ProfileUpdatePayload = await req.json()
    // if (!name) {
    //     return Response.json({ message: "Name is required" }, {
    //         status: 400,
    //     });
    // }
    const client = getAlgoClient();
    const box = await client
        .getApplicationBoxByName(Number(process.env.NEXT_PUBLIC_ALGOD_APP_ID), decodeAddress(wallet).publicKey)
        .do();
    const { name, bio, urls } = decodeProfile(box.value);
    const profile = await updateProfile(wallet, { name, bio, urls });
    return NextResponse.json({ message: "Profile updated", data: profile })
}