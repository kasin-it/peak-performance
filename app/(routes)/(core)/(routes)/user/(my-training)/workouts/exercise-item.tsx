"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import ExerciseFullDescriptionDialog from "@/components/ui/exercise-full-desctiption-dialog"

function ExerciseItem({
    exercise,
    workoutId,
    exerciseId,
}: {
    exercise?: Exercise
    workoutId: string
    exerciseId: string
}) {
    const [isDeleted, setIsDeleted] = useState(false)

    const handleDelete = async (workoutId: string, exerciseId: string) => {
        try {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            )

            const { data: _, error } = await supabase.rpc(
                "delete_exercise_from_workout",
                {
                    workout_id: workoutId,
                    exercise_id: exerciseId,
                }
            )

            if (error) {
                toast.error("Failed to delete exercise. Please try again.")
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
            {exercise ? (
                <>
                    {exercise && (
                        <>
                            <div className="flex w-full items-center justify-between">
                                <AlertTitle className="w-full max-w-[80%] break-words text-xl">
                                    {exercise.name}
                                </AlertTitle>
                                <Button
                                    className="h-8 p-0 px-3"
                                    variant={"destructive"}
                                    onClick={() =>
                                        handleDelete(workoutId, exercise.id)
                                    }
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <p
                                className={cn(
                                    exercise.instructions?.length! > 100
                                        ? "line-clamp-[2] overflow-hidden bg-gradient-to-b from-primary bg-clip-text text-transparent"
                                        : null
                                )}
                            >
                                {exercise.instructions}
                            </p>
                            {exercise.instructions?.length! > 100 ? (
                                <ExerciseFullDescriptionDialog
                                    instructions={exercise.instructions!}
                                />
                            ) : null}
                            <AlertDescription className="text-xl font-bold">
                                {exercise.sets} x {exercise.repetitions}
                            </AlertDescription>
                        </>
                    )}
                </>
            ) : (
                <div className="flex items-center space-x-2">
                    <p>Exercise not found.</p>
                    <Button
                        variant={"destructive"}
                        onClick={() => handleDelete(workoutId, exerciseId)}
                    >
                        <Trash className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </Alert>
    )
}

export default ExerciseItem
