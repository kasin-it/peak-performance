import Link from 'next/link';
import AccountSectionMobile from './account-section-mobile';
import HamburgerMenuSheet from './hamburger-menu-sheet';

function MobileView() {
  return (
    <div className="flex lg:hidden justify-between items-center w-full px-2">
      <HamburgerMenuSheet />
      <Link href={'/'} className="font-black text-orange-500 text-2xl italic">
        PEAK<span className="text-blue-500">PERFORMANCE</span>
      </Link>
      <AccountSectionMobile />
    </div>
  );
}
export default MobileView;
