import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const ChatInput = () => {
  return (
    <div className="w-full h-[90px] bg-secondary flex items-center justify-center gap-4 py-5 px-6">
      <div className="w-[80%] h-full flex flex-grow items-center gap-1 bg-[#C5F7FF] rounded-lg py-1">
        <Image
          src={"/assets/icons/link.svg"}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer ml-3"
        />
        <Input
          placeholder="Write a message..."
          type="textarea"
          className=" h-full w-full bg-transparent border-none text-[14px] text-black placeholder:text-[#657cc8] placeholder:font-medium placeholder:text-[14px] focus-visible:ring-0  focus-visible:ring-offset-0 "
        />
        <Image
          src={"/assets/icons/smile.svg"}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer mr-3"
        />
      </div>
      <div className="px-3 flex items-center justify-center h-full bg-primary rounded-[14px]">
        <Image
          src={"/assets/icons/mic.svg"}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ChatInput;
