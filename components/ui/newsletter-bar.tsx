"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, ChevronRight, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Database } from "@/types/database"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface InsertCommentFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    email: z.string().email(),
})

const NewsletterBar = ({ className }: InsertCommentFormProps) => {
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
        const { data: _, error } = await supabase.from("newsletter").insert({
            email: formData.email,
        })
        if (error) {
            setError("email", { message: error.message })
            return
        }
        toast.success("Succesfull sign up for newsletter")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={cn("relative flex w-full items-center", className)}>
                <Input
                    type="text"
                    placeholder="Subscribe to our newsletter!"
                    className="w-full rounded-lg pr-10"
                    {...register("email")}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <div className="-translate-y-2/5 absolute right-8 top-1/4 text-red-500">
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
                <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary"
                    disabled={isSubmitting}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </form>
    )
}

export default NewsletterBar
