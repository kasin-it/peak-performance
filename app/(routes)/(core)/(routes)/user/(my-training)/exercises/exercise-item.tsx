import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

import ExerciseDeleteDialog from "./exercise-delete-dialog"
import ExerciseEditDialog from "./exercise-edit-dialog"

function ExerciseItem({ exercise }: { exercise: Exercise }) {
    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="relative p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {exercise.name}
                </CardTitle>

                <div className="absolute right-6 top-6 flex space-x-2 ">
                    <ExerciseEditDialog {...exercise} />
                    <ExerciseDeleteDialog exerciseId={exercise.id} />
                </div>
                <div className="mt-4">
                    <p>{exercise.instructions && exercise.instructions}</p>
                </div>
            </div>
        </Card>
    )
}
export default ExerciseItem
