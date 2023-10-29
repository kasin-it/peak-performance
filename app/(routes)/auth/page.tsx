"use client"

import * as React from "react"
import { useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

export default function SignUpForm() {
    const getData = async () => {
        const supabase = createClientComponentClient<Database>()

        const { data } = await supabase.auth.getUser()

        const updateUsernameResponse = await supabase
            .from("profiles")
            .update({
                // id: data.user?.id,
                username: "judasz",
            })
            .eq("id", data.user!.id)
            .select()

        console.log(updateUsernameResponse)

        // console.log(data.user?.id)

        if (updateUsernameResponse.error) {
            console.error(
                "Error inserting into profiles:",
                updateUsernameResponse.error
            )
            return
        }
    }

    useEffect(() => {
        getData()
    })

    return <div className="text-black">siema</div>
}
