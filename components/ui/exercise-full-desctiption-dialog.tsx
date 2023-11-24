"use client"

import { useEffect, useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function ExerciseFullDescriptionDialog({
    instructions,
}: {
    instructions: string
}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    })

    if (!isMounted) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger>Show more</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Instructions</DialogTitle>
                    <DialogDescription>{instructions}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default ExerciseFullDescriptionDialog
