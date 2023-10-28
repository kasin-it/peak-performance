'use client';

import { ChevronRight, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import SearchBar from '../ui/search-bar';

function HamburgerMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger className="bg-transparent hover:bg-transparent hover:text-blue-500 text-blue-300">
        <Menu className="h-8 w-8" strokeWidth={'3px'} />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SearchBar className={'w-full mt-16'} />
        <ul className="flex flex-col items-center text-blue-300 font-extrabold italic text-left text-xl mt-10">
          {/* <li>SHOP</li> */}
          <li className="w-full border-y border-blue-500 pl-10">
            <Link
              href={'/articles'}
              className=" hover:text-blue-500 w-full h-full py-5 flex justify-between"
            >
              <p>ARTICLES</p>
              <ChevronRight />
            </Link>
          </li>
          <li className="w-full border-b border-blue-500 pl-10">
            <Link
              href={'/workouts'}
              className=" hover:text-blue-500 w-full h-full py-5 flex justify-between"
            >
              <p>WORKOUTS</p>
              <ChevronRight />
            </Link>
          </li>
          <li className="w-full border-b border-blue-500 pl-10">
            <Link
              href={'/forum'}
              className=" hover:text-blue-500 w-full h-full py-5 flex justify-between"
            >
              <p>FORUM</p>
              <ChevronRight />
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
export default HamburgerMenuSheet;
