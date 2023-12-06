"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"

import { useSearchSearch } from "@/app/hooks/useSearchSearch"

import ArticlePreview from "../ui/article-preview"
import ExercisePreview from "../ui/exercise-preview"
import { Skeleton } from "../ui/skeleton"

function SearchResults() {
    const [error, setError] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const searchSearch = useSearchSearch()
    const searchParams = useSearchParams()

    const fetchResults = useCallback(async (query: string) => {
        try {
            setIsLoading(true)
            const exercisesResponse = await axios.get("/api/exercises", {
                params: {
                    query: query,
                },
            })
            const articlesResponse = await axios.get("/api/articles", {
                params: {
                    query: query,
                },
            })

            if (
                exercisesResponse.status === 200 &&
                articlesResponse.status === 200
            ) {
                const mixedResults = []

                const maxLen = Math.max(
                    exercisesResponse.data.length,
                    articlesResponse.data.items.length
                )

                for (let i = 0; i < maxLen; i++) {
                    if (i < exercisesResponse.data.length) {
                        mixedResults.push({
                            type: "exercise",
                            data: exercisesResponse.data[i],
                        })
                    }

                    if (i < articlesResponse.data.items.length) {
                        mixedResults.push({
                            type: "article",
                            data: articlesResponse.data.items[i],
                        })
                    }
                }

                setResults(mixedResults)
            } else {
                setError("Something went wrong.")
            }
        } catch (error) {
            setError("An error occurred while fetching data.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const queryParam = searchParams.get("query") ?? ""
        fetchResults(queryParam)
    }, [fetchResults, searchSearch.reset])

    return (
        <div className="flex max-w-[1500px] flex-wrap gap-10 ">
            {error && <div>{error}</div>}
            {isLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="m-3 mx-auto h-[415px] w-[448px] max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                    ></Skeleton>
                ))}
            {results.map((result, index) => (
                <>
                    {result.type === "exercise" && (
                        <ExercisePreview exercise={result.data} key={index} />
                    )}
                    {result.type === "article" && (
                        <ArticlePreview article={result.data} key={index} />
                    )}
                </>
            ))}
            {results.length === 0 && <p>No results found. </p>}
        </div>
    )
}
export default SearchResults
