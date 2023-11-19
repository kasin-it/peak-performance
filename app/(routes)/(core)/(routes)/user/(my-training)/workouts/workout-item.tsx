import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { PlusCircle } from "lucide-react"

import { Workout } from "@/types/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

import ExerciseItem from "./exercise-item"

async function WorkoutItem({ workout }: { workout: Workout }) {
    const supabase = createServerComponentClient({ cookies })

    let exercises = []

    if (workout.exercises?.length !== 0) {
        try {
            const { data, error } = await supabase
                .from("user_exercises")
                .select()
                .overlaps("id", workout.exercises || [])

            if (error) {
                console.error("Error fetching exercises:", error)
            } else {
                exercises = data
            }
        } catch (error) {
            console.error("Error fetching exercises:", error)
        }
    }

    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {workout.name}
                </CardTitle>

                <div className="mt-4">
                    <p>{workout.desc && workout.desc}</p>
                </div>

                <div className="mt-4">
                    <Alert>
                        {workout.exercises?.length !== 0 ? (
                            exercises.map((exercise) => (
                                <ExerciseItem
                                    key={exercise.id}
                                    exercise={exercise}
                                />
                            ))
                        ) : (
                            <AlertDescription>
                                There are no exercises added
                            </AlertDescription>
                        )}

                        <Link href={`/user/workouts/${workout.id}/`}>
                            <div className="flex w-[200px] justify-center space-x-2 rounded-md bg-blue-500 px-3 py-2 text-white">
                                <p>Add exercises</p>
                                <PlusCircle />
                            </div>
                        </Link>
                    </Alert>
                </div>
            </div>

            <div>
                {workout.exercises?.length === 0 && (
                    <Button>Add to plan</Button>
                )}
            </div>
        </Card>
    )
}

export default WorkoutItem
