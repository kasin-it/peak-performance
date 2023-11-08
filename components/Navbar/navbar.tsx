import DesktopView from "./desktop-view"
import MobileView from "./mobile-view"

function Navbar() {
    return (
        <nav className="fixed top-0 z-50 flex h-24 w-full items-center justify-center border-b bg-white text-black">
            <MobileView />
            <DesktopView />
        </nav>
    )
}
export default Navbar
