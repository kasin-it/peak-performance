import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import SearchResults from "@/components/SearchSection/search-results"
import SearchSearchPanel from "@/components/SearchSection/search-search-panel"

function SearchPage() {
    return (
        <section className="flex w-full flex-col items-center space-y-10 px-5 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pb-8 pt-48 text-4xl font-bold">Search:</h1>
                <div className="flex justify-center space-x-4 pb-12">
                    <Suspense>
                        <SearchSearchPanel />
                    </Suspense>
                </div>
            </div>
            <Separator />
            <article className="w-full max-w-[1500px]">
                <Suspense>
                    <SearchResults />
                </Suspense>
            </article>
        </section>
    )
}
export default SearchPage
