import Link from 'next/link';
import AccountSection from './account-section';

function DesktopView() {
  return (
    <div className="max-w-[1920px] justify-between px-10 w-full items-center hidden lg:flex">
      <div className="flex space-x-10">
        <Link href={'/'} className="font-black text-orange-500 text-2xl italic">
          PEAK<span className="text-blue-500">PERFORMANCE</span>
        </Link>
        <ul className="flex items-center text-blue-300 font-extrabold italic space-x-8 text-xl">
          {/* <li>SHOP</li> */}
          <li>
            <Link
              href={'/articles'}
              className="hover:border-b-[3px] hover:text-blue-500 border-orange-500"
            >
              ARTICLES
            </Link>
          </li>
          <li>
            <Link
              href={'/workouts'}
              className="hover:border-b-[3px] hover:text-blue-500 border-orange-500"
            >
              WORKOUTS
            </Link>
          </li>
          <li>
            <Link
              href={'/forum'}
              className="hover:border-b-[3px] hover:text-blue-500 border-orange-500"
            >
              FORUM
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex space-x-2">
        <AccountSection />
      </div>
    </div>
  );
}
export default DesktopView;
