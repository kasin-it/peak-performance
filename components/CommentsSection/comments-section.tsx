"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Heart, Trash } from "lucide-react"

import { Database } from "@/types/database"
import { Comment as CommentType } from "@/types/types"

import { Avatar } from "../ui/avatar"
import { Skeleton } from "../ui/skeleton"
import Comment from "./comment"
import { InsertCommentForm } from "./insert-comment-form"

function CommentsSection({ articleId }: { articleId: string }) {
    const supabase = createClientComponentClient<Database>()
    const [comments, setComments] = useState<any | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<any | null>(null)

    // const handleDelete =() => {
    //     const {data, error} = await
    // }

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()

                if (error) {
                    console.log(error)
                }

                if (data.user) {
                    setCurrentUser(data.user)
                }
            } catch (error) {
                console.log(error)
            }
        }

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
                    console.log(data)
                }

                setLoading(false)
            } catch (error) {
                console.error(error)
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
            <h2 className="w-full text-center text-xl font-bold tracking-widest text-blue-500 lg:text-left">
                COMMENTS
            </h2>
            <section className="lg:justify-left  flex flex-col items-center space-x-0 space-y-10 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0">
                <section className="flex w-full flex-col items-center lg:items-start lg:justify-start">
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
                        <div className="w-full">
                            {comments === "error" ? (
                                <p>Error fetching comments</p>
                            ) : (
                                <div className="w-full  space-y-6">
                                    {comments.length > 0 ? (
                                        comments.map((comment: CommentType) => (
                                            <Comment
                                                comment={comment}
                                                currentUser={currentUser}
                                            />
                                        ))
                                    ) : (
                                        <div>ther is not comments</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </section>
                <InsertCommentForm
                    articleId={articleId}
                    currentUser={currentUser}
                />
            </section>
        </section>
    )
}

export default CommentsSection
