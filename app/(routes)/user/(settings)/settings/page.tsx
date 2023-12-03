import dynamic from "next/dynamic"

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
        <div className=" max-w-[400px] py-12">
            <div className="space-y-20">
                <div className="space-y-2">
                    <DynamicChangeEmailForm />
                </div>
                <div className="space-y-2">
                    <DynamicChangeUsernameForm />
                </div>
                <div className="space-y-2">
                    <DynamicChangePasswordForm />
                </div>
            </div>
        </div>
    )
}
export default ProfilePage
