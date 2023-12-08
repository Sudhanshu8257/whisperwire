import NavBar from "@/components/shared/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex items-center justify-start ">
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
