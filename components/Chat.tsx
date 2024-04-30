import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatProps {
  chatName: string;
  lastMessage: string;
  lastMessageDate: string;
}

const Chat = ({ chatName, lastMessage, lastMessageDate }: ChatProps) => {
  return (
    <div className='flex flex-row items-center gap-2 rounded-lg bg-black/40 px-4 py-3 text-slate-100 shadow-lg'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>{chatName}&apos;s avatar</AvatarFallback>
      </Avatar>
      <section className='flex-grow'>
        <div className='flex flex-row justify-between'>
          <div className='text-lg font-bold'>{chatName}</div>
          <div className='text-sm text-muted-foreground'>{lastMessageDate}</div>
        </div>
        <div>{lastMessage}</div>
      </section>
    </div>
  );
};

export default Chat;
