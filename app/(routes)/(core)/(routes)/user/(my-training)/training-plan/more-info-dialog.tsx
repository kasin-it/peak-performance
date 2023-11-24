import { useEffect, useState } from "react"

import { Workout } from "@/types/types"
import { Alert } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import ExerciseItem from "./exercise-item"

function MoreInfoDialog({ workout }: { workout: Workout }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    })

    if (!isMounted) {
        return null
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="outline">More Info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Description:</AlertDialogTitle>
                    <p className="text-muted-foreground">{workout.desc}</p>
                </AlertDialogHeader>
                <AlertDialogHeader>
                    <AlertDialogTitle>Exercises:</AlertDialogTitle>
                    <Alert>
                        {workout.exercises?.map((exercise, index) => (
                            <ExerciseItem key={index} exerciseId={exercise} />
                        ))}
                        {!workout.exercises && <p>Empty</p>}
                    </Alert>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default MoreInfoDialog
