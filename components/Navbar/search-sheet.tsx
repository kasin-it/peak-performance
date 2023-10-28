'use client';

import { ChevronRight, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import SearchBar from '@/components/ui/search-bar';

function SearchSheet() {
  return (
    <Sheet>
      <SheetTrigger className="bg-transparent hover:bg-transparent hover:text-blue-500 text-blue-300">
        <Search className="h-8 w-8" strokeWidth={'1px'} />
      </SheetTrigger>
      <SheetContent
        side={'top'}
        className="h-72 flex items-center justify-center px-28"
      >
        <SearchBar />
      </SheetContent>
    </Sheet>
  );
}
export default SearchSheet;
