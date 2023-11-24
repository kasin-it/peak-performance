import Link from "next/link"

import TrainingPlanWorkouts from "./training-plan-workouts"

interface TrainingPlanItemProps {
    name: string
    workoutsId: string[]
}

async function TrainingPlanItem({ name, workoutsId }: TrainingPlanItemProps) {
    const queryUrl = `/user/training-plan/${name}/`

    return (
        <div className="flex flex-col space-y-4">
            <div className="text-center font-bold capitalize">{name}</div>
            <Link
                href={queryUrl}
                className="rounded-md border border-blue-500 bg-white px-4 py-3 text-center text-sm font-medium text-blue-500 transition duration-200 hover:bg-blue-500 hover:text-white"
            >
                Add Workout
            </Link>
            <TrainingPlanWorkouts workoutsId={workoutsId} name={name} />
        </div>
    )
}
export default TrainingPlanItem
