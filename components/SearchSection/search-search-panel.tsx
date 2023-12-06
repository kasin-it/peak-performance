"use client"

import { useSearchSearch } from "@/app/hooks/useSearchSearch"

import SearchBar from "../ui/search-bar"

function SearchSearchPanel() {
    const searchSearch = useSearchSearch()

    return (
        <SearchBar
            className="relative flex w-[300px] items-center sm:w-[400px] lg:w-[600px]"
            search={searchSearch.search}
            path={"search"}
            setSearch={() => {}}
            onReset={searchSearch.onReset}
        />
    )
}
export default SearchSearchPanel
