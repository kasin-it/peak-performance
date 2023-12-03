import dynamic from "next/dynamic"

const DynamicDesktopView = dynamic(
    () => import("./desktop-view").then((mod) => mod.default),
    {
        ssr: false,
    }
)

const DynamicMobileView = dynamic(
    () => import("./mobile-view").then((mod) => mod.default),
    {
        ssr: false,
    }
)

function Navbar() {
    return (
        <nav className="fixed top-0 z-50 flex h-24 w-full items-center justify-center border-b bg-white text-black">
            <DynamicMobileView />
            <DynamicDesktopView />
        </nav>
    )
}
export default Navbar
