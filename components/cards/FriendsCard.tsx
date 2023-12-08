"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import { MotionDiv } from "../shared/MotionDiv";
import { checkRequest, sendUserRequest } from "@/lib/actions/user.action";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { usePathname } from "next/navigation";
interface FriendsCardProps {
  source: string;
  username: string;
  mail: string;
  index: number;
  friend: boolean;
}
const FriendsCard = ({
  source,
  username,
  mail,
  index,
  friend,
}: FriendsCardProps) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [user] = useAuthState(auth);
  const [sent, setIsSent] = useState(false);
  useEffect(() => {
    if (!friend) {
      const check = async () => {
        let result = await checkRequest({
          userAId: user?.email,
          userBId: mail,
        });
        setIsSent(result);
      };
      check();
    }
  }, [friend, mail, user?.email]);
  const pathName = usePathname();
  const sendRequest = async () => {
    await sendUserRequest({
      userAId: user?.email,
      userBId: mail,
      path: pathName,
    });
    setIsSent(true);
  };

  return (
    <MotionDiv
      className=" flex flex-col items-center justify-between px-8 py-5 overflow-hidden w-[264px] bg-secondary rounded-lg hover:bg-muted "
      variants={variants}
      initial="hidden"
      animate="visible"
      viewport={{ amount: 0 }}
      transition={{ delay: index * 0.2, ease: "easeInOut", duration: 0.5 }}
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
        {!friend ? (
          <Button
            onClick={sendRequest}
            disabled={sent}
            className="px-4 mt-8 bg-primary gap-2 font-bold text-black rounded-none rounded-tl-2xl rounded-tr-2xl"
          >
            {sent ? "sent" : "Send Request"}
            {!sent && (
              <Image
                src={"/assets/icons-black/plain.svg"}
                alt="plain"
                width={24}
                height={24}
                className="rotate-45"
              />
            )}
          </Button>
        ) : (
          <>
            <Button className="px-4 w-full mt-8 bg-transparent hover:bg-transparent gap-2 font-bold dark:text-white text-[#1e1e1e] rounded-none rounded-tr-lg">
              <Image
                src={"/assets/icons/trash.svg"}
                alt="plain"
                width={24}
                height={24}
                className="block dark:hidden"
              />
              <Image
                src={"/assets/icons-black/trash-bl.svg"}
                alt="plain"
                width={20}
                height={20}
                className="hidden dark:block"
              />
              Remove
            </Button>
            <Button className="px-4 w-full mt-8 bg-primary gap-2 font-bold text-primary-foreground rounded-none rounded-tl-lg ">
              <Image
                src={"/assets/icons-black/chat-line-bl.svg"}
                alt="plain"
                width={20}
                height={20}
              />
              Message
            </Button>
          </>
        )}
      </div>
    </MotionDiv>
  );
};

export default FriendsCard;
