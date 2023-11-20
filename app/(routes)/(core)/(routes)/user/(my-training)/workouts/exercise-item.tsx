"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function ExerciseItem({
    exercise,
    workoutId,
}: {
    exercise: Exercise
    workoutId: string
}) {
    const supabase = createClientComponentClient()
    const [isDeleted, setIsDeleted] = useState(false)

    const handleDelete = async (workoutId: string, exerciseId: string) => {
        try {
            const { data: _, error } = await supabase.rpc(
                "delete_exercise_from_workout",
                {
                    workout_id: workoutId,
                    exercise_id: exerciseId,
                }
            )

            if (error) {
                toast.error("Failed to delete exercise. Please try again.")
                console.log(error)
                return
            }

            // Additional success handling if needed
        } catch (error) {
            toast.error("Failed to delete exercise. Please try again.")
        }

        setIsDeleted(true)
        toast.success("Exercise deleted succesfully.")
    }

    return (
        <Alert className={cn("relative", isDeleted ? "hidden" : "")}>
            {exercise && (
                <>
                    <AlertTitle>{exercise.name}</AlertTitle>
                    <AlertDescription>{exercise.instructions}</AlertDescription>
                    <AlertDescription>
                        {exercise.sets} x {exercise.repetitions}
                    </AlertDescription>

                    <div
                        className="absolute right-5 top-2 cursor-pointer rounded-md bg-red-500 p-2 text-white hover:opacity-70"
                        onClick={() => handleDelete(workoutId, exercise.id)}
                    >
                        <Trash className="h-4 w-4" />
                    </div>
                </>
            )}
            {!exercise && (
                <>
                    <AlertDescription>Exercise nmot found</AlertDescription>
                </>
            )}
        </Alert>
    )
}

export default ExerciseItem
