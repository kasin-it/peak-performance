import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

function ExerciseItem({
    exercise,
    workoutId,
}: {
    exercise: Exercise
    workoutId?: string
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
            </div>
            <div>
                {workoutId && <Button>Add this exercise to workout</Button>}
                <Button variant={"secondary"}>Update</Button>
                <Button variant={"destructive"}>Delete</Button>
            </div>
        </Card>
    )
}
export default ExerciseItem
