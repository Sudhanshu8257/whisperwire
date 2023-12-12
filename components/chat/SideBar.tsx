import React from "react";
import UserCard from "../cards/UserCard";
import SearchBar from "../shared/SearchBar";
import { fetchConversations } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/lib/utils";

const SideBar = async () => {
  const { userId } = auth();
  const result = await fetchConversations({ currentUserId: userId });
  return (
    <div className="w-[364px] flex flex-col justify-start overflow-y-scroll custom-scrollbar px-3 py-3 pt-5 h-full border-0 border-r-[2px] border-border ">
      <p className="text-[28px] font-black">Chats</p>
      <SearchBar />
      <div className="w-full h-full mt-5 flex flex-col">
        {/* 
        <div className="w-full h-fit flex flex-col gap-2">
          <p className="text-[14px] text-[#818181] dark:text-[#cccccc] ml-1 font-semibold">
            Pinned
          </p>
          <UserCard current={true} />
          <UserCard current={false} />
          <UserCard current={false} />
        </div>
        */}
        <div className="w-full h-fit flex flex-col gap-2 mt-3">
          <p className="text-[14px] text-[#818181] dark:text-[#cccccc] ml-1 font-semibold">
            All Chats
          </p>
          {result?.map((chat: any) => (
            <UserCard
              key={chat?.userFriend?.id}
              id={chat?.userFriend?.id}
              userName={chat?.userFriend?.userName}
              profilePic={chat?.userFriend?.profilePic}
              unRead={chat?.unReadCount}
              lastChat={chat?.lastMessage?.content}
              lastSeen={"24 min ago"}
              docRef={chat?.ref}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
