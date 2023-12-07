import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const DynamicSignOutForm = dynamic(
    () => import("./forms/sign-out-form").then((mod) => mod.default),
    {
        ssr: true,
    }
)

function formatDate(dateString: string) {
    // Parse the input date string using the input format
    const parsedDate = new Date(dateString)

    // Format the parsed date using the output format

    const formattedDate = parsedDate.toLocaleDateString(undefined)

    return formattedDate
}

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
            <Card className="w-full">
                <CardHeader className="border-b pb-4">
                    <CardTitle className="font-semibold">
                        {data![0].username}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                        {user!.email}
                    </CardDescription>
                    <div className="mt-2 max-w-[200px] rounded-full bg-blue-500 text-center text-white">
                        {formatDate(user!.created_at)}
                    </div>
                </CardHeader>
            </Card>
            <DynamicSignOutForm />
        </section>
    )
}
export default ProfilePage
