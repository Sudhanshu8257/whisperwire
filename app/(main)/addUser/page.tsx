import FriendRequestCard from "@/components/cards/FriendRequestCard";
import FriendsCard from "@/components/cards/FriendsCard";
import Refetch from "@/components/shared/Refetch";
import SearchBar from "@/components/shared/SearchBar";
import { Separator } from "@/components/ui/separator";
import {
  fetchRequests,
  fetchUser,
  fetchUsers,
} from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const currentUser = auth();
  const currentUserData = await fetchUser({ userAId: currentUser?.userId });
  const currentUserFriends = currentUserData?.friends;
  const requests: any = await fetchRequests({
    reciverId: currentUser.userId,
  });
  const users = await fetchUsers();
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
      <div className="w-full h-full p-3 mt-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar justify-start">
        {requests.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8 w-full justify-start">
            <div className="flex p-1 w-full items-center justify-between gap-2">
              <h3 className="text-muted-foreground font-semibold">Requests</h3>
              <Separator className="w-[95%]" />
            </div>
            {requests?.map((user: any, i: number) => {
              return (
                <FriendRequestCard
                  key={i}
                  index={i}
                  reff={user?.ref}
                  currentUser={currentUser?.userId}
                  userId={user?.sender?.id}
                  username={user?.sender?.userName}
                  mail={user?.sender?.email}
                  source={user.sender.profilePic}
                />
              );
            })}
          </div>
        )}

        <div className="flex flex-col mt-4 gap-2 justify-start">
          <div className="flex p-1 w-full items-center justify-between gap-2">
            <h3 className="text-muted-foreground font-semibold">Discover</h3>
            <Separator className="w-[95%]" />
          </div>
          <div className="flex flex-wrap gap-4 mt-2 w-[90%] justify-start items-center">
            {users.map((user: any, i: number) => {
              if (user.id === currentUser.userId) return;
              const isFriend = currentUserFriends?.includes(user.id);
              return (
                <FriendsCard
                  key={user.id}
                  currentUser={currentUser.userId}
                  userId={user.id}
                  friend={isFriend}
                  index={i}
                  username={user.userName}
                  mail={user.email}
                  source={user.profilePic}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
