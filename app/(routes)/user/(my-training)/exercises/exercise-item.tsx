"use client"

import { useState } from "react"

import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
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
    const [isDeleted, setIsDeleted] = useState(false)

    return (
        <Card className={cn("py-5", isDeleted ? "hidden" : null)}>
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
                <div className="space-x-2">
                    <ExerciseEditDialog {...exercise} />
                    <ExerciseDeleteDialog
                        exerciseId={exercise.id}
                        setIsDeleted={setIsDeleted}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
export default ExerciseItem
