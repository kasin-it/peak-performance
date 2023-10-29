import { cn } from "@/lib/utils"

import { SignInForm } from "../components/sign-in-form"

export default function SignInPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-start pt-36">
            <h1
                className={cn(
                    "text-2xl font-black italic tracking-tight text-orange-500"
                )}
            >
                SIGN IN
            </h1>
            <SignInForm />
        </div>
    )
}
