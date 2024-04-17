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
      <body className={GeistSans.className}>
        <nav className='px-4 py-4 bg-gray-800 flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>
            <Link href='/'>📱Chit-Chat</Link>
          </h1>
          {data?.user ? (
            <div className='flex gap-4 items-center'>
              <p className='font-light'>Logged In as {data?.user.email}</p>
              <Link href='/private' className='text-black bg-white p-2 rounded'>
                Private page
              </Link>
            </div>
          ) : (
            <ul className='flex gap-4'>
              <li>
                <Link href='/login' className='text-black bg-white p-2 rounded'>
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='text-black bg-white p-2 rounded'>
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
