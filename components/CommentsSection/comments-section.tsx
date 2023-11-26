import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { Comment as CommentType } from "@/types/types"

import Comment from "./comment"
import { InsertCommentForm } from "./insert-comment-form"

export const dynamic = "force-dynamic"

async function CommentsSection({ articleId }: { articleId: string }) {
    const cookieStore = cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("slug", articleId)
        .order("created_at")

    console.log(error)

    const comments = data

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
            <section className="lg:justify-left flex flex-col items-center space-x-0 space-y-10 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0">
                <section className="flex w-full flex-col items-center lg:items-start lg:justify-start">
                    {/* Insert Comment Form */}
                    <InsertCommentForm articleId={articleId} />

                    {comments && (
                        // Render comments or error message
                        <div className="w-full">
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
                    {error && <p>erorr</p>}
                </section>
            </section>
        </section>
    )
}

export default CommentsSection
