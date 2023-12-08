import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
const Header = () => {
  return (
    <div className="w-full h-[80px] bg-secondary flex items-center justify-between px-4">
      <div className="flex items-center justify-start gap-2">
        <Avatar>
          <AvatarImage src="/assets/dog1.jpg" />
          <AvatarFallback>Dog</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[18px] font-bold">Sudhanshu Lohana</p>
          <p className="text-[12px] text-muted-foreground font-semibold">
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <div className="p-2 hover:bg-accent  rounded-[14px]">
          <Image
            src={"/assets/icons-black/calls-bl.svg"}
            width={24}
            height={24}
            alt={"calls"}
            className="block dark:hidden "
          />
          <Image
            src={"/assets/icons/calls.svg"}
            loading="lazy"
            width={24}
            height={24}
            alt={"calls"}
            className="hidden dark:block hover:bg-accent rounded-[14px]"
          />
        </div>
        <div className="p-2 hover:bg-accent  rounded-[14px]">
          <Image
            src={"/assets/icons/menu.svg"}
            width={24}
            height={24}
            alt={"calls"}
            className="block dark:hidden hover:bg-accent rounded-[14px]"
          />
          <Image
            src={"/assets/icons-black/menu-bl.svg"}
            loading="lazy"
            width={24}
            height={24}
            alt={"calls"}
            className="hidden dark:block hover:bg-accent rounded-[14px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
