import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import SearchBar3 from "@/components/ui/search-bar-3"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useArticlesSearch } from "@/app/hooks/useArticlesSearch"

function ArticlesSearchPanel() {
    const articlesSearch = useArticlesSearch()
    const searchParams = useSearchParams()

    useEffect(() => {
        const queryParam = searchParams.get("q") ?? ""

        articlesSearch.setSearch(queryParam)
    }, [])

    const handleSortChange = (value: string) => {
        articlesSearch.setSort(value)
    }

    return (
        <>
            <SearchBar3
                className="relative flex w-full items-center"
                search={articlesSearch.search}
                setSearch={articlesSearch.setSearch}
                path={"articles"}
            />
            <Select onValueChange={(value) => handleSortChange(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">A-Z</SelectItem>
                    <SelectItem value="desc">Z-A</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}
export default ArticlesSearchPanel
