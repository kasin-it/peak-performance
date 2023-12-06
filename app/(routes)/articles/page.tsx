import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import ArticlesSearchPanel from "@/components/ArticlesSection/articles-search-panel"
import ArticlesSearchResults from "@/components/ArticlesSection/articles-search-results"

function Articles() {
    return (
        <section className="flex w-full flex-col items-center px-3 pb-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="pt-48 text-6xl font-bold">Articles:</h1>
                <div className="flex flex-col justify-center space-y-3 pb-12 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Suspense>
                        <ArticlesSearchPanel />
                    </Suspense>
                </div>
            </div>
            <Separator className="mb-10" />
            <Suspense>
                <ArticlesSearchResults />
            </Suspense>
        </section>
    )
}

export default Articles
