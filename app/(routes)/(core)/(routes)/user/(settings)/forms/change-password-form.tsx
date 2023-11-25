"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"

function ChangePasswordForm() {
    const supabase = createClientComponentClient()
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
        <Button className="w-full" onClick={onSubmit}>
            <p className="px-5">RESET PASSWORD</p>
        </Button>
    )
}
export default ChangePasswordForm
