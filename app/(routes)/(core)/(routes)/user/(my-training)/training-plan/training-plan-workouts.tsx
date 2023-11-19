import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import WorkoutItem from "./workout-item"

async function TrainingPlanWorkouts({
    workoutsId,
    name,
}: {
    workoutsId: string[]
    name: string
}) {
    if (workoutsId === null || workoutsId.length === 0) {
        return
    }

    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from("user_workouts").select()

    function checkIfInArray(data: any[], array: any[]): any[] {
        let output: any[] = []

        data.forEach((element) => {
            if (array.includes(element.id)) {
                output.push(element)
            }
        })

        return output
    }
    // @ts-ignore
    const workouts = checkIfInArray(data, workoutsId)
    if (workoutsId === null) {
        return <p>data is null</p>
    }

    return (
        <>
            {workouts.map((workout, index) => (
                <WorkoutItem workout={workout} key={index} name={name} />
            ))}
        </>
    )
}
export default TrainingPlanWorkouts
