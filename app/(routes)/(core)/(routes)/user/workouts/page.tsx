"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Workout } from "@/types/types"
import { Button } from "@/components/ui/button"

import CreateWorkoutDialog from "./create-workout-dialog"
import WorkoutItem from "./workout-item"

function MyWorkoutsPage() {
    const [day, setDay] = useState<undefined | string>(undefined)
    const [workouts, setWorkouts] = useState<Workout[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClientComponentClient()

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true)

            const { data, error } = await supabase
                .from("user_workouts")
                .select()

            if (error) {
                throw new Error(error.message)
            }

            setWorkouts(data || [])
        } catch (error) {
            setError("Something went wrong.")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)

        const dayParam = searchParams.get("day") || undefined

        setDay(dayParam)

        fetchWorkouts()
    }, [])

    return (
        <section className="flex w-full flex-col items-center px-5 pt-48">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">My Workouts</h1>
                <div className="absolute right-0 top-0">
                    <CreateWorkoutDialog />
                </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !workouts && <p>No workouts found.</p>}
            {!isLoading && workouts && workouts.length > 0 && (
                <div className="w-full max-w-[1500px]">
                    {workouts.map((workout, index) => (
                        <WorkoutItem
                            name={workout.name}
                            desc={workout.desc}
                            exercises={workout.exercises}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default MyWorkoutsPage
