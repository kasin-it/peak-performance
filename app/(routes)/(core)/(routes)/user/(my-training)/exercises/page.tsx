"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Exercise } from "@/types/types"

import ExerciseCreateDialog from "./exercise-create-dialog"
import ExerciseItem from "./exercise-item"

function MyExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClientComponentClient()

    const fetchExercises = useCallback(async () => {
        try {
            setIsLoading(true)

            const { data, error } = await supabase
                .from("user_exercises")
                .select()

            if (error) {
                throw new Error(error.message)
            }

            setExercises(data || [])
        } catch (error) {
            setError("Something went wrong.")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        fetchExercises()
    }, [fetchExercises])

    return (
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
            <div className="container mx-auto grid max-w-7xl gap-4 px-2 sm:gap-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">My Exercises</h1>
                    <div className="space-x-5">
                        <ExerciseCreateDialog />
                        <Link href={"/exercises"}>Import exercise</Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !exercises && <p>No exercises found.</p>}
                    {!isLoading && exercises && exercises.length > 0 && (
                        <>
                            {exercises.map((exercise, index) => (
                                <ExerciseItem exercise={exercise} key={index} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MyExercisesPage
