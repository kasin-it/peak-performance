import { cn } from "@/lib/utils"

import { SignUpForm } from "../components/sign-up-form"

export default function SignUpPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-start pt-36">
            <h1
                className={cn(
                    "text-2xl font-black italic tracking-tight text-blue-500"
                )}
            >
                SIGN UP
            </h1>
            <SignUpForm />
        </div>
    )
}
