import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"
import ExercisesSearchPanel from "@/components/exercises-search-panel"
import ExercisesSearchResults from "@/components/exercises-search-results"

function ExercisesPage() {
    return (
        <div className="relative flex flex-col items-center px-4">
            <div className="flex w-full flex-col items-center space-y-10 px-4 pb-20 pt-48 text-center">
                <h1 className="text-6xl font-bold">Exercises:</h1>
                <div className="flex flex-col gap-4">
                    <Suspense fallback={<p>lodaing</p>}>
                        <ExercisesSearchPanel />
                    </Suspense>
                </div>
            </div>
            <Separator className="mb-5" />
            <Suspense fallback={<p>lodaing</p>}>
                <ExercisesSearchResults />
            </Suspense>
        </div>
    )
}

export default ExercisesPage
