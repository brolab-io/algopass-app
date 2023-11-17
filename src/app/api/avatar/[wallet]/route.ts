import { updateAvatar } from '@/services/profile.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { wallet: string } }) {
    const formData = await req.formData();
    console.log("formData", formData);
    let body = Object.fromEntries(formData);
    if (!body['file']) {
        return NextResponse.json({ message: "File not provide" }, {
            status: 502,
        });
    }
    console.log("body", body);
    await updateAvatar(params.wallet, body['file'] as File);
    return NextResponse.json({ ok: true });
}