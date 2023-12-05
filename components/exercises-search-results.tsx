"use client"

import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import ExercisePreview from "@/components/ui/exercise-preview"
import { Skeleton } from "@/components/ui/skeleton"
import { useExercisesSearch } from "@/app/hooks/useExercisesSearch"

function ExercisesSearchResults() {
    const [offset, setOffset] = useState(0)
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [emptyResponse, setEmptyResponse] = useState(false)

    const exercisesSearch = useExercisesSearch()

    const fetchExercises = useCallback(
        async (hardRefresh?: boolean) => {
            try {
                setIsLoading(true)
                const response = await axios.get("/api/exercises", {
                    params: {
                        query: exercisesSearch.search,
                        muscle: exercisesSearch.muscle,
                        skill_level: exercisesSearch.skillLevel,
                        exercise_type: exercisesSearch.exerciseType,
                    },
                })

                if (response.data.length > 0) {
                    setExercises((prevExercises: any) => {
                        if (!hardRefresh) {
                            return [...prevExercises, ...response.data]
                        } else {
                            return [...response.data]
                        }
                    })
                    if (response.data.length < 10) {
                        setEmptyResponse(true)
                    }
                } else {
                    setExercises([])
                    setEmptyResponse(true)
                }
            } catch (error) {
                setError("An error occurred while fetching data.")
            } finally {
                setIsLoading(false)
                setIsFetchingMore(false)
            }
        },
        [exercisesSearch]
    )

    const fetchMoreExercises = async (offset: number) => {
        try {
            setIsFetchingMore(true)
            const response = await axios.get("/api/exercises", {
                params: {
                    offset: offset,
                    query: exercisesSearch.search,
                    muscle: exercisesSearch.muscle || "",
                    skill_level: exercisesSearch.skillLevel || "",
                    exercise_type: exercisesSearch.exerciseType || "",
                },
            })

            if (response.data.length > 0) {
                setExercises((prevExercises: Exercise[]) => {
                    return [...prevExercises, ...response.data]
                })
            } else {
                setEmptyResponse(true)
            }
        } catch (error) {
            setError("An error occurred while fetching data.")
        } finally {
            setIsLoading(false)
            setIsFetchingMore(false)
        }
    }

    const handleClick = () => {
        const newOffset = offset + 1
        setIsFetchingMore(true)
        fetchMoreExercises(newOffset)
        setOffset(newOffset)
    }

    const handleSortChange = useCallback(() => {
        if (exercisesSearch.sort === "asc") {
            setExercises((prevExercises: any) =>
                prevExercises
                    ? [...prevExercises].sort((a, b) =>
                          a.name.localeCompare(b.name)
                      )
                    : prevExercises
            )
        } else if (exercisesSearch.sort === "desc") {
            setExercises((prevExercises: any) =>
                prevExercises
                    ? [...prevExercises].sort((a, b) =>
                          b.name.localeCompare(a.name)
                      )
                    : prevExercises
            )
        }
    }, [exercisesSearch.sort])

    useEffect(() => {
        handleSortChange()
    }, [exercisesSearch.sort, handleSortChange])

    useEffect(() => {
        fetchExercises(true)
    }, [exercisesSearch.search, exercisesSearch.reset, fetchExercises])

    const generateLoadingSkeletons = () =>
        Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
                key={index}
                className="m-3 mx-auto h-[415px] w-[448px] max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
            />
        ))

    return (
        <>
            <article className="grid max-w-[1500px] grid-cols-1 gap-5 overflow-hidden py-10 lg:grid-cols-2 2xl:grid-cols-3">
                {error && <div>{error}</div>}

                {exercises.length === 0 && !isLoading && !error && (
                    <div>No exercises found.</div>
                )}
                {exercises.map((exercise: Exercise, index: number) => (
                    <ExercisePreview exercise={exercise} key={index} />
                ))}

                {isLoading && generateLoadingSkeletons()}
                {isFetchingMore && generateLoadingSkeletons()}
            </article>
            {!isFetchingMore && exercises.length > 0 && !emptyResponse && (
                <Button onClick={handleClick} className="my-10 px-10 py-6">
                    Load more...
                </Button>
            )}
        </>
    )
}
export default ExercisesSearchResults
