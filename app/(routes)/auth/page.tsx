"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Database } from "@/types/database"

export default async function SignUpForm() {
    const supabase = createClientComponentClient<Database>()

    const updateUsernameResponse = await supabase
        .from("profiles")
        .update({ username: "marek" })
        .eq("id", "5add0c2a-d05a-42ab-b943-c82b976449f6")
        .select()

    console.log(updateUsernameResponse)

    if (updateUsernameResponse.error) {
        console.error(
            "Error inserting into profiles:",
            updateUsernameResponse.error
        )
        return
    }

    return (
        <div className="text-black">
            {JSON.stringify(updateUsernameResponse)}
        </div>
    )
}
