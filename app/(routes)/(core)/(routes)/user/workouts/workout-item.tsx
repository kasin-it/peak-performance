import { PlusCircle } from "lucide-react"

import { Workout } from "@/types/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import ExerciseItem from "./exercise-item"

function WorkoutItem(workout: Workout) {
    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {workout.name}
                </CardTitle>
                {/* <CardDescription className="mt-2 text-gray-500">
    Start your day with a refreshing morning
    workout.
</CardDescription> */}
                <div className="mt-4">
                    <p>{workout.desc && workout.desc}</p>
                </div>
                <div className="mt-4">
                    {workout.exercises && (
                        <>
                            {workout.exercises?.map((exerciseId) => (
                                <ExerciseItem exerciseId={exerciseId} />
                            ))}
                        </>
                    )}
                    {!workout.exercises && "There are no exercises added"}
                </div>
            </div>
        </Card>
    )
}
export default WorkoutItem
