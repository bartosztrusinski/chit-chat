import { ChatsSidebar } from '@/components/chat/ChatsSidebar';
import React from 'react';

const ChatsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className='flex h-dvh'>
      <ChatsSidebar />
      <div>{children}</div>
    </main>
  );
};

export default ChatsLayout;
