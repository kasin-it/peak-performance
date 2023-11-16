import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ExerciseItem() {
    return (
        <Alert className="relative">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the cli.
            </AlertDescription>
            <div className="flex space-x-3">
                <div className="">
                    <Label>Sets</Label>
                    <Input type="number" className="w-[70px]"></Input>
                </div>
                <div className="">
                    <Label>Reps</Label>
                    <Input type="number" className="w-[70px]" max={99}></Input>
                </div>
            </div>
        </Alert>
    )
}
export default ExerciseItem
