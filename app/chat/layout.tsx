import { ChatSidebar } from './components/ChatSidebar';
import { ChatReader } from './components/ChatReader';

const ChatsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className='flex min-h-screen'>
      <ChatSidebar />
      <ChatReader>{children}</ChatReader>
    </main>
  );
};

export default ChatsLayout;
