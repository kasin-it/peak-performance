"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

import { Exercise } from "@/types/types"
import { Skeleton } from "@/components/ui/skeleton"

import ExerciseCreateDialog from "./exercise-create-dialog"
import ExerciseItem from "./exercise-item"

function MyExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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

    const generateLoadingSkeletons = () =>
        Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
                key={index}
                className="m-3 mx-auto h-[255px] w-[388px] max-w-md overflow-hidden "
            ></Skeleton>
        ))

    return (
        <section className="py-26 w-full">
            <div className="space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">My Exercises</h1>
                    <div className="space-x-5">
                        <ExerciseCreateDialog />
                        <Link href={"/exercises"}>Import exercise</Link>
                    </div>
                </div>
                {error && <p>Error: {error}</p>}
                {isLoading && generateLoadingSkeletons()}
                {!isLoading && !exercises?.length && (
                    <p>
                        You currently dont have any exercises. Please create one
                        or import an existing one!
                    </p>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
