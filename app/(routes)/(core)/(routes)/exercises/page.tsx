"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import ExercisesRender from "./exercises-render"

function ExercisesPage() {
    const [offset, setOffset] = useState(1)
    const handleClick = () => {
        setOffset((prev) => (prev += 1))
    }
    return (
        <div className="flex flex-col items-center pb-12 pt-48">
            <h1 className="pb-10 text-6xl font-bold text-black/80">
                Exercises:
            </h1>
            <section className="flex-center flex w-full max-w-[1500px] flex-wrap gap-2">
                {Array.from({ length: offset }).map((_, index) => (
                    <ExercisesRender offset={index} key={index} />
                ))}
            </section>
            <Button onClick={handleClick} className="mt-10 px-10 py-6">
                Load more...
            </Button>
        </div>
    )
}

export default ExercisesPage
