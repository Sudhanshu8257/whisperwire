import FriendRequestCard from "@/components/cards/FriendRequestCard";
import Refetch from "@/components/shared/Refetch";
import SearchBar from "@/components/shared/SearchBar";
import { fetchRequests } from "@/lib/actions/user.action";
import { auth } from "@/lib/firebase";
import React from "react";

const Page = async () => {
  const user = auth.currentUser;
  console.log(user);
  const requests: any = await fetchRequests({ userAId: user?.email });
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-between items-center">
        <p className=" w-full text-[28px] text-center font-black mb-3">
          Add Friends
        </p>
        <Refetch />
      </div>

      <div className="flex gap-2 items-center">
        <SearchBar />
      </div>
      <div className="flex flex-wrap gap-4 mt-8 overflow-y-auto custom-scrollbar w-full justify-center">
        {requests?.map((user: any, i: number) => {
          return (
            <FriendRequestCard
              key={i}
              index={i}
              username={user?.sender?.userName}
              mail={user?.sender?.email}
              source={user.sender.profilePic}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
