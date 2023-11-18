"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Workout } from "@/types/types"

function WorkoutItem({ workoutId }: { workoutId: string }) {
    const supabase = createClientComponentClient()

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<Workout | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchWorkout = async () => {
        try {
            setIsLoading(true)

            const { data, error } = await supabase
                .from("user_workouts")
                .select()
                .eq("id", workoutId)

            if (error) {
                throw new Error(error.message)
            }

            if (data && data.length > 0) {
                setData(data[0])
            } else {
                throw new Error("Workout not found")
            }
        } catch (error) {
            setError("Something went wrong.")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWorkout()
    }, []) // Run this effect only once on component mount

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!data) {
        return <div>Workout not found</div>
    }

    return (
        <div className="space-y-2">
            <h4 className="text-lg font-semibold">{data.name}</h4>
            <p className="text-sm">{data.desc}</p>
        </div>
    )
}

export default WorkoutItem
