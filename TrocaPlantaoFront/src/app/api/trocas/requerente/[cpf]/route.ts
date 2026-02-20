import { NextResponse } from "next/server";
import { proxyFetch } from "@/app/lib/proxyfetch";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ cpf: string }> }) {
    try {
        const { cpf } = await params;
        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token")?.value;

        return await proxyFetch(`/trocas/requerente/${encodeURIComponent(cpf)}`, {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("api/trocas/requerente/[cpf] GET proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}
