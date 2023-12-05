"use client"

import { useSearchSearch } from "@/app/hooks/useSearchSearch"

import SearchBar3 from "../ui/search-bar-3"

function SearchSearchPanel() {
    const searchSearch = useSearchSearch()

    return (
        <SearchBar3
            className="relative flex w-[300px] items-center sm:w-[400px] lg:w-[600px]"
            search={searchSearch.search}
            path={"search"}
            setSearch={searchSearch.setSearch}
        />
    )
}
export default SearchSearchPanel
