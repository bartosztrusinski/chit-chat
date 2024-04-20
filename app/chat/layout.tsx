import { ChatsView } from './components/ChatsView';
import { ChatReader } from './components/ChatReader';

const ChatsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className='flex min-h-screen'>
      <ChatsView />
      <ChatReader>{children}</ChatReader>
    </main>
  );
};

export default ChatsLayout;
