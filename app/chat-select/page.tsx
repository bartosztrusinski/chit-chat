import ChatList from '@/components/ChatList';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const ChatSelectPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <main className='p-3'>
      <ChatList userId={data.user.id} />
    </main>
  );
};

export default ChatSelectPage;
