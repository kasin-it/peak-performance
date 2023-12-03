"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"


import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"

function ExerciseDeleteDialog({
    exerciseId,
    setIsDeleted,
}: {
    exerciseId: string
    setIsDeleted: (value: boolean) => void
}) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [isMounted, setIsMounted] = useState(false)

    const onDelete = async () => {
        const { data: _, error } = await supabase
            .from("user_exercises")
            .delete()
            .eq("id", exerciseId)

        if (error) {
            toast.error("Exercise has not been deleted.")
            return
        }
        setIsDeleted(true)
        toast.success("exercise has been created successfully!")
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }

    return (
        <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
        </Button>
    )
}
export default ExerciseDeleteDialog
