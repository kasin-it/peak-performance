import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

const DynamicWorkoutCreateDialog = dynamic(
    () => import("./workout-create-dialog").then((mod) => mod.default),
    {
        ssr: false,
    }
)
const DynamicWorkoutItem = dynamic(
    () => import("./workout-item").then((mod) => mod.default),
    {
        ssr: false,
    }
)

async function MyWorkoutsPage() {
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

    const workouts = data

    return (
        <section className="py-26 flex w-full flex-col items-center space-y-6">
            <div className="relative w-full max-w-[1500px] text-left">
                <h1 className="text-4xl font-bold">My Workouts</h1>
                <div className="absolute right-0 top-0">
                    <DynamicWorkoutCreateDialog />
                </div>
            </div>
            <div className="grid w-full max-w-[1500px] gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {workouts &&
                    workouts.map((workout, index) => (
                        <DynamicWorkoutItem
                            workout={{
                                id: workout.id,
                                name: workout.name,
                                desc: workout.desc,
                                exercises: workout.exercises,
                            }}
                            key={index}
                        />
                    ))}
                {workouts?.length === 0 && (
                    <p>
                        You currently dont have any workouts. Please create one!
                    </p>
                )}
            </div>
        </section>
    )
}

export default MyWorkoutsPage
