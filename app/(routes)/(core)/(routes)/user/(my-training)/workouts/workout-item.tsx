import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { PlusCircle } from "lucide-react"

import { Exercise, Workout } from "@/types/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

import ExerciseItem from "./exercise-item"

async function WorkoutItem({ workout }: { workout: Workout }) {
    const supabase = createServerComponentClient({ cookies })

    if (!workout.exercises || workout.exercises.length === 0) {
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
                            <AlertDescription>
                                There are no exercises added
                            </AlertDescription>
                            <Link
                                href={`/user/workouts/${workout.id}/`}
                                className="flex w-[200px] justify-center space-x-2 rounded-md bg-blue-500 px-3 py-2 text-white"
                            >
                                <p>Add exercises</p>
                                <PlusCircle />
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

    const getExercises = async () => {
        // Use Promise.all to fetch all workouts asynchronously
        const exercisePromises = workout.exercises!.map(async (id) => {
            const { data } = await supabase
                .from("user_exercises")
                .select()
                .eq("id", id)

            if (!data) {
                return null
            }

            return data[0] // Assuming the query returns an array, and you want the first element
        })

        return Promise.all(exercisePromises)
    }

    // Call the asynchronous function
    const exercises: (Exercise | null)[] = await getExercises()

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
                        {exercises.some((exercise) => exercise !== null) ? (
                            exercises.map((exercise) =>
                                exercise !== null ? (
                                    <ExerciseItem
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                ) : null
                            )
                        ) : (
                            <AlertDescription>
                                There are no exercises added
                            </AlertDescription>
                        )}

                        <Link
                            href={`/user/workouts/${workout.id}/`}
                            className="flex w-[200px] justify-center space-x-2 rounded-md bg-blue-500 px-3 py-2 text-white"
                        >
                            <p>Add exercises</p>
                            <PlusCircle />
                        </Link>
                    </Alert>
                </div>
            </div>

            <div>
                {exercises.every((exercise) => exercise === null) && (
                    <Button>Add to plan</Button>
                )}
            </div>
        </Card>
    )
}

export default WorkoutItem
