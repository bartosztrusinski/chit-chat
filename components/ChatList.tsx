import Chat from '@/components/Chat';
import { getRelativeDate } from '@/utils/relative-date';
import { createClient } from '@/utils/supabase/server';

interface ChatListProps {
  userId: string;
}

const ChatList = async ({ userId }: ChatListProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'chats(id, name, profiles(username), messages(body, sender_id, created_at))',
    )
    .eq('id', userId)
    .not('chats.profiles.id', 'eq', userId)
    .order('id', { referencedTable: 'chats.messages', ascending: false })
    .limit(1, { referencedTable: 'chats.messages' });

  if (error) {
    return (
      <p className='text-center text-lg font-bold'>
        Something went wrong: {error.message}
      </p>
    );
  }

  const profile = data[0];

  if (profile.chats.length === 0) {
    return <p className='text-center text-lg font-bold'>No chats found</p>;
  }

  return (
    <ul className='flex flex-col gap-3'>
      {profile.chats.map((chat) => {
        const chatName =
          chat.name ??
          chat.profiles.map((profile) => profile.username).join(', ');
        const lastMessage = chat.messages[0].body;
        const lastMessageDate = getRelativeDate(
          new Date(chat.messages[0].created_at),
        );

        return (
          <li key={chat.id}>
            <Chat
              chatName={chatName}
              lastMessage={lastMessage}
              lastMessageDate={lastMessageDate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
