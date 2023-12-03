"use client"

import { createBrowserClient } from "@supabase/ssr"

import { Button } from "@/components/ui/button"

function AddToWorkoutButton({
    workoutId,
    exerciseId,
}: {
    workoutId: string
    exerciseId: string
}) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const onSubmit = async () => {
        const { data: _, error } = await supabase.rpc(
            "append_exercise_to_workout",
            {
                workout_id: workoutId,
                exercise_id: exerciseId,
            }
        )

        window.location.href = "/user/workouts"
    }

    return <Button onClick={onSubmit}>Add to workout</Button>
}
export default AddToWorkoutButton
