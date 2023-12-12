import SignOutBtn from "@/components/shared/SignOutBtn";
import { fetchUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = async () => {
  const currentUser = auth();
  const user = await fetchUser({ userAId: currentUser.userId });
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-2 p-8 bg-secondary rounded-xl">
        <Avatar className="w-[68px] h-[68px]">
          <AvatarImage
            src={user?.profilePic ? user?.profilePic : "/assets/dog1.jpg"}
          />
          <AvatarFallback>{user?.userName}</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-lg">{user?.userName}</h1>
        <h1 className="font-medium text-md">{user?.email}</h1>
        <div className="mt-5">
          <SignOutBtn />
        </div>
      </div>
    </div>
  );
};

export default Page;
