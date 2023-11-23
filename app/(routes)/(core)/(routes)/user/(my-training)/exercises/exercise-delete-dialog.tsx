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

function ExerciseDeleteDialog({ exerciseId }: { exerciseId: string }) {
    const supabase = createClientComponentClient()
    const [isMounted, setIsMounted] = useState(false)

    const onDelete = async () => {
        const { data: _, error } = await supabase
            .from("user_exercises")
            .delete()
            .eq("id", exerciseId)

        if (error) {
            toast.error("exercise has not been deleted.")
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
            <AlertDialogTrigger asChild>
                <div className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:opacity-70">
                    <Trash className="h-4 w-4" />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
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
