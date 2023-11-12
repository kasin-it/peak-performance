"use client"

import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { Button, buttonVariants } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

function SearchForm() {
    const router = useRouter()
    const [skillLevel, setSkillLevel] = useState("")
    const [exerciseType, setExerciseType] = useState("")

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (skillLevel !== "" && skillLevel != "all")
            queryParams.set("skill_level", skillLevel)
        if (exerciseType !== "" && exerciseType != "all")
            queryParams.set("exercise_type", exerciseType)

        router.push(`/exercises?${queryParams.toString()}`)
        window.location.reload()
    }

    return (
        <div className="flex flex-wrap justify-center gap-7">
            <Select
                onValueChange={(value) => {
                    setSkillLevel(value)
                }}
                defaultValue={skillLevel || undefined}
                value={skillLevel || undefined}
            >
                <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="expert">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => setExerciseType(value)}
                defaultValue={exerciseType || undefined}
                value={exerciseType || undefined}
            >
                <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Exercise Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="olympic_weightlifting">
                        Olympic Weightlifting
                    </SelectItem>
                    <SelectItem value="plyometrics">Plyometrics</SelectItem>
                    <SelectItem value="powerlifting">Powerlifting</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="stretching">Stretching</SelectItem>
                    <SelectItem value="strongman">Strongman</SelectItem>
                </SelectContent>
            </Select>

            <Button
                onClick={handleSearch}
                variant={"secondary"}
                className="w-[400px] px-10 md:w-[400px]"
            >
                Search
            </Button>
        </div>
    )
}

export default SearchForm
