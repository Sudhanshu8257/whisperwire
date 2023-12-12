import ChatRoot from "@/components/chat/ChatRoot";
import SideBar from "@/components/chat/SideBar";
import { SearchParamsProps } from "@/lib/utils";
import React from "react";

const Chats = ({ searchParams }: SearchParamsProps) => {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      {searchParams.chat ? (
        <ChatRoot searchParams={searchParams} />
      ) : (
        <div className=" flex flex-col w-full justify-center items-center h-full">
          select a chat to continue
        </div>
      )}
    </div>
  );
};

export default Chats;
