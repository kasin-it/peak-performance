import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { Button } from '../ui/button';
import Link from 'next/link';

async function AccountSection() {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <>
        <Link href="/user" className="text-blue-300 hover:text-blue-500 p-2">
          <User2 className=" w-9 h-9" />
        </Link>
      </>
    );
  }

  return (
    <>
      <Button className="text-blue-500 border-blue-500 border bg-transparent font-black uppercase hover:bg-blue-300 hover:text-white hover:border-blue-300 text-md">
        Sign in
      </Button>
      <Button className="text-white bg-blue-500 font-black uppercase hover:bg-blue-300 text-md hover:border-blue-300">
        Sign up
      </Button>
    </>
  );
}
export default AccountSection;
