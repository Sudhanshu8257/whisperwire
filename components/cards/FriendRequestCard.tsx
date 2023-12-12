"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import { MotionDiv } from "../shared/MotionDiv";
import { confirmRequest, declineRequest } from "@/lib/actions/user.action";

interface FriendsRequestCard {
  source: string;
  username: string;
  mail: string;
  index: number;
  currentUser: string | null;
  userId: string;
  reff: string;
}
// TODO: ADD TIMESTAMP
const FriendRequestCard = ({
  source,
  username,
  mail,
  currentUser,
  userId,
  reff,
}: FriendsRequestCard) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  async function accept() {
    await confirmRequest({
      senderId: userId,
      reciverId: currentUser,
      pathName: "/addUser",
      reff: reff,
    });
  }
  async function decline() {
    await declineRequest({
      pathName: "/addUser",
      reff: reff,
    });
  }
  return (
    <MotionDiv
      className=" flex flex-col items-center justify-between px-8 py-5 overflow-hidden w-[264px] bg-secondary rounded-lg hover:bg-muted "
      variants={variants}
      initial="hidden"
      animate="visible"
      viewport={{ amount: 0 }}
      transition={{ delay: 0.2, ease: "easeInOut", duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center mt-3 gap-1">
        <Image
          src={source}
          alt={username}
          width={80}
          height={80}
          className="rounded-full"
        />
        <p className="font-bold text-[24px] mt-2">{username}</p>
        <p className="font-regular text-[16px] -mt-1">{mail}</p>
      </div>
      <div className="-mb-5 w-[264px] flex items-center justify-center gap-1 h-fit">
        <>
          <Button
            onClick={decline}
            className="px-4 w-full mt-8 bg-destructive gap-2 font-bold text-destructive-foreground rounded-none rounded-tr-lg"
          >
            <Image
              src={"/assets/icons/close.svg"}
              alt="plain"
              width={26}
              height={26}
            />
            Decline
          </Button>
          <Button
            onClick={accept}
            className="px-4 w-full mt-8 bg-success gap-2 font-bold text-success-foreground rounded-none rounded-tl-lg "
          >
            <Image
              src={"/assets/icons/tick.svg"}
              alt="plain"
              width={20}
              height={20}
            />
            Accept
          </Button>
        </>
      </div>
    </MotionDiv>
  );
};

export default FriendRequestCard;
