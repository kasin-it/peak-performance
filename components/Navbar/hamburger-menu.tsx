'use client';

import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

function HamburgerMenu() {
  return (
    <Button
      className="bg-transparent hover:bg-transparent hover:text-blue-500 text-blue-300"
      onClick={() => {}}
    >
      <Menu className="h-8 w-8" strokeWidth={'3px'} />
    </Button>
  );
}
export default HamburgerMenu;
