"use client"

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

function AddToWorkoutButton({
    workoutId,
    exerciseId,
}: {
    workoutId: string
    exerciseId: string
}) {
    
    const supabase = createClientComponentClient()

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
