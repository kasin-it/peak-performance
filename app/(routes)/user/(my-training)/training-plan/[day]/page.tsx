import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"

import WorkoutItem from "./workout-item"

interface AddWorkoutPageProps {
    params: {
        day: string
    }
}

async function AddWorkoutPage({ params }: AddWorkoutPageProps) {
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

    const { data, error } = await supabase.from("user_workouts").select()

    return (
        <section className="flex w-full flex-col items-center space-y-10 px-5 pt-24">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">
                    Add workout to {params.day}
                </h1>
            </div>
            <div className="grid w-full max-w-[1500px] gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {error && <p>Fetchning data went wrong</p>}
                {data?.length === 0 && (
                    <div className="flex flex-col space-y-2">
                        <p>
                            You currently dont have any workouts. Please create
                            one!
                        </p>
                        <Link href={"/user/workouts"}>Create workut</Link>
                    </div>
                )}
                {data && (
                    <>
                        {data.map((workout, index) => (
                            <WorkoutItem
                                key={index}
                                workout={workout}
                                day={params.day}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default AddWorkoutPage
