"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

interface SearchFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    skillLevel: z.any(),
    exerciseType: z.any(),
})

function SearchForm({ className, ...props }: SearchFormProps) {
    const router = useRouter()

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { isSubmitting },
    // } = useForm<FormData>({
    //     resolver: zodResolver(formSchema),
    //     mode: "onSubmit",
    //     reValidateMode: "onSubmit",
    // })

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
        router.push(
            `/exercises?skill_level=${formData.skillLevel}&exercise_type=${formData.exerciseType}`
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="justify-left flex w-full flex-col flex-wrap items-center space-y-5 py-6 lg:flex-row lg:space-x-5 lg:space-y-0"
            >
                <FormField
                    control={form.control}
                    name="skillLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill Level</FormLabel>
                            <div className="relative w-max">
                                <FormControl>
                                    <select
                                        className={cn(
                                            "w-[300px]  cursor-pointer appearance-none rounded-md border border-blue-300 bg-white px-2 py-2 font-normal sm:w-[500px] lg:w-[380px]"
                                        )}
                                        {...field}
                                    >
                                        <option value="all">All</option>
                                        <option value="expert">Advanced</option>
                                        <option value="intermediate">
                                            Intermediate
                                        </option>
                                        <option value="beginner">
                                            Beginner
                                        </option>
                                    </select>
                                </FormControl>
                                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="exerciseType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exercise Type</FormLabel>
                            <div className="relative w-max">
                                <FormControl>
                                    <select
                                        className={cn(
                                            "w-[300px] cursor-pointer appearance-none rounded-md border border-blue-300 bg-white px-2 py-2 font-normal sm:w-[500px] lg:w-[380px]"
                                        )}
                                        {...field}
                                    >
                                        <option value="all">All</option>
                                        <option value="cardio">cardio</option>
                                        <option value="olympic_weightlifting">
                                            Olympic Weightlifting
                                        </option>
                                        <option value="plyometrics">
                                            Plyometrics
                                        </option>
                                        <option value="powerlifting">
                                            Powerlifting
                                        </option>
                                        <option value="strength">
                                            Strength
                                        </option>
                                        <option value="stretching">
                                            Stretching
                                        </option>
                                        <option value="strongman">
                                            Strongman
                                        </option>
                                    </select>
                                </FormControl>
                                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex h-[73px] items-end">
                    <Button
                        className="px-16"
                        variant={"secondary"}
                        type="submit"
                    >
                        SEARCH
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SearchForm
