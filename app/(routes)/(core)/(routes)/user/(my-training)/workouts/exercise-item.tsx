import { Exercise } from "@/types/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

async function ExerciseItem({ exercise }: { exercise: Exercise }) {
    return (
        <Alert className="relative">
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
            {!exercise && (
                <>
                    <AlertDescription>Exercise nmot found</AlertDescription>
                </>
            )}
        </Alert>
    )
}

export default ExerciseItem
