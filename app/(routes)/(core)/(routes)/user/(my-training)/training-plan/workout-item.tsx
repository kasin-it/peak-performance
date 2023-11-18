"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Info, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Workout } from "@/types/types"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

function WorkoutItem({ workoutId, name }: { workoutId: string; name: string }) {
    const supabase = createClientComponentClient()

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<Workout | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isDeleted, setIsDeleted] = useState(false)

    const fetchWorkout = async () => {
        try {
            setIsLoading(true)

            const { data, error } = await supabase
                .from("user_workouts")
                .select()
                .eq("id", workoutId)
                .limit(1)

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
    }, []) // Run this effect only once on component mo unt

    if (isLoading) {
        return <Skeleton className="h-[70px] w-full"></Skeleton>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!data) {
        return <div>Workout not found</div>
    }

    const handleDelete = async (id: string) => {
        try {
            const { data: _, error } = await supabase.rpc(
                "delete_item_from_training_plan_column",
                {
                    day: name,
                    workout_id: id,
                }
            )

            if (error) {
                toast.error("Failed to delete workout. Please try again.")
                console.log(error)
            }

            // Additional success handling if needed
        } catch (error) {
            toast.error("Failed to delete workout. Please try again.")
        }

        setIsDeleted(true)
        toast.success("Workout deleted succesfully.")
    }

    return (
        <div className={cn("relative space-y-2", isDeleted && "hidden")}>
            <h4 className="text-lg font-semibold">{data.name}</h4>
            <p className="text-sm">{data.desc}</p>
            <div className="absolute right-5 top-2 flex space-x-2">
                <div className="cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:opacity-70">
                    <Info className="h-4 w-4" />
                </div>
                <div
                    className="cursor-pointer rounded-md bg-red-500 p-2 text-white hover:opacity-70"
                    onClick={() => handleDelete(data.id)}
                >
                    <Trash className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}

export default WorkoutItem
