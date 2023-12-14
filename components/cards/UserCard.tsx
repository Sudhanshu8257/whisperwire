"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface UserCardProps {
  unRead: number;
  userName: string;
  lastChat: string | null;
  lastSeen: string | null;
  profilePic: string | null | undefined;
  docRef: string | null;
  id: string | null;
}

const UserCard = ({
  unRead,
  userName,
  lastChat,
  lastSeen,
  profilePic,
  docRef,
  id,
}: UserCardProps) => {
  const router = useRouter();
  const active = "bg-primary text-primary-foreground ";
  const deactive = "bg-secondary hover:bg-accent";
  const chatParams = useSearchParams();
  const q = chatParams.get("chat");
  const current = q === docRef;
  const onSelectChat = () => {
    //encrypt'
    /*
    const newUrl = formUrlQuery({
      params: chatParams.toString(),
      key: "chat",
      value: docRef,
    });
*/
    router.push(`/chats?chat=${docRef}&user=${id}`);
  };
  return (
    <div
      onClick={onSelectChat}
      className={`w-full h-[60px] gap-3 rounded-xl cursor-pointer flex items-center justify-between px-2 py-2 ${
        current ? active : deactive
      } `}
    >
      <Avatar>
        <AvatarImage src={profilePic ? profilePic : "/assets/dog1.jpg"} />
        <AvatarFallback>{userName}</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col w-full h-full gap-0.5 justify-center ">
        <p
          className={`text-[14px] font-bold capitalize line-clamp-1 ${
            current ? "text-primary-foreground" : "text-secondary-foreground"
          }`}
        >
          {userName}
        </p>
        {lastChat && !current && (
          <p
            className={`text-[10px] font-medium line-clamp-1 ${
              current ? "text-primary-foreground" : "text-muted-foreground"
            } `}
          >
            {lastChat}
          </p>
        )}
      </div>
      <div className=" flex flex-col w-fit h-full gap-1 items-end justify-start ">
        {!current && (
          <p
            className={`text-[9px] truncate font-medium mt-0.5 ${
              current ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {lastSeen}
          </p>
        )}
        {current && (
          <div
            className={`w-4 h-full flex mr-3 items-center justify-center rounded-full ${active} `}
          >
            <Image
              src={"/assets/icons/chevron-right.svg"}
              alt="chevron"
              width={18}
              height={18}
            />
          </div>
        )}
        {!current && unRead > 0 && (
          <p
            className={`text-[10px] font-bold  w-4 h-4 flex items-center justify-center rounded-full  ${active} `}
          >
            2
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
