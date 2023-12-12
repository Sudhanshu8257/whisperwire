import FriendsCard from "@/components/cards/FriendsCard";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchFriends, fetchUsers } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const currentUser = auth();
  console.log(currentUser.userId);
  const users = await fetchFriends({ userAId: currentUser?.userId });
  console.log(users);
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-between items-center">
        <p className=" w-full text-[28px] text-center font-black mb-3">
          Friends
        </p>
        <Button className="font-bold gap-2 ">
          <Image
            src={"/assets/icons-black/user-plus-bl.svg"}
            alt="requests"
            width={20}
            height={20}
          />
          Requests
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <SearchBar />
      </div>
      <div className="w-full h-full p-3 mt-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar justify-start">
        <div className="flex p-1 w-full items-center justify-between gap-2">
          <h3 className="text-muted-foreground font-semibold">Friends</h3>
          <Separator className="w-[95%]" />
        </div>
        <div className="flex flex-wrap gap-4 mt-2 w-[90%] justify-start items-center">
          {users?.map((user: any, i: number) => (
            <FriendsCard
              key={user.id}
              userId={user.id}
              currentUser={currentUser?.userId}
              friend={true}
              index={i}
              username={user.userName}
              mail={user.email}
              source={user.profilePic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
