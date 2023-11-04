"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/database"
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
    currentUser: boolean
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
    currentUser,
    ...props
}: InsertCommentFormProps) {
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
            {currentUser ? (
                <div
                    className={cn(
                        "flex w-full flex-col rounded-xl border-t border-gray-100 p-4 shadow-md sm:w-[600px]",
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
                            <Label
                                className="text-muted-foreground"
                                htmlFor="comment"
                            >
                                Comment
                            </Label>
                            <div className="relative">
                                <Textarea
                                    id="comment"
                                    placeholder="andrew@mail.com"
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
                                                    <p>
                                                        {errors.comment.message}
                                                    </p>
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
                            <p className="px-5">Comment</p>
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="rounded-xl border-t border-gray-100 p-5 shadow-lg">
                    <h1>Sign in to comment</h1>
                </div>
            )}
        </>
    )
}
