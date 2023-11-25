"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function ExerciseDeleteDialog({ exerciseId }: { exerciseId: string }) {
    const supabase = createClientComponentClient()
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
        toast.success("exercise has been created successfully!")
        window.location.reload()
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button size="sm" variant="destructive">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your exercise.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default ExerciseDeleteDialog
