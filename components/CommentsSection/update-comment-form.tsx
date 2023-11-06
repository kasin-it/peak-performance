"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { DialogClose, DialogFooter } from "../ui/dialog"
import { Textarea } from "../ui/textarea"

interface UpdateCommentFormProps extends React.HTMLAttributes<HTMLDivElement> {
    commentId: string
    userId: string
    content: string
}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    comment: z
        .string()
        .min(1, "Message can not be empty.")
        .max(256, "Message can be only 256 characters."),
})

export function UpdateCommentForm({
    className,
    commentId,
    userId,
    content,
    ...props
}: UpdateCommentFormProps) {
    const supabase = createClientComponentClient<Database>()

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
        const { data: _, error } = await supabase
            .from("comments")
            .update({
                comment: formData.comment,
            })
            .eq("id", commentId)
            .eq("user_id", userId)
        if (error) {
            setError("comment", { message: error.message })
            return
        }

        window.location.reload()
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-3"
            >
                <div>
                    <Label className="text-muted-foreground" htmlFor="comment">
                        Comment
                    </Label>
                    <div className="relative">
                        <Textarea
                            id="comment"
                            placeholder="andrew@mail.com"
                            autoCapitalize="none"
                            autoCorrect="off"
                            defaultValue={content}
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
                <DialogFooter className="sm:justify-end">
                    <Button
                        className="w-[160px]"
                        disabled={isSubmitting}
                        variant={"secondaryOutline"}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <p className="px-5">Comment</p>
                    </Button>

                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </>
    )
}
