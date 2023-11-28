import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { Label } from "@/components/ui/label"

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
        <section className="py-26 flex flex-wrap space-x-4">
            <div>
                <Label>Username: </Label>
                <p>{data![0].username}</p>
            </div>
            <div>
                <Label>Email: </Label>
                <p>{user!.email}</p>
            </div>
            <div>
                <Label>Joined at: </Label>
                <p>{user!.created_at}</p>
            </div>
        </section>
    )
}
export default ProfilePage
