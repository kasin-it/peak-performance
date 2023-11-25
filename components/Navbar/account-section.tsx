import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { User2 } from "lucide-react"

import { Button } from "../ui/button"

async function AccountSection() {
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        return (
            <>
                <Link
                    href="/user"
                    className="p-2 text-blue-300 hover:text-blue-500"
                >
                    <User2 className=" h-8 w-8" strokeWidth={"1px"} />
                </Link>
            </>
        )
    }

    return (
        <>
            <Link href={"/auth/sign-in"}>
                <Button
                    className="text-md font-black  uppercase"
                    variant={"outline"}
                >
                    Sign in
                </Button>
            </Link>
            <Link href={"/auth/sign-up"}>
                <Button
                    className="text-md font-black uppercase"
                    variant={"default"}
                >
                    Sign up
                </Button>
            </Link>
        </>
    )
}
export default AccountSection
