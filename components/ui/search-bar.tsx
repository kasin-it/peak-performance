"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useSearchSearch } from "@/app/hooks/useSearchSearch"

const SearchBar = ({
    className,
    search,
    setSearch,
    path,
    onReset,
}: {
    className?: string
    search?: string
    path: string
    setSearch?: (value: string) => void
    onReset: () => void
}) => {
    const router = useRouter()
    const [query, setQuery] = useState(search !== undefined ? search : "")
    const searchSearch = useSearchSearch()

    const handleSearch = () => {
        const queryParams = new URLSearchParams()

        if (search !== "") queryParams.set("query", query || "")
        if (onReset) {
            onReset()
        } else {
            searchSearch.onReset()
        }

        router.push(`/${path}?${queryParams.toString()}`)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (setSearch) {
                setSearch(query)
            }
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

export default SearchBar
