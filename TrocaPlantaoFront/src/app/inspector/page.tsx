import Inspector from "../components/Inspector";

import { cookies } from 'next/headers';
import { decodeJwtPayload } from '@/app/lib/decodeJwt';
import { redirect } from 'next/navigation';

export default async function InspectorPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    const claims = decodeJwtPayload(token as string | undefined);
    const expired = claims && claims.exp * 1000 < Date.now();
    const nomeBase = claims && claims.nomeBase;


    if (!claims || expired) {
        redirect('/login');
    }

    return (
        <Inspector nomeBase={nomeBase} />

    );
}