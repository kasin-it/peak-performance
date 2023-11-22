import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Exercise } from "@/types/types"
import { Alert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

function ExerciseItem({ exerciseId }: { exerciseId: string }) {
    const [exercise, setExercise] = useState<string | Exercise>("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const { data, error } = await supabase
                    .from("user_exercises")
                    .select()
                    .eq("id", exerciseId)

                if (error) {
                    setError(true)
                    return
                }

                if (data && data.length > 0) {
                    setExercise(data[0])
                } else {
                    setExercise("")
                }
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchExercise()
    }, [exerciseId])

    return (
        <Alert>
            {loading && <Skeleton className="h-32 w-full" />}
            {error && <p>Something went wrong.</p>}
            {typeof exercise === "object" && exercise.name && (
                <div className="flex justify-between">
                    <p>{exercise.name}</p>
                    <p>
                        {exercise.sets} X {exercise.repetitions}
                    </p>
                </div>
            )}
        </Alert>
    )
}

export default ExerciseItem
