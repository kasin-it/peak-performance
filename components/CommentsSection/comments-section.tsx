"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

import { Comment as CommentType } from "@/types/types"

import { Skeleton } from "../ui/skeleton"
import Comment from "./comment"
import { InsertCommentForm } from "./insert-comment-form"

function CommentsSection({ articleId }: { articleId: string }) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [comments, setComments] = useState<CommentType[] | "error" | null>(
        null
    )
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<any | null>(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()

                if (error) {
                    console.error("Error fetching user:", error)
                }

                if (data?.user) {
                    setCurrentUser(data.user)
                } else {
                    console.log("User not authenticated or token expired")
                }
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }

        // Function to fetch comments for the specified article
        const getComments = async () => {
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select()
                    .eq("slug", articleId)
                    .order("created_at")

                if (error) {
                    console.error("Error fetching comments:", error)
                    setComments("error")
                } else {
                    setComments(data)
                }

                setLoading(false)
            } catch (error) {
                console.error("Error fetching comments:", error)
                setComments("error")
                setLoading(false)
            }
        }

        getComments()
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
            <section className="lg:justify-left  flex flex-col items-center space-x-0 space-y-10 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0">
                <section className="flex w-full flex-col  items-center lg:items-start lg:justify-start">
                    {/* Insert Comment Form */}
                    <InsertCommentForm
                        articleId={articleId}
                        currentUser={currentUser}
                    />

                    {/* Display skeleton loading or comments */}
                    {isLoading ? (
                        // Skeleton loading
                        Array.from({ length: 4 }, (_, index) => (
                            <article
                                className="flex max-w-[500px] flex-wrap"
                                key={index}
                            >
                                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                            </article>
                        ))
                    ) : (
                        // Render comments or error message
                        <div className="w-full">
                            {comments === "error" ? (
                                // Display error message
                                <p>Error fetching comments</p>
                            ) : (
                                // Display comments or no comments message
                                <div className="w-full  space-y-6">
                                    {comments && comments.length > 0 ? (
                                        // Render each comment
                                        comments.map((comment: CommentType) => (
                                            <Comment
                                                comment={comment}
                                                currentUser={currentUser}
                                                key={comment.id}
                                            />
                                        ))
                                    ) : (
                                        // No comments message
                                        <div>No comments available</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </section>
        </section>
    )
}

export default CommentsSection
