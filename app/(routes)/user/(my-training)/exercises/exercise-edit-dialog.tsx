"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBrowserClient } from "@supabase/ssr"
import { AlertCircle, Edit } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type FormData = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(5, "Name needs to be at least 5 characters"),
    instructions: z.string(),
    repetitions: z.coerce.number().gte(1, "Must be 1 and above"),
    sets: z.coerce.number().gte(1, "Must be 1 and above"),
})

function ExerciseEditDialog(exercise: Exercise) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [isMounted, setIsMounted] = useState(false)
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })

    const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
        const { data: _, error } = await supabase
            .from("user_exercises")
            .update({
                name: formData.name,
                instructions: formData.instructions,
                sets: formData.sets,
                repetitions: formData.repetitions,
            })
            .eq("id", exercise.id)

        if (error) {
            setError("name", { message: error.message })
            return
        }
        toast.success("Workout has been created successfully!")
        window.location.reload()
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button size="sm" variant="outline">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-3"
                >
                    <DialogHeader>
                        <DialogTitle>Edit exercise</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <Label>Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter name of the exercise"
                            type="text"
                            autoCapitalize="none"
                            defaultValue={exercise.name}
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("name")}
                            className={`${
                                errors.name ? "border border-red-500 pr-10" : ""
                            }`}
                        />
                        {errors.name && (
                            <div className="-translate-y-2/5 absolute right-3 top-[35px] text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.name.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Label>Instructions</Label>
                        <Textarea
                            maxLength={256}
                            rows={5}
                            defaultValue={exercise.instructions}
                            id="instructions"
                            placeholder="Enter description of the exercise"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("instructions")}
                            className={`resize-none ${
                                errors.instructions
                                    ? "border border-red-500 pr-10"
                                    : ""
                            }`}
                        />
                        {errors.instructions && (
                            <div className="-translate-y-2/5 absolute right-3 top-[35px]  text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.instructions.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Label>Sets</Label>
                        <Input
                            type="number"
                            id="sets"
                            defaultValue={exercise.sets}
                            min={1}
                            placeholder="Enter description of the workout"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("sets")}
                            className={`resize-none ${
                                errors.sets ? "border border-red-500 pr-10" : ""
                            }`}
                        />
                        {errors.sets && (
                            <div className="-translate-y-2/5 absolute right-3 top-[35px]  text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.sets.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Label>Repetitions</Label>
                        <Input
                            type="number"
                            id="repetitions"
                            min={1}
                            placeholder="Enter description of the workout"
                            defaultValue={exercise.repetitions}
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("repetitions")}
                            className={`resize-none ${
                                errors.repetitions
                                    ? "border border-red-500 pr-10"
                                    : ""
                            }`}
                        />
                        {errors.repetitions && (
                            <div className="-translate-y-2/5 absolute right-3 top-[35px]  text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.repetitions.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default ExerciseEditDialog
