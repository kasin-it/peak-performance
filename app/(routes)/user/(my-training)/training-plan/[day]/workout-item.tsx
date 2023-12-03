"use client"

import dynamic from "next/dynamic"
import { createBrowserClient } from "@supabase/ssr"

import { Workout } from "@/types/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

const DynamicWorkoutFullDescriptionDialog = dynamic(
    () =>
        import("../../workouts/workout-full-description-dialog").then(
            (mod) => mod.default
        ),
    {
        ssr: false,
    }
)

function WorkoutItem({ workout, day }: { workout: Workout; day: string }) {
    const onSubmit = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: _, error } = await supabase.rpc(
            "append_to_training_plan_column",
            {
                day: day,
                workout_id: workout.id,
            }
        )

        window.location.href = "/user/training-plan"
    }

    return (
        <Card className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md 2xl:max-w-xl">
            <div className="p-8">
                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                    {workout.name}
                </CardTitle>

                <p
                    className={cn(
                        workout.desc.length > 100
                            ? "line-clamp-[2] overflow-hidden bg-gradient-to-b from-primary bg-clip-text text-transparent"
                            : null
                    )}
                >
                    {workout.desc}
                </p>
                {workout.desc.length > 100 ? (
                    <DynamicWorkoutFullDescriptionDialog desc={workout.desc!} />
                ) : null}
                <div className="mt-4">
                    <Button onClick={onSubmit}>Add to {day}</Button>
                </div>
            </div>
        </Card>
    )
}
export default WorkoutItem
