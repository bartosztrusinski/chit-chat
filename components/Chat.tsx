import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatProps {
  chatName: string;
  lastMessage: string;
  lastMessageDate: string;
}

const Chat = ({ chatName, lastMessage, lastMessageDate }: ChatProps) => {
  return (
    <div className='flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-black/40 px-3 py-3 text-slate-100 shadow-md transition-transform hover:scale-[101%]'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>{chatName}&apos;s avatar</AvatarFallback>
      </Avatar>
      <div className='flex-grow'>
        <div className='flex flex-row justify-between gap-2'>
          <div className='text-lg font-bold leading-tight'>{chatName}</div>
          <div className='flex-shrink-0 text-sm text-muted-foreground'>
            {lastMessageDate}
          </div>
        </div>
        <div className='pt-1'>{lastMessage}</div>
      </div>
    </div>
  );
};

export default Chat;
