import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TrainingPlanWorkouts from "./training-plan-workouts"
import WorkoutItem from "./workout-item"

interface TrainingPlanItemProps {
    name: string
    workoutsId: string[]
}

async function TrainingPlanItem({ name, workoutsId }: TrainingPlanItemProps) {
    const queryUrl = `/user/training-plan/${name}/`

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 border-y py-4">
                <TrainingPlanWorkouts workoutsId={workoutsId} name={name} />
                <Link
                    href={queryUrl}
                    className="rounded-md bg-blue-500 px-4 py-2 text-center text-white transition duration-300 ease-linear hover:bg-blue-300"
                >
                    Add Workout
                </Link>
            </CardContent>
        </Card>
    )
}
export default TrainingPlanItem
