"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createBrowserClient } from "@supabase/ssr"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Textarea } from "../ui/textarea"

interface InsertCommentFormProps extends React.HTMLAttributes<HTMLDivElement> {
    articleId: string
}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    comment: z
        .string()
        .min(1, "Message can not be empty.")
        .max(256, "Message can be only 256 characters."),
})

export function InsertCommentForm({
    className,
    articleId,
    ...props
}: InsertCommentFormProps) {
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
        const { data: _, error } = await supabase.from("comments").insert({
            comment: formData.comment,
            slug: articleId,
        })
        if (error) {
            setError("comment", { message: error.message })
            return
        }
        window.location.reload()
    }

    return (
        <>
            <div
                className={cn("flex w-full max-w-[600px] flex-col", className)}
                {...props}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-3"
                >
                    <div>
                        <Label
                            className="text-muted-foreground"
                            htmlFor="comment"
                        >
                            Comment
                        </Label>
                        <div className="relative">
                            <Textarea
                                id="comment"
                                placeholder="Enter your comment"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isSubmitting}
                                {...register("comment")}
                                className={`${
                                    errors.comment
                                        ? "border border-red-500 pr-10"
                                        : ""
                                }`}
                                rows={10}
                            />
                            {errors.comment && (
                                <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <AlertCircle size={18} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{errors.comment.message}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        disabled={isSubmitting}
                        variant={"default"}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <p className="px-5">Post Comment</p>
                    </Button>
                </form>
            </div>
        </>
    )
}
