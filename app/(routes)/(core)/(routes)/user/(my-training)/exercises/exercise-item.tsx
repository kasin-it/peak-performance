import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import ExerciseFullDescriptionDialog from "@/components/ui/exercise-full-desctiption-dialog"

import ExerciseDeleteDialog from "./exercise-delete-dialog"
import ExerciseEditDialog from "./exercise-edit-dialog"

function ExerciseItem({ exercise }: { exercise: Exercise }) {
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
                        {exercise.instructions}
                    </CardDescription>
                    {exercise.instructions?.length! > 100 ? (
                        <ExerciseFullDescriptionDialog
                            instructions={exercise.instructions!}
                        />
                    ) : null}
                    <p className="text-xl font-bold">
                        {exercise.sets} x {exercise.repetitions}
                    </p>
                </div>
                <div className="space-x-2 sm:space-x-4">
                    <ExerciseEditDialog {...exercise} />
                    <ExerciseDeleteDialog exerciseId={exercise.id} />
                </div>
            </CardContent>
        </Card>
    )
}
export default ExerciseItem
