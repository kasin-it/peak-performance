"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Edit } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { Workout } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
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
    desc: z.string().max(256, "Y"),
})

function WorkoutEditDialog(workout: Workout) {
    const supabase = createClientComponentClient()
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
            .from("user_workouts")
            .update({
                name: formData.name,
                desc: formData.desc,
            })
            .eq("id", workout.id)

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
                <Button className="p-0 px-2">
                    <Edit className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-3"
                >
                    <DialogHeader>
                        <DialogTitle>Edit your workout.</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <Label>Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter name of the workout"
                            type="text"
                            defaultValue={workout.name}
                            autoCapitalize="none"
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
                        <Label>Description</Label>
                        <Textarea
                            maxLength={256}
                            rows={5}
                            id="desc"
                            defaultValue={workout.desc}
                            placeholder="Enter description of the workout"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("desc")}
                            className={`resize-none ${
                                errors.desc ? "border border-red-500 pr-10" : ""
                            }`}
                        />
                        {errors.desc && (
                            <div className="-translate-y-2/5 absolute right-3 top-[35px]  text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.desc.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default WorkoutEditDialog
