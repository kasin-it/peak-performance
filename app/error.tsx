"use client"

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
        console.error(error)
    }, [error])

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 pt-20">
            <h2 className="text-center text-7xl font-bold uppercase text-blue-700">
                Something went wrong!
            </h2>

            <Image src={error_img} width={600} height={600} alt="error 404" />

            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}
