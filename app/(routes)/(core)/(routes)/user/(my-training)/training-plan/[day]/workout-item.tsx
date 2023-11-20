"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Workout } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

function WorkoutItem({ workout, day }: { workout: Workout; day: string }) {
    const onSubmit = async () => {
        const supabase = await createClientComponentClient()

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

                <div className="mt-4">
                    <p>{workout.desc && workout.desc}</p>
                </div>
                <div className="mt-4">
                    <Button onClick={onSubmit}>Add to {day}</Button>
                </div>
            </div>
        </Card>
    )
}
export default WorkoutItem
