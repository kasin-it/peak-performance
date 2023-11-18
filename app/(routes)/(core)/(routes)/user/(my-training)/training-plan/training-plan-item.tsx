import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import WorkoutItem from "./workout-item"

interface TrainingPlanItemProps {
    name: string
    workouts?: string[]
}

function TrainingPlanItem({ name, workouts }: TrainingPlanItemProps) {
    const queryUrl = `/user/training-plan/${name}/`

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 border-y py-4">
                {workouts ? (
                    <>
                        {workouts.map((workoutId, index) => (
                            <WorkoutItem workoutId={workoutId} key={index} name={name} />
                        ))}
                    </>
                ) : (
                    <p>No workouts</p>
                )}
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
