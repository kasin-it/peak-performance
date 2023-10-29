import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { Button } from '../ui/button';
import Link from 'next/link';

async function AccountSectionMobile() {
    const cookieStore = cookies();

    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return (
            <>
                <Link
                    href="/user"
                    className="text-blue-300 hover:text-blue-500 p-2"
                >
                    <User2 className=" w-9 h-9" />
                </Link>
            </>
        );
    }

    return (
        <>
            <Link
                href="/auth"
                className="text-blue-300 hover:text-blue-500 p-2"
            >
                <User2 className=" w-9 h-9" />
            </Link>
        </>
    );
}
export default AccountSectionMobile;
