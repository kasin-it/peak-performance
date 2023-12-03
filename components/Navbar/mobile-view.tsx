import dynamic from "next/dynamic"
import Link from "next/link"

const DynamicAccountSectionMobile = dynamic(
    () => import("./account-section-mobile").then((mod) => mod.default),
    {
        ssr: false,
    }
)

const DynamicHamburgerMenuSheet = dynamic(
    () => import("./hamburger-menu-sheet").then((mod) => mod.default),
    {
        ssr: false,
    }
)

function MobileView() {
    return (
        <div className="flex w-full items-center justify-between px-5 lg:hidden">
            <DynamicHamburgerMenuSheet />
            <Link
                href={"/"}
                className="text-2xl font-black italic text-orange-500"
            >
                PEAK<span className="text-blue-500">PERFORMANCE</span>
            </Link>
            <DynamicAccountSectionMobile />
        </div>
    )
}
export default MobileView
