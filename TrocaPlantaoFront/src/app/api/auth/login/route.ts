import { NextResponse } from "next/server";
import { proxyFetch } from "@/app/lib/proxyfetch";

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();

        return await proxyFetch(`/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": req.headers.get("content-type") ?? "application/json",
            },
            body: bodyText,
        });
    } catch (err) {
        console.error("api/auth/login POST proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}
