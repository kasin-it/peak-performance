"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchBar = ({
    className,
    value = "",
}: {
    className?: string
    value?: string
}) => {
    const [query, setQuery] = useState(value)

    const router = useRouter()
    const handleSearch = () => {
        router.push(`/search?query=${query}`)
        window.location.reload()
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
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
