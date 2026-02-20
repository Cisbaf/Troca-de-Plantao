import { NextResponse } from "next/server";
import { proxyFetch } from "@/app/lib/proxyfetch";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token")?.value;
        return await proxyFetch(`/trocas`, {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("api/trocas GET proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        console.log("POST")
        const form = await req.formData();

        const backendRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/trocas`,
            {
                method: "POST",
                body: form,
            }
        );

        const body = await backendRes.arrayBuffer(); // importante p/ multipart

        return new NextResponse(body, {
            status: backendRes.status,
            headers: backendRes.headers,
        });

    } catch (err) {
        console.error("Proxy error:", err);
        return NextResponse.json(
            { message: "Erro interno", detail: String(err) },
            { status: 500 }
        );
    }
}
