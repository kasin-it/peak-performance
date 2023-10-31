"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

import { Skeleton } from "../ui/skeleton"

function CommentsSection({ articleID }: { articleId: string }) {
    // const supabase = createClientComponentClient<Database>()
    const [comments, setComments] = useState<any>(null)

    // const getComments = async () => {
    //     // const { data, error } = supabase.from.
    // }

    const dummyObjects = Array.from({ length: 4 }, (value, index) => (
        <article className="flex max-w-[500px] flex-wrap">
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
        </article>
    ))

    return (
        <section className="flex w-full max-w-[1500px] flex-col justify-center border-y px-5 py-8">
            <h2 className="text-xl font-bold tracking-widest text-blue-500">
                COMMENTS
            </h2>
            <div>{comments ? "" : dummyObjects}</div>
        </section>
    )
}
export default CommentsSection
