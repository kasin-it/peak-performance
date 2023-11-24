"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
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
    const router = useRouter()

    const handleSearch = () => {
        router.push(`/articles?q=${query}`)
        setSearch(query)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <section className="flex w-full flex-col items-center px-3 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pt-48 text-6xl font-bold">Articles:</h1>
                <div className="flex justify-center space-x-4 pb-12">
                    <div className={"relative flex w-full items-center"}>
                        <Input
                            type="search"
                            placeholder="What are you looking for?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full rounded-lg pr-10"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                    <Select onValueChange={(value) => setSort(value)}>
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
            <Separator className="mb-10" />
            <ArticlesSearchResults sort={sort} query={search || ""} />
        </section>
    )
}

export default Articles
