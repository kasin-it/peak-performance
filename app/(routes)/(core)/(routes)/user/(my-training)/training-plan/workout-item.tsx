"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Info, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Workout } from "@/types/types"
import { cn } from "@/lib/utils"
import { Alert } from "@/components/ui/alert"
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
import { Skeleton } from "@/components/ui/skeleton"

import ExerciseItem from "./exercise-item"

function WorkoutItem({ workout, name }: { workout: Workout; name: string }) {
    const supabase = createClientComponentClient()

    const [isDeleted, setIsDeleted] = useState(false)

    const handleDelete = async (id: string) => {
        try {
            const { data: _, error } = await supabase.rpc(
                "delete_item_from_training_plan_column",
                {
                    day: name,
                    workout_id: id,
                }
            )

            if (error) {
                toast.error("Failed to delete workout. Please try again.")
                console.log(error)
            }

            // Additional success handling if needed
        } catch (error) {
            toast.error("Failed to delete workout. Please try again.")
        }

        setIsDeleted(true)
        toast.success("Workout deleted succesfully.")
    }

    return (
        <div className={cn("relative space-y-2", isDeleted && "hidden")}>
            <h4 className="text-lg font-semibold">{workout.name}</h4>
            <p className="text-sm">{workout.desc}</p>
            <div className="absolute right-5 top-2 flex space-x-2">
                <AlertDialog>
                    <AlertDialogTrigger>
                        {" "}
                        <div className="cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:opacity-70">
                            <Info className="h-4 w-4" />
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <Alert>
                                {workout.exercises?.map((exercise) => (
                                    <ExerciseItem />
                                ))}
                                {!workout.exercises && <p>Empty</p>}
                            </Alert>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div
                    className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:opacity-70"
                    onClick={() => handleDelete(workout.id)}
                >
                    <Trash className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}

export default WorkoutItem
