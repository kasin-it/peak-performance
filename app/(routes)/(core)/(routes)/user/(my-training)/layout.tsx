import { SidebarNav } from "@/components/ui/sidebar-nav"

async function UserTrainingLayout({ children }: { children: React.ReactNode }) {
    const sidebarNavItems = [
        {
            title: "Training Plan",
            href: "/user/training-plan",
        },
        {
            title: "My Wourkouts",
            href: "/user/workouts",
        },
        {
            title: "My Exercises",
            href: "/user/exercises",
        },
    ]

    return (
        <section className="flex w-full justify-center px-5 py-36">
            <section className="w-full max-w-[1500px]">
                <div className="flex flex-col justify-center space-y-8">
                    <aside className="-mx-4">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="w-full flex-1">{children}</div>
                </div>
            </section>
        </section>
    )
}
export default UserTrainingLayout
