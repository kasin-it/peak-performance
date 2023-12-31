"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBrowserClient } from "@supabase/ssr"
import { AlertCircle } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

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
    desc: z.string().max(256, "Y"),
})

function WorkoutCreateDialog() {
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
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: _, error } = await supabase.from("user_workouts").insert({
            name: formData.name,
            desc: formData.desc,
        })

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
                <Button>Create workout</Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-3"
                >
                    <DialogHeader>
                        <DialogTitle>Create your very own workout!</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <Label>Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter name of the workout"
                            type="text"
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
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default WorkoutCreateDialog
