"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Database } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type FormData = z.infer<typeof formSchema>

const formSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

function ChangePasswordForm() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })
    const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
        // const { data: _, error } = await supabase.auth.updateUser({
        //     username: formData.username,
        // })
        // if (error) {
        //     setError("username", { message: error.message })
        //     return
        // }
        // toast.success("Check your new username to confirm the change.")

        router.refresh()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-3"
        >
            <div>
                <Label className="text-muted-foreground" htmlFor="password">
                    password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        placeholder="andrew@mail.com"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        {...register("password")}
                        className={`${
                            errors.password ? "border border-red-500 pr-10" : ""
                        }`}
                    />
                    {errors.password && (
                        <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle size={18} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{errors.password.message}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Label
                    className="text-muted-foreground"
                    htmlFor="confirmPassword"
                >
                    confirmPassword
                </Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        placeholder="andrew@mail.com"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="confirmPassword"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        {...register("confirmPassword")}
                        className={`${
                            errors.confirmPassword
                                ? "border border-red-500 pr-10"
                                : ""
                        }`}
                    />
                    {errors.confirmPassword && (
                        <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle size={18} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{errors.confirmPassword.message}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>
            </div>

            <Button
                className="w-[160px]"
                disabled={isSubmitting}
                variant={"secondary"}
            >
                {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <p className="px-5">CHANGE PASSWORD</p>
            </Button>
        </form>
    )
}
export default ChangePasswordForm
