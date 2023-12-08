import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full relative h-screen items-center justify-center p-0">
      <div>{children}</div>
    </main>
  );
};

export default Layout;

/*className="px-5 py-7 flex z-10  max-md:h-full max-md:w-full max-md:bg-opacity-100 rounded-lg bg-black bg-opacity-90  justify-between"*/
