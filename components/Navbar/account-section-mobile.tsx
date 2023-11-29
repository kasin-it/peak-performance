"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import { User2 } from "lucide-react"

function AccountSectionMobile() {
    const [user, setUser] = useState(false)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const getUser = useCallback(async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            setUser(true)
        }

        return user
    }, [supabase, setUser])

    useEffect(() => {
        getUser()
    }, [getUser])

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
                href="/user"
                className="p-2 text-blue-300 hover:text-blue-500"
            >
                <User2 strokeWidth={"1px"} className=" h-9 w-9" />
            </Link>
        </>
    )
}
export default AccountSectionMobile
