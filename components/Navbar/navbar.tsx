import DesktopView from './desktop-view';
import MobileView from './mobile-view';

function Navbar() {
    return (
        <nav className="w-full h-24 border-b flex items-center justify-center bg-white text-black fixed top-0">
            <MobileView />
            <DesktopView />
        </nav>
    );
}
export default Navbar;
