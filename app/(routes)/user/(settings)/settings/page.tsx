import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DynamicChangeEmailForm = dynamic(
    () => import("../forms/change-email-form").then((mod) => mod.default),
    {
        ssr: true,
    }
)
const DynamicChangePasswordForm = dynamic(
    () => import("../forms/change-password-form").then((mod) => mod.default),
    {
        ssr: true,
    }
)
const DynamicChangeUsernameForm = dynamic(
    () => import("../forms/change-username-form").then((mod) => mod.default),
    {
        ssr: true,
    }
)

function ProfilePage() {
    return (
        <div className="grid grid-cols-1 gap-6 p-6">
            <Card className="w-full">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Account Settings</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                    <DynamicChangeUsernameForm />
                    <DynamicChangeEmailForm />
                    <div className="pt-10">
                        <DynamicChangePasswordForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default ProfilePage
