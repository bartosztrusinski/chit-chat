'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { signOut } from './actions';

export default async function Private() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center gap-4 p-24'>
      <p>
        Hello there,{' '}
        <span className='bg-gradient-to-r from-teal-500 to-purple-700 py-1 rounded'>
          {data.user.email}
        </span>
        !
      </p>
      <form action={signOut}>
        <button
          type='submit'
          className='px-8 py-2 bg-white text-black rounded-md'>
          Sign Out
        </button>
      </form>
    </div>
  );
}
