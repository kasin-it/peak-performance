"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User2 } from "lucide-react"

function AccountSectionMobile() {
    const pathname = usePathname()
    return (
        <>
            <Link
                href={
                    pathname.startsWith("/auth") || pathname == "/user"
                        ? "/"
                        : "/user"
                }
                className="p-2 text-blue-300 hover:text-blue-500"
            >
                <User2 strokeWidth={"1px"} className=" h-9 w-9" />
            </Link>
        </>
    )
}
export default AccountSectionMobile
