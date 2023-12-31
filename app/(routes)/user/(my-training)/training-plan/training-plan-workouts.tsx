import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import WorkoutItem from "./workout-item"

async function TrainingPlanWorkouts({
    workoutsId,
    name,
}: {
    workoutsId: string[]
    name: string
}) {
    if (workoutsId === null || workoutsId.length === 0) {
        return null
    }

    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const getWorkouts = async () => {
        const workoutsPromises = workoutsId.map(async (id) => {
            const { data } = await supabase
                .from("user_workouts")
                .select()
                .eq("id", id)

            if (!data) {
                return
            }

            return data[0]
        })

        return Promise.all(workoutsPromises)
    }

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
