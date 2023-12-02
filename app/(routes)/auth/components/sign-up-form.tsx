"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
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

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof formSchema>

const formSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required.")
            .email("Email is invalid."),
        username: z
            .string()
            .min(1, "Username is required.")
            .min(3, "Username must be at least 3 characters.")
            .max(25, "Username must be at most 25 characters.")
            .refine(
                (value) => /^[a-zA-Z0-9-_]+$/.test(value),
                "Username can only contain letters, numbers, hyphens, and underscores."
            ),
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

export function SignUpForm({ className, ...props }: SignUpFormProps) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
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
        const signUpResponse = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (signUpResponse.error) {
            setError("email", { message: signUpResponse.error.message })
            return
        }

        const updateUsernameResponse = await supabase
            .from("profiles")
            .update({
                username: formData.username,
            })
            .eq("id", signUpResponse.data.user!.id)

        if (updateUsernameResponse.error) {
            return
        }

        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
            >
                <div className="w-0 flex-1 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="mt-1 text-sm text-gray-500">
                                Check your email for confirmation link.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ))

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
                <p className="text-red-500"></p>
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
                    <Label className="text-muted-foreground" htmlFor="username">
                        Username
                    </Label>
                    <div className="relative">
                        <Input
                            id="username"
                            placeholder="Andrew33"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isSubmitting}
                            {...register("username")}
                            className={`${
                                errors.username
                                    ? "border border-red-500 pr-10"
                                    : ""
                            }`}
                        />
                        {errors.username && (
                            <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <AlertCircle size={18} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{errors.username.message}</p>
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
                <div>
                    <Label
                        className="text-muted-foreground"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            placeholder="••••••••"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-confirmPassword"
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
                                            <p>
                                                {errors.confirmPassword.message}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Button className="w-[160px]" disabled={isSubmitting}>
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <p className="px-5">SIGN UP</p>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground ">
                        or{" "}
                    </p>
                    <Link
                        href="/auth/sign-in"
                        className="text-muted-foreground underline underline-offset-4 hover:text-blue-500"
                    >
                        Sign in
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
            </form>
        </div>
    )
}
