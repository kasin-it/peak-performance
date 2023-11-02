import { count, error } from "console"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Heart, Trash } from "lucide-react"
import toast from "react-hot-toast"

import { Database } from "@/types/database"
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
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

interface CommentProps {
    comment: CommentType
    currentUser: any
}

function Comment({ comment, currentUser }: CommentProps) {
    const supabase = createClientComponentClient<Database>()

    const router = useRouter()

    const [username, setUsername] = useState<any>(null)

    const handleRemove = async (commentId: string) => {
        const { data, error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId)
            .eq("user_id", comment.user_id)
        if (error) {
            console.log(error)
            toast.error("Something went wrong.")
        } else {
            toast.success("Comment removed.")
            router.refresh()
        }
    }
    const handleUpdate = async (commentId: string) => {
        const { data, error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId)
            .eq("user_id", comment.user_id)
        if (error) {
            console.log(error)
            toast.error("Something went wrong.")
        } else {
            toast.success("Comment removed.")
            router.refresh()
        }
    }

    useEffect(() => {
        const getUsername = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", comment.user_id)

            if (error) {
                console.log(error)
            }

            if (data) {
                setUsername(data[0].username)
            }
        }

        getUsername()
    })

    return (
        <article
            className="relative flex w-full justify-between rounded-sm border-t border-gray-100 px-5 pb-10 pt-5 shadow-md lg:w-[600px]"
            key={comment.id}
        >
            <div className="flex space-x-3">
                <Avatar>
                    <div className="h-[50px] w-[50px] bg-blue-50" />
                </Avatar>
                <div className="flex flex-wrap space-x-2">
                    <h1 className="font-bold text-blue-500">
                        {username ? username : "Can not get username"}
                    </h1>
                    <p className=" max-w-[450px] break-words text-muted-foreground">
                        {comment.comment}
                    </p>
                </div>
            </div>
            {currentUser.id == comment.user_id ? (
                <div className="absolute bottom-1 right-4 flex space-x-2 text-black/80">
                    {/* <button
                        onClick={() => handleRemove(comment.id)}
                        className="transition duration-200 hover:text-red-500"
                    >
                        Remove
                    </button> */}
                    <AlertDialog>
                        <AlertDialogTrigger>Remove</AlertDialogTrigger>
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
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleRemove(comment.id)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Dialog>
                        <DialogTrigger>Edit</DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>
                                    Anyone who has this link will be able to
                                    view this.
                                </DialogDescription>
                            </DialogHeader>
                            <Textarea
                                id="link"
                                defaultValue={comment.comment}
                            />
                            <DialogFooter className="sm:justify-end">
                                <Button variant={"secondaryOutline"}>
                                    Confirm
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            ) : (
                ""
            )}
        </article>
    )
}
export default Comment
