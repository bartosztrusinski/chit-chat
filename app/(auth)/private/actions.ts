'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function signOut() {
  const supabase = createClient();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    redirect('/error');
  }

  redirect('/');
}
