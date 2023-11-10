"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import ExercisePreview from "@/components/ui/exercise-preview"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

function ExercisesPage() {
    const [offset, setOffset] = useState(1)
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)

    const [sort, setSort] = useState<string>("")

    const fetchExercises = async () => {
        try {
            const searchParams = new URLSearchParams(window.location.search)

            const skillLevel = searchParams.get("skill_level")
            const exerciseType = searchParams.get("exercise_type")
            const muscle = searchParams.get("muscle")

            const response = await axios.get("/api/exercises", {
                params: {
                    skill_level: skillLevel,
                    exercise_type: exerciseType,
                    muscle: muscle,
                    offset: offset, // Use the current offset
                },
            })

            if (response.status === 200) {
                setExercises((prevExercises) => [
                    ...(prevExercises || []),
                    ...response.data,
                ])
            } else {
                setError("Something went wrong.")
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
        setOffset((prevOffset) => prevOffset + 1)
        setIsFetchingMore(true)

        fetchExercises() // Fetch more data
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
        fetchExercises()
    }, [])

    return (
        <div className="relative flex flex-col items-center">
            <div className="flex w-full flex-col items-center space-y-10 pb-20 pt-52 text-center text-7xl font-bold">
                <p>Exercises:</p>
                <div className="flex justify-center space-x-4">
                    <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">A-Z</SelectItem>
                            <SelectItem value="desc">Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex w-full max-w-[1500px] flex-wrap justify-between pb-12">
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
                            <ExercisePreview exercise={exercise} key={index} />
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
            <Button onClick={handleClick} className="my-10 px-10 py-6">
                Load more...
            </Button>
        </div>
    )
}

export default ExercisesPage
