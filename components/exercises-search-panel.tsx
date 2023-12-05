"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import SearchBar2 from "@/components/ui/search-bar-2"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useExercisesSearch } from "@/app/hooks/useExercisesSearch"

function ExercisesSearchPanel() {
    const exercisesSearch = useExercisesSearch()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const queryParam = searchParams.get("q") ?? ""
        const muscleParam = searchParams.get("muscle") ?? ""
        const skillLevelParam = searchParams.get("skill_level") ?? ""
        const exerciseTypeParam = searchParams.get("exercise_type") ?? ""

        exercisesSearch.setSearch(queryParam)
        exercisesSearch.setMuscle(muscleParam)
        exercisesSearch.setSkillLevel(skillLevelParam)
        exercisesSearch.setExerciseType(exerciseTypeParam)
    }, [])

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (
            exercisesSearch.skillLevel !== "" &&
            exercisesSearch.skillLevel != "all"
        )
            queryParams.set("skill_level", exercisesSearch.skillLevel)
        if (
            exercisesSearch.exerciseType !== "" &&
            exercisesSearch.exerciseType != "all"
        )
            queryParams.set("exercise_type", exercisesSearch.exerciseType)
        if (exercisesSearch.muscle !== "" && exercisesSearch.muscle != "all")
            queryParams.set("muscle", exercisesSearch.muscle)
        if (exercisesSearch.search !== "")
            queryParams.set("query", exercisesSearch.search)

        router.push(`/exercises?${queryParams.toString()}`)
        exercisesSearch.onReset()
    }

    const handleMuscleChange = (value: string) => {
        exercisesSearch.setMuscle(value !== "all" ? value : "")
    }

    const handleExerciseTypeChange = (value: string) => {
        exercisesSearch.setExerciseType(value !== "all" ? value : "")
    }

    const handleSkillLevelChange = (value: string) => {
        exercisesSearch.setSkillLevel(value !== "all" ? value : "")
    }

    const handleSortChange = (value: string) => {
        exercisesSearch.setSort(value)
    }
    return (
        <>
            <SearchBar2
                setSearch={exercisesSearch.setSearch}
                search={exercisesSearch.search}
                className="relative flex w-full items-center"
                handleSearch={handleSearch}
            />
            <div className="flex flex-wrap gap-3">
                <Select
                    onValueChange={(value: string) => handleMuscleChange(value)}
                    defaultValue={exercisesSearch.muscle || undefined}
                    value={exercisesSearch.muscle || undefined}
                >
                    <SelectTrigger className="lg:w-[220px]">
                        <SelectValue placeholder="Muscle" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="abdominals">Abs</SelectItem>
                        <SelectItem value="abductors">abductors</SelectItem>
                        <SelectItem value="biceps">biceps</SelectItem>
                        <SelectItem value="calves">calves</SelectItem>
                        <SelectItem value="chest">chest</SelectItem>
                        <SelectItem value="forearms">forearms</SelectItem>
                        <SelectItem value="glutes">glutes</SelectItem>
                        <SelectItem value="hamstrings">hamstrings</SelectItem>
                        <SelectItem value="lats">lats</SelectItem>
                        <SelectItem value="lower_back">lower back</SelectItem>
                        <SelectItem value="middle_back">middle back</SelectItem>
                        <SelectItem value="quadriceps">quadriceps</SelectItem>
                        <SelectItem value="neck">neck</SelectItem>
                        <SelectItem value="traps">traps</SelectItem>
                        <SelectItem value="triceps">triceps</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) => {
                        handleSkillLevelChange(value)
                    }}
                    defaultValue={exercisesSearch.skillLevel || undefined}
                    value={exercisesSearch.skillLevel || undefined}
                >
                    <SelectTrigger className="lg:w-[220px]">
                        <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="expert">Advanced</SelectItem>
                        <SelectItem value="intermediate">
                            Intermediate
                        </SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) =>
                        handleExerciseTypeChange(value)
                    }
                    defaultValue={exercisesSearch.exerciseType || undefined}
                    value={exercisesSearch.exerciseType || undefined}
                >
                    <SelectTrigger className="lg:w-[220px]">
                        <SelectValue placeholder="Exercise Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="olympic_weightlifting">
                            Olympic Weightlifting
                        </SelectItem>
                        <SelectItem value="plyometrics">Plyometrics</SelectItem>
                        <SelectItem value="powerlifting">
                            Powerlifting
                        </SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="stretching">Stretching</SelectItem>
                        <SelectItem value="strongman">Strongman</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) => handleSortChange(value)}
                >
                    <SelectTrigger className="lg:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">A-Z</SelectItem>
                        <SelectItem value="desc">Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleSearch}>Search</Button>
        </>
    )
}
export default ExercisesSearchPanel
