import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"
import { SidebarNav } from "@/components/ui/sidebar-nav"

async function UserPage({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase.from("profiles").select().eq("id", user!.id)

    const sidebarNavItems = [
        {
            title: "Profile",
            href: "/user",
        },
        {
            title: "Training Plan",
            href: "/user/training-plan",
        },
        {
            title: "Options",
            href: "/user/options",
        },
    ]

    return (
        <section className="flex w-full justify-center px-5 pt-36">
            <section className="w-full max-w-[1500px]">
                <h1 className="text-5xl font-bold">{data![0].username}</h1>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </section>
        </section>
    )
}
export default UserPage
