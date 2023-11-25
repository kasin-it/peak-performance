"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createBrowserClient } from "@supabase/ssr"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    email: z.string(),
    password: z
        .string()
        .min(1, "Password is required.")
        .min(8, "Password must be at least 8 characters."),
})

export function SignInForm({ className, ...props }: SignInFormProps) {
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
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // const supabase = createClientComponentClient()

        const { data: _, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })
        if (error) {
            setError("email", { message: error.message })
            setError("password", { message: error.message })
            return
        }
        toast.success("Login has been successfull!")

        window.location.href = "/"
    }

    return (
        <div
            className={cn(
                "flex w-full flex-col px-4 sm:w-[400px] sm:px-0",
                className
            )}
            {...props}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-3"
            >
                <div>
                    <Label className="text-muted-foreground" htmlFor="email">
                        Email
                    </Label>
                    <div className="relative">
                        <Input
                            id="email"
                            placeholder="andrew@mail.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("email")}
                            className={`${
                                errors.email
                                    ? "border border-red-500 pr-10"
                                    : ""
                            }`}
                        />
                        {errors.email && (
                            <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.email.message}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Label className="text-muted-foreground" htmlFor="password">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("password")}
                            className={`${
                                errors.password
                                    ? "border border-red-500 pr-10"
                                    : ""
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
                <div className="flex items-center space-x-3">
                    <Button
                        className="w-[160px]"
                        disabled={isSubmitting}
                        variant={"secondary"}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <p className="px-5">SIGN IN</p>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground ">
                        or{" "}
                    </p>
                    <Link
                        href="/auth/sign-up"
                        className="text-muted-foreground underline underline-offset-4 hover:text-blue-500"
                    >
                        Sign up
                    </Link>
                </div>
                <p>
                    <Link
                        href="/"
                        className="text-muted-foreground underline-offset-4 hover:text-blue-500"
                    >
                        Back to home
                    </Link>
                </p>
                <div className="absolute -right-10 top-2 w-full text-left text-muted-foreground">
                    <p>Demo Account:</p>
                    <p className="pl-5">Email: andrew@mail.com</p>
                    <p className="pl-5">Password: andrewspassword</p>
                </div>
            </form>
        </div>
    )
}
