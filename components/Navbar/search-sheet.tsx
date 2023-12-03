"use client"

import { Search } from "lucide-react"

import SearchBar1 from "@/components/ui/search-bar-1"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
                <SearchBar1 />
            </SheetContent>
        </Sheet>
    )
}
export default SearchSheet
