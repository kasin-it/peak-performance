import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import ArticlePreview from "@/components/ui/article-preview"

import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface ArticlesSearchResults {
    query: string
    sort: string
}

function ArticlesSearchResults({ query, sort }: ArticlesSearchResults) {
    const [articles, setArticles] = useState<any>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [skip, setSkip] = useState(0)
    const [emptyResponse, setEmptyResponse] = useState(false)

    const fetchArticles = useCallback(
        async (hardRefresh?: boolean) => {
            try {
                setIsLoading(true)
                const response = await axios.get("/api/articles", {
                    params: {
                        query: query,
                    },
                })

                if (response.data.items.length > 0) {
                    setArticles((prevArticles: any) => {
                        if (!hardRefresh) {
                            return [...prevArticles, ...response.data.items]
                        } else {
                            return [...response.data.items]
                        }
                    })
                    if (response.data.items.length < 10) {
                        setEmptyResponse(true)
                    }
                } else {
                    setArticles([])
                    setEmptyResponse(true)
                }
            } catch (error) {
                setError("An error occurred while fetching data.")
            } finally {
                setIsLoading(false)
                setIsFetchingMore(false)
            }
        },
        [query]
    )

    const fetchMoreArticles = async (skipValue: number) => {
        try {
            setIsFetchingMore(true)
            const response = await axios.get("/api/articles", {
                params: {
                    skip: skipValue,
                    query: query,
                },
            })

            if (response.data.items.length > 0) {
                setArticles((prevArticles: any) => {
                    return [...prevArticles, ...response.data.items]
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
        const newSkip = skip + 6
        setIsFetchingMore(true)
        fetchMoreArticles(newSkip)
        setSkip(newSkip)
    }

    const handleSortChange = useCallback(() => {
        if (sort === "asc") {
            setArticles((prevArticles: any[]) =>
                prevArticles
                    ? [...prevArticles].sort((a, b) =>
                          a.fields.title.localeCompare(b.fields.title)
                      )
                    : prevArticles
            )
        } else if (sort === "desc") {
            setArticles((prevArticles: any) =>
                prevArticles
                    ? [...prevArticles].sort((a, b) =>
                          b.fields.title.localeCompare(a.fields.title)
                      )
                    : prevArticles
            )
        }
    }, [sort])

    useEffect(() => handleSortChange(), [sort, handleSortChange])

    useEffect(() => {
        fetchArticles(true)
        console.log("hard refresh!")
    }, [query, fetchArticles])

    const generateLoadingSkeletons = () =>
        Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
                key={index}
                className="m-3 mx-auto h-[415px] w-[448px] max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
            ></Skeleton>
        ))

    return (
        <section className="overflow-hidden">
            <article className="mb-2 grid max-w-[1500px] grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                {error && <div>{error}</div>}

                {articles.length === 0 && !isLoading && !error && (
                    <div>No articles found.</div>
                )}
                {articles.map((article: any, index: number) => (
                    <ArticlePreview article={article} key={index} />
                ))}

                {isLoading && generateLoadingSkeletons()}
                {isFetchingMore && generateLoadingSkeletons()}
            </article>
            {!isFetchingMore && articles.length > 0 && !emptyResponse && (
                <Button onClick={handleClick} className="my-10 px-10 py-6">
                    Load more...
                </Button>
            )}
        </section>
    )
}
export default ArticlesSearchResults
