import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

import AddToWorkoutButton from "./add-to-workout-button"

function ExerciseItem({
    exercise,
    workoutId,
}: {
    exercise: Exercise
    workoutId: string
}) {
    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {exercise.name}
                </CardTitle>

                <div className="mt-4">
                    <p>{exercise.instructions && exercise.instructions}</p>
                </div>
                <div className="mt-4">
                    <p>
                        {exercise.sets} X {exercise.repetitions}
                    </p>
                </div>
                <div className="mt-4">
                    <AddToWorkoutButton
                        workoutId={workoutId}
                        exerciseId={exercise.id}
                    />
                </div>
            </div>
        </Card>
    )
}
export default ExerciseItem
