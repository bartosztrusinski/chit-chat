import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { login } from './actions';

export default async function Login() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/private');
  }

  return (
    <main className='w-full min-h-screen flex flex-col items-center p-24'>
      <h1 className='text-2xl font-bold'>Login</h1>
      <form
        action={login}
        className='flex flex-col gap-6 justify-center items-start p-6'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            className='p-1 rounded text-black'
            id='email'
            name='email'
            type='email'
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            className='p-1 rounded text-black'
            id='password'
            name='password'
            type='password'
            required
          />
        </div>
        <button
          type='submit'
          className='self-stretch rounded px-6 py-2 mt-1 bg-white text-black font-semibold'>
          Log In
        </button>
      </form>
    </main>
  );
}
