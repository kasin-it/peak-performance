import Link from "next/link"

import AccountSectionMobile from "./account-section-mobile"
import HamburgerMenuSheet from "./hamburger-menu-sheet"

function MobileView() {
    return (
        <div className="flex w-full items-center justify-between px-5 lg:hidden">
            <HamburgerMenuSheet />
            <Link
                href={"/"}
                className="text-2xl font-black italic text-orange-500"
            >
                PEAK<span className="text-blue-500">PERFORMANCE</span>
            </Link>
            <AccountSectionMobile />
        </div>
    )
}
export default MobileView
