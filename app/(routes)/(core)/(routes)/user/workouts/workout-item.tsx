import { redirect, useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

import { Workout } from "@/types/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import ExerciseItem from "./exercise-item"

function WorkoutItem({
    workout,
    day,
}: {
    workout: Workout
    day: string | undefined
}) {
    const router = useRouter()

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
                        {workout.exercises && (
                            <>
                                {workout.exercises?.map((exerciseId) => (
                                    <ExerciseItem exerciseId={exerciseId} />
                                ))}
                            </>
                        )}
                        {!workout.exercises && "There are no exercises added"}
                        <Button
                            onClick={() =>
                                router.push(
                                    `/user/exercises?workout=${workout.id}`
                                )
                            }
                            className="space-x-2"
                        >
                            <p>Add exercises</p>
                            <PlusCircle />
                        </Button>
                    </Alert>
                </div>
            </div>
            <div>
                {day && <Button>Add to {day} workouts</Button>}
                {!day && <Button>Add to day plan</Button>}
            </div>
        </Card>
    )
}
export default WorkoutItem
