import { Workout } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrainingPlanItemProps {
    header: string
    workouts: Workout[]
    estimatedTime: number
}

function TrainingPlanItem() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Wednesday</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 border-y py-4">
                <Button size="sm">Add Event</Button>
            </CardContent>
        </Card>
    )
}
export default TrainingPlanItem
