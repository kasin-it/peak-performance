"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Heart } from "lucide-react"

import { Database } from "@/types/database"
import { Comment } from "@/types/types"

import { Skeleton } from "../ui/skeleton"

function CommentsSection({ articleId }: { articleId: string }) {
    const supabase = createClientComponentClient<Database>()
    const [comments, setComments] = useState<any | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getComments = async () => {
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select()
                    .eq("slug", articleId)
                    .order("created_at")

                if (error) {
                    console.error(error)
                    setComments("error")
                } else {
                    setComments(data)
                }

                setLoading(false)
            } catch (error) {
                console.error(error)
                setComments("error")
                setLoading(false)
            }
        }

        getComments()
    }, [articleId])

    return (
        <section className="flex w-full max-w-[1500px] flex-col justify-center space-y-6 border-y px-5 py-8">
            <h2 className="text-xl font-bold tracking-widest text-blue-500">
                COMMENTS
            </h2>
            {isLoading ? (
                Array.from({ length: 4 }, (value, index) => (
                    <article
                        className="flex max-w-[500px] flex-wrap"
                        key={index}
                    >
                        <Skeleton className="h-[100px] w-[100px] rounded-full" />
                    </article>
                ))
            ) : (
                <div>
                    {comments === "error" ? (
                        <p>Error fetching comments</p>
                    ) : (
                        <div>
                            {comments.length > 0 ? (
                                comments.map((comment: Comment) => (
                                    <article
                                        className="flex w-full max-w-[600px] space-x-5 rounded-sm border-t px-5 py-5"
                                        key={comment.id}
                                    >
                                        <div className="h-[60px] w-[60px] rounded-full bg-blue-50" />
                                        <div className="flex flex-col flex-wrap space-y-2">
                                            <h1 className="font-bold">
                                                {comment.slug}
                                            </h1>
                                            <p className=" max-w-[450px] break-words">
                                                {comment.comment}
                                            </p>
                                        </div>
                                        <Heart />
                                        {"13"}
                                    </article>
                                ))
                            ) : (
                                <div>ther is not comments</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default CommentsSection
