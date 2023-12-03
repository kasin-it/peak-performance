"use client"

import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchBar3 = ({
    className,
    query,
    search,
    setSearch,
    setQuery,
    path,
}: {
    className?: string
    query: string
    search: string
    path: string
    setSearch: (value: string) => void
    setQuery: (value: string) => void
}) => {
    const router = useRouter()

    let localSearch = search

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (localSearch !== "") queryParams.set("query", localSearch)

        router.push(`/${path}?query=${queryParams.toString()}`)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearch(query)
            localSearch = query
            handleSearch()
        }
    }
    return (
        <div className={cn("relative flex w-full items-center", className)}>
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
    )
}

export default SearchBar3
