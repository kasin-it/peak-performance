import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import WorkoutItem from "./workout-item"

interface AddWorkoutPageProps {
    params: {
        day: string
    }
}

async function AddWorkoutPage({ params }: AddWorkoutPageProps) {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("user_workouts").select()

    return (
        <section className="flex w-full flex-col items-center px-5 pt-48">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">
                    Add workout to {params.day}
                </h1>
                {error && <p>Fetchning data wnet wrong</p>}
                {data?.length === 0 && (
                    <div className="flex flex-col space-y-2">
                        <p>No workouts</p>
                        <Link href={"/user/workouts"}>Create workut</Link>
                    </div>
                )}
                {data && (
                    <>
                        {data.map((workout, index) => (
                            <WorkoutItem key={index} />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default AddWorkoutPage
