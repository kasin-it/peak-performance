"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const NewsletterBar = ({ className }: { className?: string }) => {
    const [query, setQuery] = useState("")

    const router = useRouter()
    const handleSearch = () => {
        router.push(`/browse?q=${query}`)
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
                placeholder="Subscribe to our newsletter!"
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
                <ChevronRight size={16} />
            </button>
        </div>
    )
}

export default NewsletterBar
