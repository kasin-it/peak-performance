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

function WorkoutFullDescriptionDialog({ desc }: { desc: string }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger className="hover:opacity-60">
                Show more
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Description</DialogTitle>
                    <DialogDescription>{desc}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default WorkoutFullDescriptionDialog
