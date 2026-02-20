import { NextResponse } from "next/server";
import { proxyFetch } from "@/app/lib/proxyfetch";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        return await proxyFetch(`/trocas/requerente/${encodeURIComponent(id)}`, {
            cache: "no-store",
        });
    } catch (err) {
        console.error("api/trocas/requerente/[cpf] GET proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}