import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  current: boolean;
}

const UserCard = ({ current }: UserCardProps) => {
  const active = "bg-primary text-primary-foreground ";
  const deactive = "bg-secondary hover:bg-accent";
  return (
    <div
      className={`w-full h-[60px] rounded-xl gap-2 cursor-pointer flex items-center justify-start px-2 py-2 ${
        current ? active : deactive
      } `}
    >
      <Avatar>
        <AvatarImage src="/assets/dog1.jpg" />
        <AvatarFallback>Dog</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col h-full gap-0.5 justify-center ">
        <p
          className={`text-[14px] font-bold capitalize ${
            current ? "text-primary-foreground" : "text-secondary-foreground"
          }`}
        >
          Sudhanshu
        </p>
        <p
          className={`text-[10px] font-medium ${
            current ? "text-primary-foreground" : "text-muted-foreground"
          } `}
        >
          hello man how are you
        </p>
      </div>
      <div className=" flex flex-col ml-auto h-full gap-1 items-end justify-start ">
        <p
          className={`text-[10px] font-medium mt-0.5 ${
            current ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          9:36
        </p>
        {!current && (
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
