import { cookies } from 'next/headers';
import { decodeJwtPayload } from '@/app/lib/decodeJwt';
import { redirect } from 'next/navigation';
import Login from '../components/Login';

export default async function LoginPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
        let payload;

        try {
            payload = decodeJwtPayload(token);
        } catch (error) {
            cookieStore.delete('auth_token');
            payload = null;
        }
        if (payload) {
            redirect('/inspector');
        }
    }

    return (

        <Login />
    );
}