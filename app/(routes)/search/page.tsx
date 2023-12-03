"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import SearchBar3 from "@/components/ui/search-bar-3"
import { Separator } from "@/components/ui/separator"
import SearchResults from "@/components/SearchSection/search-results"

function SearchPage() {
    const searchParams = useSearchParams()
    const queryParam = searchParams.get("query") ?? ""
    const [query, setQuery] = useState(queryParam)
    const [search, setSearch] = useState(queryParam || "")
    const [reset, setReset] = useState(false)

    useEffect(() => {
        setReset((prev) => !prev)
    }, [search])

    return (
        <section className="flex w-full flex-col items-center space-y-10 px-5 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pb-8 pt-48 text-4xl font-bold">Search:</h1>
                <div className="flex justify-center space-x-4 pb-12">
                    <SearchBar3
                        className="relative flex w-[300px] items-center sm:w-[400px] lg:w-[600px]"
                        query={query}
                        setQuery={setQuery}
                        search={search}
                        path={"search"}
                        setSearch={setSearch}
                    />
                </div>
            </div>
            <Separator />
            <article className="w-full max-w-[1500px]">
                <SearchResults query={search} reset={reset} />
            </article>
        </section>
    )
}
export default SearchPage
