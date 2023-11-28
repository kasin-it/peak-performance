"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import toast from "react-hot-toast"

import { Comment as CommentType } from "@/types/types"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { UpdateCommentForm } from "./update-comment-form"

interface CommentProps {
    comment: CommentType
}

function Comment({ comment }: CommentProps) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [user, setUser] = useState<null | any>(null)
    const [username, setUsername] = useState<string | null>(null)

    // Function to handle comment removal
    const handleRemove = async (commentId: string) => {
        try {
            const { error } = await supabase
                .from("comments")
                .delete()
                .eq("id", commentId)
                .eq("user_id", comment.user_id)

            if (error) {
                toast.error("Something went wrong.")
                console.error(error)
            } else {
                toast.success("Comment removed.")
            }
        } catch (error) {
            toast.error("Something went wrong.")
            console.error(error)
        }

        // Reload the page after comment removal
        window.location.reload()
    }

    // Effect to fetch username on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser()
                setUser(user)

                const { data, error } = await supabase
                    .from("profiles")
                    .select("username")
                    .eq("id", comment.user_id)

                if (error) {
                    toast.error("Something went wrong.")
                    console.error(error)
                }

                setUsername(data?.[0]?.username || "Can not get username")
            } catch (error) {
                toast.error("Something went wrong.")
                console.error(error)
            }
        }

        fetchData()
    }, [comment, supabase])

    const timeDifference =
        new Date().getTime() - new Date(comment.created_at).getTime()

    // Convert the time difference to seconds
    const secondsDifference = Math.floor(timeDifference / 1000)

    // Convert seconds to a more readable format (hours, minutes, seconds)
    const hours = Math.floor(secondsDifference / 3600)
    const minutes = Math.floor((secondsDifference % 3600) / 60)
    const seconds = secondsDifference % 60

    // Create a string representing the time difference
    const timeAgoString =
        hours > 0
            ? `${hours} ${hours === 1 ? "hour" : "hours"} ago`
            : minutes > 0
            ? `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
            : `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`

    return (
        <div className="flex items-start gap-4 text-sm">
            {/* User Avatar */}
            <Avatar className="h-10 w-10 border">
                <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>
                    {username?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            {/* Comment Details */}
            <div className="grid gap-1.5">
                <div className="flex items-center justify-between gap-2">
                    {/* User Information */}
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">{username}</div>
                        <p>{timeAgoString}</p>
                    </div>

                    {/* Edit and Delete Buttons */}
                    <div className="flex items-center space-x-2">
                        {user?.id === comment.user_id && (
                            <>
                                {/* Edit Comment Dialog */}
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            className="text-xs"
                                            variant="outline"
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Share link
                                            </DialogTitle>
                                            <DialogDescription>
                                                Anyone who has this link will be
                                                able to view this.
                                            </DialogDescription>
                                        </DialogHeader>

                                        {/* Update Comment Form */}
                                        <UpdateCommentForm
                                            commentId={comment.id}
                                            userId={user.id}
                                            content={comment.comment}
                                        />
                                    </DialogContent>
                                </Dialog>

                                {/* Delete Comment AlertDialog */}
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button
                                            className="text-xs"
                                            variant="destructive"
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleRemove(comment.id)
                                                }
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        )}
                    </div>
                </div>

                {/* Comment Content */}
                <p className="max-w-[500px] break-words leading-7">
                    {comment.comment}
                </p>
            </div>
        </div>
    )
}

export default Comment
