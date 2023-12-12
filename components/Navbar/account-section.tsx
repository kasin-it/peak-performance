"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { User2 } from "lucide-react"

import { Button } from "../ui/button"

function AccountSection() {
    const [user, setUser] = useState(false)
    const pathname = usePathname()

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
                    href={
                        pathname.startsWith("/auth") ||
                        pathname == "/user"
                            ? "/"
                            : "/user"
                    }
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
