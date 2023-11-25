import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"

import ExerciseItem from "./exercise-item"

interface AddExercisePageProps {
    params: {
        workoutId: string
    }
}

async function AddExercisePage({ params }: AddExercisePageProps) {
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

    const { data, error } = await supabase.from("user_exercises").select()

    return (
        <section className="flex w-full flex-col items-center px-5 pt-24">
            <div className="relative w-full max-w-[1500px] space-y-8 text-left">
                <h1 className="text-4xl font-bold">Add exercise</h1>
                {error && <p>Fetchning data wnet wrong</p>}
                {data?.length === 0 && (
                    <div className="flex flex-col space-y-2">
                        <p>No exercises</p>
                        <Link href={"/user/exercises"}>Create exercise</Link>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {data && (
                        <>
                            {data.map((exercise, index) => (
                                <ExerciseItem
                                    key={index}
                                    exercise={exercise}
                                    workoutId={params.workoutId}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AddExercisePage
