"use client"

import { AnyNaptrRecord } from "dns"
import { useEffect, useState } from "react"
import axios from "axios"

import ArticlePreview from "@/components/ui/article-preview"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
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
            const exercisesResponse = await axios.get("/api/exercises/search", {
                params: {
                    query: encodeURI(query),
                },
            })
            const articlesResponse = await axios.get("/api/articles/search", {
                params: {
                    query: encodeURI(query),
                },
            })

            if (
                exercisesResponse.status === 200 &&
                articlesResponse.status === 200
            ) {
                const mixedResults = [
                    ...exercisesResponse.data.map((exercise: any) => ({
                        type: "exercise",
                        data: exercise,
                    })),
                    ...articlesResponse.data.map((article: any) => ({
                        type: "article",
                        data: article,
                    })),
                ]

                const randomizedResults = mixedResults.sort(
                    () => Math.random() - 0.5
                )

                setResults(randomizedResults)
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
        const query = searchParams.get("q") || ""

        const encoded = encodeURI("dupa mnie boli")
        console.log("encoded", encoded)
        console.log("encoded", decodeURI(encoded))
        if (query != "") {
            setIsLoading(true)
            fetchResults(query)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <section className="flex w-full flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pb-8 pt-48 text-4xl font-bold">Search:</h1>
                <SearchBar className="w-[500px]" />
            </div>
            <article className="w-full max-w-[1500px]">
                <Separator />
                <div className="grid max-w-[1500px] grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
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
