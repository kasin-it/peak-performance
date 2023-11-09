"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Search } from "lucide-react"

import { Exercise } from "@/types/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
                // Append the new data to the existing exercises
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
                            <Card
                                className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl"
                                key={index}
                            >
                                <div className="p-8">
                                    <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                                        {exercise.name}
                                    </CardTitle>
                                    {/* <CardDescription className="mt-2 text-gray-500">
                                        Start your day with a refreshing morning
                                        workout.
                                    </CardDescription> */}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-700">
                                            Muscles targeted:{" "}
                                            <span className="font-semibold">
                                                {exercise.muscle}
                                            </span>
                                        </p>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Equipment needed:{" "}
                                            <span className="font-semibold">
                                                {exercise.equipment}
                                            </span>
                                        </p>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Type:{" "}
                                            <span className="font-semibold">
                                                {exercise.type}
                                            </span>
                                        </p>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Difficulty:{" "}
                                            <span className="font-semibold">
                                                {exercise.difficulty}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <CardTitle className="mt-1 block text-lg font-medium leading-tight text-black">
                                            Exercise Instructions
                                        </CardTitle>
                                        <CardDescription className="mt-2 text-gray-500">
                                            Follow these instructions to perform
                                            the exercise correctly:
                                        </CardDescription>

                                        <p>
                                            {exercise.instructions
                                                ? exercise.instructions
                                                : "No instructions added"}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            className="text-blue-600 hover:text-blue-900"
                                            variant="outline"
                                        >
                                            Add to my workout
                                        </Button>
                                    </div>
                                </div>
                            </Card>
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
