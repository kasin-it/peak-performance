import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import ExerciseItem from "./exercise-item"

interface AddExercisePageProps {
    params: {
        workoutId: string
    }
}

async function AddExercisePage({ params }: AddExercisePageProps) {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("user_exercises").select()

    return (
        <section className="flex w-full flex-col items-center px-5 pt-48">
            <div className="relative w-full max-w-[1500px] text-center">
                <h1 className="text-4xl font-bold">
                    Add exercise
                </h1>
                {error && <p>Fetchning data wnet wrong</p>}
                {data?.length === 0 && (
                    <div className="flex flex-col space-y-2">
                        <p>No exerci</p>
                        <Link href={"/user/exercises"}>Create workut</Link>
                    </div>
                )}
                {data && (
                    <>
                        {data.map((exercise, index) => (
                            <ExerciseItem key={index} exercise={exercise} workoutId={params.workoutId} />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default AddExercisePage
