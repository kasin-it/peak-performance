"use client"

// Error components must be Client Components
import { useEffect } from "react"
import Image from "next/image"
import error_img from "@/public/error.jpg"

import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 pt-20">
            <h2 className="text-7xl font-bold uppercase text-blue-700">
                Something went wrong!
            </h2>

            <Image src={error_img} width={600} height={600} alt="error 404" />

            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}
