"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { Exercise } from "@/types/types"

function ExercisesPage() {
    const [exercises, setExercises] = useState<null | Exercise[] | string>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchExercises = async () => {
            const searchParams = new URLSearchParams(window.location.search)

            const skill_level = searchParams.get("skill_level")
            const exercise_type = searchParams.get("exercise_type")

            const response = await axios.get(
                `/api/exercises?skill_level=${skill_level}&exercise_type=${exercise_type}`
            )

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
