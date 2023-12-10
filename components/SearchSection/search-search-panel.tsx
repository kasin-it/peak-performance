"use client"

import { useSearchSearch } from "@/app/hooks/useSearchSearch"

import SearchBar from "../ui/search-bar"

function SearchSearchPanel() {
    const searchSearch = useSearchSearch()

    return (
        <SearchBar
            className="relative mt-10 flex w-[300px] items-center"
            search={searchSearch.search}
            path={"search"}
            setSearch={() => {}}
            onReset={searchSearch.onReset}
        />
    )
}
export default SearchSearchPanel
