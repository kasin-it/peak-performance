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
      <Button className="font-black uppercase  text-md" variant={'outline'}>
        Sign in
      </Button>
      <Button className="font-black uppercase text-md" variant={'default'}>
        Sign up
      </Button>
    </>
  );
}
export default AccountSection;
