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
import { Button } from "@/components/ui/button"

import ExerciseItem from "./exercise-item"

function WorkoutItem({
    workout,
    workoutId,
    name,
}: {
    workout?: Workout
    name: string
    workoutId: string
}) {
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
        toast.success("Workout deleted successfully.")
    }

    return (
        <div className={cn("relative space-y-2", isDeleted && "hidden")}>
            {workout ? (
                <>
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
                                        Exercises:
                                    </AlertDialogTitle>
                                    <Alert>
                                        {workout.exercises?.map(
                                            (exercise, index) => (
                                                <ExerciseItem
                                                    key={index}
                                                    exerciseId={exercise}
                                                />
                                            )
                                        )}
                                        {workout.exercises?.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </Alert>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
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
                </>
            ) : (
                <div className="flex items-center space-x-2">
                    <p>Workout deleted.</p>
                    <Button
                        variant={"destructive"}
                        onClick={() => handleDelete(workoutId)}
                    >
                        <Trash className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default WorkoutItem
