"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Exercise } from "@/types/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

function ExerciseItem({ exerciseId }: { exerciseId: string }) {
    const supabase = createClientComponentClient()
    const [exercise, setExercise] = useState<Exercise | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchExercise = async () => {
        try {
            const { data, error } = await supabase
                .from("user_exercises")
                .select()
                .eq("id", exerciseId)

            if (error) {
                throw error
            }

            if (data && data.length > 0) {
                setExercise(data[0])
            } else {
                setExercise(null)
            }
        } catch (error) {
            setError("An error occurred while fetching data.")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchExercise()
    }, [exerciseId])

    return (
        <Alert className="relative">
            {isLoading && <AlertTitle>Loading...</AlertTitle>}
            {error && <AlertTitle>Error: {error}</AlertTitle>}
            {exercise && (
                <>
                    <AlertTitle>{exercise.name}</AlertTitle>
                    <AlertDescription>{exercise.instructions}</AlertDescription>
                    <AlertDescription>
                        {exercise.sets} x {exercise.repetitions}
                    </AlertDescription>

                    {/* Render other exercise details here */}
                </>
            )}
            {!isLoading && !error && !exercise && (
                <>
                    <AlertDescription>
                        No data found for exercise ID: {exerciseId}
                    </AlertDescription>
                </>
            )}
        </Alert>
    )
}

export default ExerciseItem
