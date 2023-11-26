import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { User2 } from "lucide-react"

async function AccountSectionMobile() {
    const cookieStore = cookies()

    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    })

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
                    <User2 className=" h-9 w-9" strokeWidth={"1px"} />
                </Link>
            </>
        )
    }

    return (
        <>
            <Link
                href="/auth"
                className="p-2 text-blue-300 hover:text-blue-500"
            >
                <User2 className=" h-9 w-9" />
            </Link>
        </>
    )
}
export default AccountSectionMobile
