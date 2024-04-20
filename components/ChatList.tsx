import { createClient } from '@/utils/supabase/server';

interface ChatListProps {
  userId: string;
}

const ChatList = async ({ userId }: ChatListProps) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('chats').select('id, name');

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((chat) => (
        <li key={chat.id}>{chat.name}</li>
      ))}
    </ul>
  );
};

export default ChatList;
