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
    const searchParams = new URLSearchParams(window.location.search)
    const [error, setError] = useState("")
    const query = searchParams.get("q") || ""
    const [exercises, setExercises] = useState<any[]>([])
    const [articles, setArticles] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchExercises = async () => {
        try {
            const response = await axios.get("/api/exercises/search", {
                params: {
                    query: query,
                },
            })

            if (response.status === 200) {
                setExercises((prevExercises: any) => [
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
        }
    }
    const fetchArticles = async () => {
        try {
            const response = await axios.get("/api/articles/search", {
                params: {
                    query: query,
                },
            })

            if (response.status === 200) {
                setArticles((prevArticles: any) => [
                    ...(prevArticles || []),
                    ...response.data,
                ])
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
        if (query != "") {
            console.log("query:", query)
            setIsLoading(true)
            fetchArticles()
            fetchExercises()
        } else {
            setIsLoading(false)
        }
    }, [query])

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
                    {exercises && exercises.length > 0 && (
                        <>
                            {exercises.map((exercise, index) => (
                                <ExercisePreview
                                    exercise={exercise}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                    {articles.length === 0 &&
                        exercises.length === 0 &&
                        !isLoading &&
                        !error && <div>No results found.</div>}
                    {articles.map((article: any, index: number) => (
                        <ArticlePreview article={article} key={index} />
                    ))}
                </div>
            </article>
        </section>
    )
}
export default SearchPage
