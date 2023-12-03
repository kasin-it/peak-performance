import dynamic from "next/dynamic"

import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

const DynamicExerciseFullDescriptionDialog = dynamic(
    () =>
        import("@/components/ui/exercise-full-desctiption-dialog").then(
            (mod) => mod.default
        ),
    {
        ssr: false,
    }
)
const DynamicAddToWorkoutButton = dynamic(
    () => import("./add-to-workout-button").then((mod) => mod.default),
    {
        ssr: false,
    }
)

function ExerciseItem({
    exercise,
    workoutId,
}: {
    exercise: Exercise
    workoutId: string
}) {
    return (
        <Card className="py-5">
            <CardContent className="flex flex-col items-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex-1 space-y-2">
                    <CardTitle>{exercise.name}</CardTitle>
                    <CardDescription
                        className={cn(
                            exercise.instructions?.length! > 100
                                ? "line-clamp-[3] overflow-hidden bg-gradient-to-b from-primary bg-clip-text text-transparent"
                                : null
                        )}
                    >
                        {exercise.instructions
                            ? exercise.instructions
                            : "There are no insstructions included."}
                    </CardDescription>
                    {exercise.instructions?.length! > 100 ? (
                        <DynamicExerciseFullDescriptionDialog
                            instructions={exercise.instructions!}
                        />
                    ) : null}
                    <p className="text-xl font-bold">
                        {exercise.sets} x {exercise.repetitions}
                    </p>
                </div>
                <div className="mt-4">
                    <DynamicAddToWorkoutButton
                        workoutId={workoutId}
                        exerciseId={exercise.id}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
export default ExerciseItem
