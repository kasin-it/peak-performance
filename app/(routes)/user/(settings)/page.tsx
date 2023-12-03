import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { Label } from "@/components/ui/label"

const DynamicSignOutForm = dynamic(
    () => import("./forms/sign-out-form").then((mod) => mod.default),
    {
        ssr: true,
    }
)

async function ProfilePage() {
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)

    return (
        <section className="flex flex-col flex-wrap space-y-10 py-12">
            <div>
                <Label className="text-xl">Username: </Label>
                <p className="text-xl ">{data![0].username}</p>
            </div>
            <div>
                <Label className="text-xl">Email: </Label>
                <p className="text-xl ">{user!.email}</p>
            </div>
            <div>
                <Label className="text-xl">Joined at: </Label>
                <p className="text-xl ">{user!.created_at}</p>
            </div>
            <DynamicSignOutForm />
        </section>
    )
}
export default ProfilePage
