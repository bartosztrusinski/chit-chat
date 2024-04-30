import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import Link from 'next/link';

import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/server';

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
      <body className={cn('bg-black/90 text-slate-100', GeistSans.className)}>
        <nav className='flex items-center justify-between bg-black/90 p-2'>
          <h1 className='text-xl font-bold'>
            <Link href='/'>📱Chit-Chat</Link>
          </h1>
          {data?.user ? (
            <div className='flex items-center gap-4'>
              <p className='text-sm font-light'>{data?.user.email}</p>
              <Link
                href='/private'
                className='rounded bg-white p-2 text-sm text-black'
              >
                Private page
              </Link>
            </div>
          ) : (
            <ul className='flex gap-4'>
              <li>
                <Link
                  href='/login'
                  className='rounded bg-white p-2 text-sm text-black'
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href='/register'
                  className='rounded bg-white p-2 text-sm text-black'
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
