import React, { useEffect, useState } from "react"
import { cookies } from "next/headers"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import toast from "react-hot-toast"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

function ExercisePreview({ exercise }: { exercise: Exercise }) {
    const supabase = createClientComponentClient()

    const onExerciseAdd = async () => {
        const { data: _, error } = await supabase
            .from("user_exercises")
            .insert({
                name: exercise.name,
                instructions: exercise.instructions,
                sets: 1,
                repetitions: 1,
            })

        toast.success("Workout has been created successfully!")
    }

    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {exercise.name}
                </CardTitle>

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
                        onClick={onExerciseAdd}
                    >
                        Add to my exercises
                    </Button>
                </div>
            </div>
        </Card>
    )
}
export default ExercisePreview
