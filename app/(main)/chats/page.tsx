import ChatRoot from "@/components/chat/ChatRoot";
import SideBar from "@/components/chat/SideBar";
import React from "react";

const Chats = () => {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <ChatRoot />
    </div>
  );
};

export default Chats;
