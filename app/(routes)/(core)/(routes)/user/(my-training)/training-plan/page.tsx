import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TrainingPlanItem from "./training-plan-item"

async function TrainingPlanPage() {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase
        .from("training_plan")
        .select()
        .limit(1)

    if (error) {
        return <div>Something went wrong.</div>
    }

    return (
        <section className="flex w-full flex-col items-center pt-48">
            <div className="pb-10">
                <h1 className="text-4xl font-bold">My Training</h1>
            </div>
            <div className="grid w-full max-w-[1500px] grid-cols-1 gap-4 p-4 pb-24 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <TrainingPlanItem name={"monday"} workoutsId={data[0].monday} />
                <TrainingPlanItem
                    name={"tuesday"}
                    workoutsId={data[0].tuesday}
                />
                <TrainingPlanItem
                    name={"wednesday"}
                    workoutsId={data[0].wednesday}
                />
                <TrainingPlanItem
                    name={"thursday"}
                    workoutsId={data[0].thursday}
                />
                <TrainingPlanItem name={"friday"} workoutsId={data[0].friday} />
                <TrainingPlanItem
                    name={"saturday"}
                    workoutsId={data[0].saturday}
                />
                <TrainingPlanItem name={"sunday"} workoutsId={data[0].sunday} />
            </div>
        </section>
    )
}
export default TrainingPlanPage
