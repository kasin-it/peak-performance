"use client"

import { createBrowserClient } from "@supabase/ssr"

import { Button } from "@/components/ui/button"

function SignOutForm() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const onSubmit = async () => {
        await supabase.auth.signOut()
        window.location.reload()
    }

    return <Button onClick={onSubmit}>Sign Out</Button>
}
export default SignOutForm
