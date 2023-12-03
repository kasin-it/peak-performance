"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Workout } from "@/types/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import MoreInfoDialog from "./more-info-dialog"

function WorkoutItem({
    workout,
    workoutId,
    name,
}: {
    workout?: Workout
    name: string
    workoutId: string
}) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [isDeleted, setIsDeleted] = useState(false)

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
            }
        } catch (error) {
            toast.error("Failed to delete workout. Please try again.")
        }

        setIsDeleted(true)
        toast.success("Workout deleted successfully.")
    }

    return (
        <Card
            className={cn(
                "space-y-2 rounded-lg bg-gray-100 p-4 shadow-lg",
                isDeleted && "hidden"
            )}
        >
            {workout ? (
                <>
                    <div className="flex items-start justify-between">
                        <div className="max-w-[70%] break-words text-lg font-semibold">
                            {workout.name}
                        </div>
                        <Button
                            className="h-8 w-8"
                            variant="destructive"
                            onClick={() => handleDelete(workoutId)}
                        >
                            X
                        </Button>
                    </div>
                    <MoreInfoDialog workout={workout} />
                </>
            ) : (
                <div className="flex items-start justify-between">
                    <p>Workout deleted.</p>
                    <Button
                        className="h-8 w-8"
                        variant="destructive"
                        onClick={() => handleDelete(workoutId)}
                    >
                        X
                    </Button>
                </div>
            )}
        </Card>
    )
}

export default WorkoutItem
