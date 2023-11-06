"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { Exercise } from "@/types/types"

function ExercisesPage() {
    const [exercises, setExercises] = useState<null | Exercise[] | string>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await axios.get("/api/exercises")

            if (response.status !== 200) {
                setError("Something went wrong.")
            }

            if (!response.data) {
                setExercises("Not found")
            } else {
                setExercises(response.data)
            }
        }

        fetchExercises()
    }, [])

    return <div className="h-full pt-96">{JSON.stringify(exercises)}</div>
}

export default ExercisesPage
