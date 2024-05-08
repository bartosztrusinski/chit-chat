import { Login } from '@/components/Login';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

const LoginPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect('/private');
  }

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
