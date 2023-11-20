import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import WorkoutCreateDialog from "./workout-create-dialog"
import WorkoutItem from "./workout-item"

async function MyWorkoutsPage() {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("user_workouts").select()

    const workouts = data

    return (
        <section className="flex w-full flex-col items-center px-5 pt-48">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">My Workouts</h1>
                <div className="absolute right-0 top-0">
                    <WorkoutCreateDialog />
                </div>
            </div>
            <div className="w-full max-w-[1500px]">
                {workouts &&
                    workouts.map((workout, index) => (
                        <WorkoutItem
                            workout={{
                                id: workout.id,
                                name: workout.name,
                                desc: workout.desc,
                                exercises: workout.exercises,
                            }}
                            key={index}
                        />
                    ))}
            </div>
        </section>
    )
}

export default MyWorkoutsPage
