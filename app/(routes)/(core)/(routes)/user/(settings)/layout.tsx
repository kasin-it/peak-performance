import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"
import { SidebarNav } from "@/components/ui/sidebar-nav"

async function UserSettingsLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase.from("profiles").select().eq("id", user!.id)

    const sidebarNavItems = [
        {
            title: "Profile",
            href: "/user/",
        },
        {
            title: "Settings",
            href: "/user/settings",
        },
    ]

    return (
        <section className="flex w-full justify-center px-5 py-36">
            <section className="w-full max-w-[1500px]">
                <h1 className="w-full pb-10 text-center text-5xl font-bold">
                    {data![0].username}
                </h1>
                <div className="flex flex-col justify-center space-y-8 lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="w-full flex-1">{children}</div>
                </div>
            </section>
        </section>
    )
}
export default UserSettingsLayout
