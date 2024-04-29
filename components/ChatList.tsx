import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getRelativeTimeString } from '@/utils/relative-time';
import { createClient } from '@/utils/supabase/server';

interface ChatListProps {
  userId: string;
}

const ChatList = async ({ userId }: ChatListProps) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'chats(id, name, profiles(username), messages(id, body, sender_id, created_at))',
    )
    .eq('id', userId)
    .not('chats.profiles.id', 'eq', userId)
    .order('id', { referencedTable: 'chats.messages', ascending: false })
    .limit(1, { referencedTable: 'chats.messages' });

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <ul>
      {data[0].chats.map((chat) => {
        const lastMessage = chat.messages[0].body;
        const chatName = chat.name ?? chat.profiles[0].username;
        const lastMessageTime = getRelativeTimeString(
          new Date(chat.messages[0].created_at),
        );

        return (
          <li key={chat.id} className='flex flex-col gap-6'>
            <Card className='border-muted-foreground bg-black text-slate-100'>
              <CardContent className='flex flex-row items-center gap-2 p-4'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>{chatName}&apos;s avatar</AvatarFallback>
                </Avatar>
                <section className='flex-grow'>
                  <div className='flex flex-row justify-between'>
                    <div className='text-lg font-bold'>{chatName}</div>
                    <div className='text-sm text-muted-foreground'>
                      {lastMessageTime}
                    </div>
                  </div>
                  <div>{lastMessage}</div>
                </section>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
