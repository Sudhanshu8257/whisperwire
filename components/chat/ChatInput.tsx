"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { sendMessage } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { userId } = useAuth();
  const [emojiboard, setEmojiBoard] = useState(false);
  const params = useSearchParams();
  const docId = params.get("chat");

  const submit = async (e: any) => {
    e.preventDefault();
    if (message.length > 0) {
      await sendMessage({ content: message, userId: userId, docId: docId });
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-full min-h-[90px] bg-secondary flex items-center justify-center gap-4 py-5 px-6">
        <div className="w-[80%] h-full flex flex-grow items-center gap-1 bg-[#C5F7FF] rounded-lg py-1">
          <Image
            src={"/assets/icons/link.svg"}
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer ml-3"
          />
          <form className="w-full" onSubmit={submit}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className={`h-full w-full bg-transparent border-none text-[14px] text-black placeholder:text-[#657cc8] placeholder:font-medium placeholder:text-[14px] focus-visible:ring-0 focus-visible:ring-offset-0 font-noto`}
            />
          </form>
          <Image
            onClick={() => setEmojiBoard((prev) => !prev)}
            src={"/assets/icons/smile.svg"}
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer mr-3"
          />
        </div>
        <div
          onClick={submit}
          className="px-3 flex items-center justify-center h-full bg-primary rounded-[14px]"
        >
          <Image
            src={"/assets/icons-black/plain.svg"}
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer"
          />
        </div>
      </div>
      {emojiboard && (
        <EmojiPicker
          height={350}
          width={"100%"}
          onEmojiClick={(emojidata) => {
            console.log(emojidata);
            setMessage((prev) => prev + emojidata.emoji);
          }}
        />
      )}
    </div>
  );
};

export default ChatInput;
