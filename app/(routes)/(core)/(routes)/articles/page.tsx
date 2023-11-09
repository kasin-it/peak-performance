"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import ArticlePreview from "@/components/ui/article-preview"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

function Articles() {
    const [articles, setArticles] = useState<any>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [skip, setSkip] = useState(0)
    const [sort, setSort] = useState<string>("")

    const fetchArticles = async (skipValue: number) => {
        try {
            const response = await axios.get("/api/articles", {
                params: {
                    skip: skipValue,
                },
            })
            console.log(response.data)
            setArticles([...articles, ...response.data.items])
        } catch (error) {
            setError("An error occurred while fetching data.")
        } finally {
            setIsLoading(false)
            setIsFetchingMore(false)
        }
    }

    const handleClick = () => {
        const newSkip = skip + 6 // Increase skip by 5
        setIsFetchingMore(true)
        fetchArticles(newSkip)
        setSkip(newSkip) // Update skip for the next load more
    }

    useEffect(() => {
        fetchArticles(0)
    }, [])

    const handleSortChange = (value: string) => {
        setSort(value)

        // Sort the exercises based on the selected sorting option
        if (value === "asc") {
            setArticles((prevArticles: any[]) =>
                prevArticles
                    ? [...prevArticles].sort((a, b) =>
                          a.fields.title.localeCompare(b.fields.title)
                      )
                    : prevArticles
            )
        } else if (value === "desc") {
            setArticles((prevArticles: any) =>
                prevArticles
                    ? [...prevArticles].sort((a, b) =>
                          b.fields.title.localeCompare(a.fields.title)
                      )
                    : prevArticles
            )
        }
    }

    return (
        <section className="flex w-full flex-col items-center">
            <div className="space-y-5">
                <h1 className=" pt-48 text-4xl font-bold">Articles:</h1>
                <div className="flex justify-center space-x-4 pb-12">
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
            <article className="grid max-w-[1500px] grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                {error && <div>{error}</div>}
                {isLoading &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="m-3 mx-auto h-[415px] w-[448px] max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                        ></Skeleton>
                    ))}
                {articles.length === 0 && !isLoading && !error && (
                    <div>No articles found.</div>
                )}
                {articles.map((article: any, index: number) => (
                    <ArticlePreview article={article} key={index} />
                ))}
                {isFetchingMore &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="m-3 mx-auto h-[415px] w-[448px] max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                        ></Skeleton>
                    ))}
            </article>
            {!isFetchingMore && articles.length > 0 && (
                <Button onClick={handleClick} className="my-10 px-10 py-6">
                    Load more...
                </Button>
            )}
        </section>
    )
}

export default Articles
