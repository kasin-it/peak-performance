"use client"

import { Search } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import SearchBar from "../ui/search-bar"

function SearchSheet() {
    return (
        <Sheet>
            <SheetTrigger className="bg-transparent text-blue-300 hover:bg-transparent hover:text-blue-500">
                <Search className="h-8 w-8" strokeWidth={"1px"} />
            </SheetTrigger>
            <SheetContent
                side={"top"}
                className="flex h-72 items-center justify-center px-28"
            >
                <SearchBar path={"search"} />
            </SheetContent>
        </Sheet>
    )
}
export default SearchSheet
