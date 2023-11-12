"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import ArticlePreview from "@/components/ui/article-preview"
import ExercisePreview from "@/components/ui/exercise-preview"
import SearchBar from "@/components/ui/search-bar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

function SearchPage() {
    const [error, setError] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchResults = async (query: string) => {
        try {
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
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const queryParam = searchParams.get("query") || ""

        if (queryParam != "") {
            setIsLoading(true)
            fetchResults(queryParam)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <section className="flex w-full flex-col items-center space-y-10 px-5 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pb-8 pt-48 text-4xl font-bold">Search:</h1>
                <SearchBar className="w-full min-w-[400px]" />
            </div>
            <Separator />
            <article className="w-full max-w-[1500px]">
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
                                <ExercisePreview
                                    exercise={result.data}
                                    key={index}
                                />
                            )}
                            {result.type === "article" && (
                                <ArticlePreview
                                    article={result.data}
                                    key={index}
                                />
                            )}
                        </>
                    ))}
                </div>
            </article>
        </section>
    )
}
export default SearchPage
