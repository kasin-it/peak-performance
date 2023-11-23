"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import ExercisesSearchResults from "./exercises-search-results"

function ExercisesPage() {
    const searchParams = useSearchParams()
    const queryParam = searchParams.get("q") ?? ""
    const muscleParam = searchParams.get("muscle") ?? ""
    const skillLevelParam = searchParams.get("skill_level") ?? ""
    const exerciseTypeParam = searchParams.get("exercise_type") ?? ""
    const [query, setQuery] = useState<string>(queryParam)
    const [search, setSearch] = useState<string>(queryParam)
    const [muscle, setMuscle] = useState(muscleParam)
    const [skillLevel, setSkillLevel] = useState(skillLevelParam)
    const [exerciseType, setExerciseType] = useState(exerciseTypeParam)
    const [sort, setSort] = useState<string>("")
    const [reset, setReset] = useState(false)

    const router = useRouter()

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (skillLevel !== "" && skillLevel != "all")
            queryParams.set("skill_level", skillLevel)
        if (exerciseType !== "" && exerciseType != "all")
            queryParams.set("exercise_type", exerciseType)
        if (muscle !== "" && muscle != "all") queryParams.set("muscle", muscle)
        if (query !== "") queryParams.set("query", query)

        router.push(`/exercises?${queryParams.toString()}`)
        setSearch(query)
        setReset((prev) => !prev)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="relative flex flex-col items-center px-4">
            <div className="flex w-full flex-col items-center space-y-10 px-4 pb-20 pt-52 text-center text-7xl font-bold">
                <p>Exercises:</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div
                        className={
                            "relative flex w-full max-w-[500px] items-center"
                        }
                    >
                        <Input
                            type="search"
                            placeholder="What are you looking for?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full rounded-lg pr-10"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                    <Select
                        onValueChange={(value) =>
                            value != "all" ? setMuscle(value) : setMuscle("")
                        }
                        defaultValue={muscle || undefined}
                        value={muscle || undefined}
                    >
                        <SelectTrigger className="w-[220px]">
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
                            <SelectItem value="hamstrings">
                                hamstrings
                            </SelectItem>
                            <SelectItem value="lats">lats</SelectItem>
                            <SelectItem value="lower_back">
                                lower back
                            </SelectItem>
                            <SelectItem value="middle_back">
                                middle back
                            </SelectItem>
                            <SelectItem value="quadriceps">
                                quadriceps
                            </SelectItem>
                            <SelectItem value="neck">neck</SelectItem>
                            <SelectItem value="traps">traps</SelectItem>
                            <SelectItem value="triceps">triceps</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) => {
                            value != "all"
                                ? setSkillLevel(value)
                                : setSkillLevel("")
                        }}
                        defaultValue={skillLevel || undefined}
                        value={skillLevel || undefined}
                    >
                        <SelectTrigger className="w-[220px]">
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
                        onValueChange={(value) =>
                            value != "all"
                                ? setExerciseType(value)
                                : setExerciseType("")
                        }
                        defaultValue={exerciseType || undefined}
                        value={exerciseType || undefined}
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Exercise Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="cardio">Cardio</SelectItem>
                            <SelectItem value="olympic_weightlifting">
                                Olympic Weightlifting
                            </SelectItem>
                            <SelectItem value="plyometrics">
                                Plyometrics
                            </SelectItem>
                            <SelectItem value="powerlifting">
                                Powerlifting
                            </SelectItem>
                            <SelectItem value="strength">Strength</SelectItem>
                            <SelectItem value="stretching">
                                Stretching
                            </SelectItem>
                            <SelectItem value="strongman">Strongman</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSort(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">A-Z</SelectItem>
                            <SelectItem value="desc">Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>
            <Separator className="mb-5" />
            <ExercisesSearchResults
                query={search || ""}
                sort={sort}
                muscle={muscle}
                skillLevel={skillLevel}
                exerciseType={exerciseType}
                reset={reset}
            />
        </div>
    )
}

export default ExercisesPage
