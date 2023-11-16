"use client"

import { useEffect, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ExerciseItem from "./exercise-item"

function CreateWorkoutDialog() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    })
    if (!isMounted) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Create workout</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your very own workout!</DialogTitle>
                </DialogHeader>
                <div>
                    <Label>Name</Label>
                    <Input />
                </div>
                <div>
                    <Label>Description</Label>
                    <Textarea
                        maxLength={256}
                        rows={5}
                        className="resize-none"
                    />
                </div>
                <div>
                    <Label>Exercises</Label>
                    <Alert className="h-[400px] space-y-3 overflow-y-scroll">
                        <ExerciseItem
                    </Alert>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default CreateWorkoutDialog
