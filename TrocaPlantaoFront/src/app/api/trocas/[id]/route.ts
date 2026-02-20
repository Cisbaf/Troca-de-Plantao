import { NextResponse } from "next/server";
import { proxyFetch } from "@/app/lib/proxyfetch";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token")?.value;

        return await proxyFetch(`/trocas/${encodeURIComponent(id)}`, {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("api/trocas/[id] GET proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token")?.value;

        return await proxyFetch(`/trocas/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("api/trocas/[id] DELETE proxy error:", err);
        return NextResponse.json({ message: "Erro interno", detail: String(err) }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const { searchParams } = new URL(req.url);
        const aceitoSN = searchParams.get("aceitoSN");
        const nome = searchParams.get("nomeInspector");
        const motivoRecusa = searchParams.get("motivoRecusa") || "";

        if (!aceitoSN) {
            return NextResponse.json(
                { message: "Parametro aceitoSN obrigatório" },
                { status: 400 }
            );
        }

        const cookieStore = cookies();
        const token = (await cookieStore).get("auth_token")?.value;

        return await proxyFetch(`/trocas/finalizar/${encodeURIComponent(id)}?aceitoSN=${aceitoSN}&nomeInspector=${encodeURIComponent(nome || "")}&motivoTroca=${encodeURIComponent(motivoRecusa)}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
    } catch (err) {
        console.error("api/trocas/[id] PUT proxy error:", err);
        return NextResponse.json(
            { message: "Erro interno", detail: String(err) },
            { status: 500 }
        );
    }
}