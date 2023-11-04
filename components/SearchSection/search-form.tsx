"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../ui/button"
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
    skillLevel: z.string(), // z.enum(["all", "advanced", "intermediate", "beginner"]),
    exerciseType: z.string(), //z.enum(["all", "bodyweight", "power"]),
})

function SearchForm({ className, ...props }: SearchFormProps) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })
    const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
        router.push(
            `/exercises?skill_level=${formData.skillLevel}&exercise_type=${formData.exerciseType}`
        )
    }

    return (
        <form
            className="justify-left flex w-full flex-col flex-wrap items-center space-y-5 py-6 lg:flex-row lg:space-x-5 lg:space-y-0"
            onSubmit={handleSubmit(onSubmit)}
            // onSubmit={() => {
            //     console.log("submit")
            // }}
        >
            <Select disabled={isSubmitting} {...register("skillLevel")}>
                <SelectTrigger className="sm:w-[500px] lg:w-[280px]">
                    <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                </SelectContent>
            </Select>
            {errors.skillLevel && (
                <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                    <p>{errors.skillLevel.message}</p>
                </div>
            )}
            {errors.exerciseType && (
                <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                    <p>{errors.exerciseType.message}</p>
                </div>
            )}
            <Select disabled={isSubmitting} {...register("exerciseType")}>
                <SelectTrigger className="sm:w-[500px] lg:w-[380px]">
                    <SelectValue placeholder="Exercise Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="bodyweight">Bodyweight</SelectItem>
                    <SelectItem value="power">Power</SelectItem>
                    <SelectItem value="strength-training">
                        Strength Training
                    </SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                </SelectContent>
            </Select>

            <Button
                className="px-16"
                variant={"secondary"}
                disabled={isSubmitting}
                type="submit"
            >
                SEARCH
            </Button>
            <Link
                href="/exercises"
                passHref
                className="text-muted-foreground underline hover:cursor-pointer hover:text-blue-500"
            >
                View All Exercises
            </Link>
        </form>
    )
}

export default SearchForm
