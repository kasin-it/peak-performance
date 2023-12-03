import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { Edit, PlusCircle } from "lucide-react"

import { Exercise, Workout } from "@/types/types"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

const DynamicExerciseItem = dynamic(
    () => import("./exercise-item").then((mod) => mod.default),
    {
        ssr: false,
    }
)
const DynamicWorkoutDeleteDialog = dynamic(
    () => import("./workout-delete-dialog").then((mod) => mod.default),
    {
        ssr: false,
    }
)
const DynamicWorkoutEditDialog = dynamic(
    () => import("./workout-edit-dialog").then((mod) => mod.default),
    {
        ssr: false,
    }
)
const DynamicWorkoutFullDescriptionDialog = dynamic(
    () =>
        import("./workout-full-description-dialog").then((mod) => mod.default),
    {
        ssr: false,
    }
)

async function WorkoutItem({ workout }: { workout: Workout }) {
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    if (!workout.exercises || workout.exercises.length === 0) {
        return (
            <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
                <div className="p-8">
                    <div className="relative mb-4 flex w-full">
                        <CardTitle className="block w-full max-w-[80%] break-words text-4xl font-medium leading-tight text-black">
                            {workout.name}
                        </CardTitle>
                        <div className="right-0 top-0 flex items-start space-x-2">
                            <DynamicWorkoutEditDialog {...workout} />
                            <DynamicWorkoutDeleteDialog
                                workoutId={workout.id}
                            />
                        </div>
                    </div>

                    <p className="mt-4 break-words pr-2 text-muted-foreground">
                        {workout.desc && workout.desc}
                    </p>

                    <div className="mt-4">
                        <Alert>
                            <AlertDescription className="mb-4 text-lg italic">
                                There are no exercises added.
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
            </Card>
        )
    }

    const getExercises = async () => {
        const exercisePromises = workout.exercises!.map(async (id) => {
            const { data } = await supabase
                .from("user_exercises")
                .select()
                .eq("id", id)

            return data ? data[0] : null
        })

        return Promise.all(exercisePromises)
    }

    const exercises: (Exercise | null)[] = await getExercises()

    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="relative p-8">
                <div className="mb-4 flex items-center justify-between">
                    <CardTitle className="block text-4xl font-medium leading-tight text-black">
                        {workout.name}
                    </CardTitle>
                    <div className="flex space-x-2">
                        <DynamicWorkoutEditDialog {...workout} />
                        <DynamicWorkoutDeleteDialog workoutId={workout.id} />
                    </div>
                </div>

                <p
                    className={cn(
                        workout.desc.length > 100
                            ? "line-clamp-[2] overflow-hidden bg-gradient-to-b from-primary bg-clip-text text-transparent"
                            : null
                    )}
                >
                    {workout.desc}
                </p>
                {workout.desc.length > 100 ? (
                    <DynamicWorkoutFullDescriptionDialog desc={workout.desc!} />
                ) : null}

                <div className="mt-4">
                    <p className="font-bold italic">Exercises:</p>
                    <Alert className="max-h-[500px] space-y-2 overflow-y-scroll">
                        {exercises.length != 0 ? (
                            exercises.map((exercise, index) =>
                                exercise !== null ? (
                                    <DynamicExerciseItem
                                        key={index}
                                        exercise={exercise}
                                        workoutId={workout.id}
                                        exerciseId={workout.exercises![index]}
                                    />
                                ) : null
                            )
                        ) : (
                            <AlertDescription>
                                There are no exercises added
                            </AlertDescription>
                        )}
                    </Alert>
                    <div className="mt-5 flex w-full justify-center">
                        <Link
                            href={`/user/workouts/${workout.id}/`}
                            className="flex w-[200px] justify-center space-x-2 rounded-md bg-blue-500 px-3 py-2 text-white"
                        >
                            <p>Add exercises</p>
                            <PlusCircle />
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default WorkoutItem
