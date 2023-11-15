import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import ChangeEmailForm from "./form/forms/change-email-form"
import ChangePasswordForm from "./form/forms/change-password-form"
import ChangeUsernameForm from "./form/forms/change-username-form"

function ProfilePage() {
    return (
        <div className="mx-auto max-w-md space-y-6">
            <h1 className="text-center text-3xl font-bold">User Settings</h1>
            <div className="space-y-4">
                <div className="space-y-2">
                    <ChangeEmailForm />
                </div>
                <div className="space-y-2">
                    <ChangeUsernameForm />
                </div>
                <div className="space-y-2">
                    <ChangePasswordForm />
                </div>
                <Link href={"/auth/sign-out"}>
                    <p className="mt-4 w-full rounded-md bg-red-500 py-2 text-center font-medium text-white">
                        Sign Out
                    </p>
                </Link>
            </div>
        </div>
    )
}
export default ProfilePage
