import Link from 'next/link';
import AccountSectionMobile from './account-section-mobile';
import HamburgerMenu from './hamburger-menu';

function MobileView() {
  return (
    <div className="flex md:hidden justify-between items-center w-full">
      <HamburgerMenu />
      <Link href={'/'} className="font-black text-orange-500 text-2xl italic">
        PEAK<span className="text-blue-500">PERFORMANCE</span>
      </Link>
      <AccountSectionMobile />
    </div>
  );
}
export default MobileView;
