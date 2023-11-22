import { NextResponse } from "next/server"
import axios from "axios"
import { createClient } from "contentful"

import { Label } from "@/components/ui/label"

interface QueryParams {
    skip?: number
    query?: string
}
const accessToken = process.env.CONTENTFUL_ACCESS_KEY
const space = process.env.CONTENTFUL_SPACE_ID

const contentfulClient = createClient({
    accessToken: accessToken ? accessToken : "",
    space: space ? space : "",
})

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)
        const skip = searchParams.get("skip")
        const query = searchParams.get("query")

        const queryParams: QueryParams = {}

        if (skip !== null && skip != "undefined")
            queryParams.skip = parseInt(skip)
        if (query !== null && query != "undefined") queryParams.query = query

        try {
            const res = await contentfulClient.getEntries({
                content_type: "article",
                limit: 6,
                query: queryParams.query ? queryParams.query : "",
                skip: queryParams.skip ? queryParams.skip : 0,
            })

            return NextResponse.json(res)
        } catch (error) {
            console.error("[EXERCISES_GET] Axios Error:", error)
            return new NextResponse("Internal error", { status: 500 })
        }
    } catch (error) {
        console.error("[EXERCISES_GET] Request Parsing Error:", error)
        return new NextResponse("Bad Request", { status: 400 })
    }
}
