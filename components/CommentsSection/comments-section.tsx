"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import { Sunset } from "lucide-react"

import { Comment as CommentType } from "@/types/types"

import Comment from "./comment"
import { InsertCommentForm } from "./insert-comment-form"

function CommentsSection({ articleId }: { articleId: string }) {
    const [comments, setComments] = useState<CommentType[]>([])
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()

                if (error) {
                    console.log(error)
                } else {
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select()
                    .eq("slug", articleId)
                    .order("created_at")

                if (error) {
                    console.log(error)
                    setError(error.message || "An error occurred")
                } else {
                    setComments(data || [])
                }
            } catch (error) {
                console.log(error)
                setError("An error occurred while fetching data")
            }
        }

        fetchData()
        getUser()
    }, [articleId, supabase])

    return (
        <section
            className="flex w-full max-w-[1500px] flex-col justify-center space-y-6 border-y px-5 py-8"
            id="comments"
        >
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-blue-500">
                    Leave a Comment
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Share your thoughts about this article.
                </p>
            </div>
            <section className="lg:justify-left flex flex-col items-start space-x-0 space-y-10 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0">
                {user ? (
                    <section className="flex w-full flex-col items-center lg:items-start lg:justify-start">
                        {/* Insert Comment Form */}
                        <InsertCommentForm articleId={articleId} />

                        {comments && (
                            // Render comments or error message
                            <div className="w-full py-10">
                                <div className="w-full space-y-6">
                                    {comments.map((comment: CommentType) => (
                                        <Comment
                                            comment={comment}
                                            key={comment.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {error && error}
                    </section>
                ) : (
                    <section className="rounded-sm border border-blue-300 px-4 py-3">
                        <Link href={"/auth/sign-in"} className="text-blue-500 ">
                            Sign in{" "}
                        </Link>
                        to see comments
                    </section>
                )}
            </section>
        </section>
    )
}

export default CommentsSection
