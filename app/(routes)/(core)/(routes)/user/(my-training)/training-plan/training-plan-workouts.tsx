import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Workout } from "@/types/types"

import WorkoutItem from "./workout-item"

async function TrainingPlanWorkouts({
    workoutsId,
    name,
}: {
    workoutsId: string[]
    name: string
}) {
    if (workoutsId === null || workoutsId.length === 0) {
        return null // Returning null when there are no workouts
    }

    const supabase = createServerComponentClient({ cookies })

    const getWorkouts = async () => {
        // Use Promise.all to fetch all workouts asynchronously
        const workoutsPromises = workoutsId.map(async (id) => {
            const { data } = await supabase
                .from("user_workouts")
                .select()
                .eq("id", id)

            if (!data) {
                return
            }

            return data[0] // Assuming the query returns an array, and you want the first element
        })

        return Promise.all(workoutsPromises)
    }

    // Call the asynchronous function
    const workouts = await getWorkouts()

    return (
        <>
            {workouts.map((workout, index) => (
                <WorkoutItem
                    workout={workout}
                    workoutId={workoutsId[index]}
                    key={index}
                    name={name}
                />
            ))}
        </>
    )
}

export default TrainingPlanWorkouts
