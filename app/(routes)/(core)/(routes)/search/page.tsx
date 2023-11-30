"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import SearchResults from "@/components/SearchSection/search-results"

function SearchPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const queryParam = searchParams.get("query") ?? ""
    const [query, setQuery] = useState(queryParam)
    const [search, setSearch] = useState(queryParam)
    const [reset, setReset] = useState(false)

    const handleSearch = () => {
        router.push(`/search?query=${query}`)
        setSearch(query)
        setReset((prev) => !prev)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <section className="flex w-full flex-col items-center space-y-10 px-5 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pb-8 pt-48 text-4xl font-bold">Search:</h1>
                <div className="flex justify-center space-x-4 pb-12">
                    <div
                        className={
                            "relative flex w-[300px] items-center sm:w-[400px] lg:w-[600px]"
                        }
                    >
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
