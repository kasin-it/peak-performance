import { NextResponse } from "next/server"
import axios from "axios"

const BASE_URL = "https://api.api-ninjas.com/v1/exercises"

interface QueryParams {
    difficulty?: string
    type?: string
    muscle?: string
}

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)
        const difficulty = searchParams.get("skill_level")
        const type = searchParams.get("exercise_type")
        const muscle = searchParams.get("muscle")

        const queryParams: QueryParams = {}

        // Add parameters to the queryParams object only if they have values
        if (difficulty !== null) queryParams.difficulty = difficulty
        if (type !== null) queryParams.type = type
        if (muscle !== null) queryParams.muscle = muscle

        // Build the query string from the queryParams object
        const queryString = Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key as keyof QueryParams]}`)
            .join("&")

        console.log(queryString)

        // Create the complete URL with the query string
        const searchParamsUrl = queryString ? `?${queryString}` : ""

        const config = {
            headers: {
                "X-Api-Key": process.env.NINJA_API_KEY,
            },
        }

        try {
            const response = await axios.get(BASE_URL + searchParamsUrl, config)
            const exercises = response.data
            return NextResponse.json(exercises)
        } catch (error) {
            console.error("[EXERCISES_GET] Axios Error:", error)
            return new NextResponse("Internal error", { status: 500 })
        }
    } catch (error) {
        console.error("[EXERCISES_GET] Request Parsing Error:", error)
        return new NextResponse("Bad Request", { status: 400 })
    }
}
