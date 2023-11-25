import { cookies } from "next/headers"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TrainingPlanItem from "./training-plan-item"
import { createServerClient } from "@supabase/ssr"

async function TrainingPlanPage() {
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
    const { data, error } = await supabase
        .from("training_plan")
        .select()
        .limit(1)

    if (error) {
        return <div>Something went wrong.</div>
    }

    return (
        <div className="h-full w-full p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <TrainingPlanItem
                    key={"monday"}
                    name={"monday"}
                    workoutsId={data[0].monday}
                />
                <TrainingPlanItem
                    key={"tuesday"}
                    name={"tuesday"}
                    workoutsId={data[0].tuesday}
                />
                <TrainingPlanItem
                    key={"wednesday"}
                    name={"wednesday"}
                    workoutsId={data[0].wednesday}
                />
                <TrainingPlanItem
                    key={"thursday"}
                    name={"thursday"}
                    workoutsId={data[0].thursday}
                />
                <TrainingPlanItem
                    key={"friday"}
                    name={"friday"}
                    workoutsId={data[0].friday}
                />
                <TrainingPlanItem
                    key={"saturday"}
                    name={"saturday"}
                    workoutsId={data[0].saturday}
                />
                <TrainingPlanItem
                    key={"sunday"}
                    name={"sunday"}
                    workoutsId={data[0].sunday}
                />
            </div>
        </div>
    )
}
export default TrainingPlanPage
