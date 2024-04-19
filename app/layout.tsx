import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import Link from 'next/link';

import { createClient } from '@/utils/supabase/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chit-Chat',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <html lang='en'>
      <body className={`${GeistSans.className} min-h-screen`}>
        <nav className='flex items-center justify-between bg-gray-800 px-4 py-4'>
          <h1 className='text-3xl font-bold'>
            <Link href='/'>📱Chit-Chat</Link>
          </h1>
          {data?.user ? (
            <div className='flex items-center gap-4'>
              <p className='font-light'>Logged In as {data?.user.email}</p>
              <Link href='/private' className='rounded bg-white p-2 text-black'>
                Private page
              </Link>
            </div>
          ) : (
            <ul className='flex gap-4'>
              <li>
                <Link href='/login' className='rounded bg-white p-2 text-black'>
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='rounded bg-white p-2 text-black'
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
