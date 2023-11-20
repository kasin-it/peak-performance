"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Exercise, Workout } from "@/types/types"

import ExerciseCreateDialog from "./exercise-create-dialog"
import ExerciseItem from "./exercise-item"

function MyExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClientComponentClient()

    const fetchExercises = async () => {
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
    }

    useEffect(() => {
        fetchExercises()
    }, [])

    return (
        <section className="flex w-full flex-col items-center px-5 pt-48">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">My Exercises</h1>
                <div className="absolute right-0 top-0">
                    <ExerciseCreateDialog />
                    <Link href={"/exercises"}>Import exercise</Link>
                </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !exercises && <p>No exercises found.</p>}
            {!isLoading && exercises && exercises.length > 0 && (
                <div className="w-full max-w-[1500px]">
                    {exercises.map((exercise, index) => (
                        <ExerciseItem exercise={exercise} key={index} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default MyExercisesPage
