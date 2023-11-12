"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Search } from "lucide-react"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import ExercisePreview from "@/components/ui/exercise-preview"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

function ExercisesPage() {
    const [offset, setOffset] = useState(0)
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [query, setQuery] = useState("")
    const [muscle, setMuscle] = useState("")
    const [skillLevel, setSkillLevel] = useState("")
    const [exerciseType, setExerciseType] = useState("")
    const [emptyResponse, setEmptyResponse] = useState(false)

    const [sort, setSort] = useState<string>("")
    const router = useRouter()

    const fetchExercises = async (
        offsetValue: number,
        initial: boolean = false
    ) => {
        try {
            console.log(exercises)
            const searchParams = new URLSearchParams(window.location.search)

            const skillLevelParam = searchParams.get("skill_level")
            const exerciseTypeParam = searchParams.get("exercise_type")
            const muscleParam = searchParams.get("muscle")
            const queryParam = searchParams.get("query") || ""

            const response = await axios.get("/api/exercises", {
                params: {
                    skill_level: skillLevelParam,
                    exercise_type: exerciseTypeParam,
                    muscle: muscleParam,
                    offset: offsetValue,
                    query: queryParam,
                },
            })
            if (initial) {
                if (response.status === 200) {
                    setExercises([...response.data])
                } else {
                    setError("Something went wrong.")
                }
            } else {
                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setExercises((prevExercises) => [
                            ...(prevExercises || []),
                            ...response.data,
                        ])
                    } else {
                        setEmptyResponse(true)
                    }
                } else {
                    setError("Something went wrong.")
                }
            }
        } catch (error) {
            setError("An error occurred while fetching data.")
        } finally {
            setIsLoading(false)
            setIsFetchingMore(false)
        }
    }

    const handleClick = () => {
        // Increment the offset when the "Load more" button is clicked
        const newOffset = offset + 1
        setOffset(newOffset)
        setIsFetchingMore(true)

        fetchExercises(newOffset)
    }

    const handleSortChange = (value: string) => {
        setSort(value)
        console.log(value)

        // Sort the exercises based on the selected sorting option
        if (value === "asc") {
            setExercises((prevExercises) =>
                prevExercises
                    ? [...prevExercises].sort((a, b) =>
                          a.name.localeCompare(b.name)
                      )
                    : prevExercises
            )
        } else if (value === "desc") {
            setExercises((prevExercises) =>
                prevExercises
                    ? [...prevExercises].sort((a, b) =>
                          b.name.localeCompare(a.name)
                      )
                    : prevExercises
            )
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)

        const skillLevelParam = searchParams.get("skill_level") || ""
        const exerciseTypeParam = searchParams.get("exercise_type") || ""
        const muscleParam = searchParams.get("muscle") || ""
        const queryParam = searchParams.get("query") || ""

        setSkillLevel(skillLevelParam)
        setExerciseType(exerciseTypeParam)
        setMuscle(muscleParam)
        setQuery(queryParam == "null" ? "" : queryParam)

        fetchExercises(0, true)
    }, [])

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (skillLevel !== "" && skillLevel != "all")
            queryParams.set("skill_level", skillLevel)
        if (exerciseType !== "" && exerciseType != "all")
            queryParams.set("exercise_type", exerciseType)
        if (muscle !== "" && muscle != "all") queryParams.set("muscle", muscle)
        if (query !== "") queryParams.set("query", query)

        router.push(`/exercises?${queryParams.toString()}`)
        window.location.reload()
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
                        onValueChange={(value) => setMuscle(value)}
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
                            setSkillLevel(value)
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
                        onValueChange={(value) => setExerciseType(value)}
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
                    <Select onValueChange={handleSortChange}>
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
            <div className="flex w-full max-w-[1500px] flex-wrap justify-between gap-5 pb-12">
                {error && <div>{error}</div>}
                {exercises && exercises.length === 0 && (
                    <div>No exercises found.</div>
                )}
                {isLoading &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className=" m-3 mx-auto h-[475px] w-full max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                        ></Skeleton>
                    ))}

                {exercises && exercises.length > 0 && (
                    <>
                        {exercises.map((exercise, index) => (
                            <ExercisePreview key={index} exercise={exercise} />
                        ))}
                    </>
                )}

                {isFetchingMore &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className=" m-3 mx-auto h-[475px] w-full max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                        ></Skeleton>
                    ))}
            </div>
            {exercises && exercises.length > 0 && !emptyResponse && (
                <Button onClick={handleClick} className="my-10 px-10 py-6">
                    Load more...
                </Button>
            )}
        </div>
    )
}

export default ExercisesPage
