const ChatReader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full justify-center'>
      <div className='p-base md: bg-slate-900 max-md:w-full md:w-5/6'>
        {children}
      </div>
    </div>
  );
};

export { ChatReader };
