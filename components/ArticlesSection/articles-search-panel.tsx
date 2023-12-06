"use client"

import { useCallback, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useArticlesSearch } from "@/app/hooks/useArticlesSearch"

import SearchBar from "../ui/search-bar"

function ArticlesSearchPanel() {
    const articlesSearch = useArticlesSearch()
    const searchParams = useSearchParams()

    const setSearchRef = useRef(articlesSearch.setSearch)

    const setSearchCallback = useCallback(
        (value: string) => setSearchRef.current(value),
        []
    )

    useEffect(() => {
        const queryParam = searchParams.get("q") ?? ""

        setSearchCallback(queryParam)
    }, [searchParams, setSearchCallback])

    const handleSortChange = (value: string) => {
        articlesSearch.setSort(value)
    }

    return (
        <>
            <SearchBar
                className="relative flex w-full items-center"
                search={articlesSearch.search}
                setSearch={articlesSearch.setSearch}
                onReset={articlesSearch.onReset}
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
