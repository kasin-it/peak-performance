"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import SearchBar3 from "@/components/ui/search-bar-3"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import ArticlesSearchResults from "@/components/ArticlesSection/articles-search-results"

function Articles() {
    const searchParams = useSearchParams()
    const queryParam = searchParams.get("q") ?? ""
    const [query, setQuery] = useState<string>(queryParam)
    const [search, setSearch] = useState<string>(queryParam)
    const [sort, setSort] = useState<string>("")

    return (
        <section className="flex w-full flex-col items-center px-3 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pt-48 text-6xl font-bold">Articles:</h1>
                <div className="flex flex-col justify-center space-y-3 pb-12 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <SearchBar3
                        className="relative flex w-full items-center"
                        query={query}
                        search={search}
                        setQuery={setQuery}
                        setSearch={setSearch}
                        path={"articles"}
                    />
                    <Select onValueChange={(value) => setSort(value)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">A-Z</SelectItem>
                            <SelectItem value="desc">Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Separator className="mb-10" />
            <ArticlesSearchResults sort={sort} query={search || ""} />
        </section>
    )
}

export default Articles
