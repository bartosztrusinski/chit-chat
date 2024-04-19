import { ChatsSidebar } from '@/components/ChatsSidebar';
import React from 'react';

const ChatsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <ChatsSidebar />
      {children}
    </>
  );
};

export default ChatsLayout;
