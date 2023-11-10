import React, { useEffect, useState } from "react"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

function ExercisePreview({ exercise }: { exercise: Exercise }) {
    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {exercise.name}
                </CardTitle>
                {/* <CardDescription className="mt-2 text-gray-500">
            Start your day with a refreshing morning
            workout.
        </CardDescription> */}
                <div className="mt-4">
                    <p className="text-sm text-gray-700">
                        Muscles targeted:{" "}
                        <span className="font-semibold">{exercise.muscle}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                        Equipment needed:{" "}
                        <span className="font-semibold">
                            {exercise.equipment}
                        </span>
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                        Type:{" "}
                        <span className="font-semibold">{exercise.type}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                        Difficulty:{" "}
                        <span className="font-semibold">
                            {exercise.difficulty}
                        </span>
                    </p>
                </div>
                <div className="mt-4">
                    <CardTitle className="mt-1 block text-lg font-medium leading-tight text-black">
                        Exercise Instructions
                    </CardTitle>
                    <CardDescription className="mt-2 text-gray-500">
                        Follow these instructions to perform the exercise
                        correctly:
                    </CardDescription>

                    <p>
                        {exercise.instructions
                            ? exercise.instructions
                            : "No instructions added"}
                    </p>
                </div>
                <div className="mt-4">
                    <Button
                        className="text-blue-600 hover:text-blue-900"
                        variant="outline"
                    >
                        Add to my workout
                    </Button>
                </div>
            </div>
        </Card>
    )
}
export default ExercisePreview
