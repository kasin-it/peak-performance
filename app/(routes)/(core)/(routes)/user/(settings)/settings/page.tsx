import ChangeEmailForm from "../forms/change-email-form"
import ChangePasswordForm from "../forms/change-password-form"
import ChangeUsernameForm from "../forms/change-username-form"

function ProfilePage() {
    return (
        <div className=" max-w-[400px] py-12">
            <div className="space-y-20">
                <div className="space-y-2">
                    <ChangeEmailForm />
                </div>
                <div className="space-y-2">
                    <ChangeUsernameForm />
                </div>
                <div className="space-y-2">
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    )
}
export default ProfilePage
