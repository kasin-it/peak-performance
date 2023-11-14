"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from "react-hot-toast"

import { Database } from "@/types/database"
import { Button } from "@/components/ui/button"

function ChangePasswordForm() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const onSubmit: React.MouseEventHandler = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data: _, error } = await supabase.auth.resetPasswordForEmail(
            user!.email!
        )

        if (error) {
            return
        }
        toast.success("Check your email for a link to change password.", {
            duration: 10000,
        })
    }

    return (
        <Button className="w-[160px]" onClick={onSubmit} variant={"secondary"}>
            <p className="px-5">RESET PASSWORD</p>
        </Button>
    )
}
export default ChangePasswordForm
