import { NextResponse } from "next/server"
import axios from "axios"

const BASE_URL = "https://api.api-ninjas.com/v1/exercises"

interface QueryParams {
    name?: string
}

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)
        const name = searchParams.get("query")

        const queryParams: QueryParams = {}

        if (name !== null && name != "undefined") queryParams.name = name

        const queryString = Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key as keyof QueryParams]}`)
            .join("&")

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
