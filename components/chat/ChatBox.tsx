import { useAuth } from "@clerk/nextjs";
import React from "react";
interface ChatBoxProps {
  user: string;
  message: string;
  timestamp: string;
}
const ChatBox = ({ user, message, timestamp }: ChatBoxProps) => {
  const { userId } = useAuth();
  let date = new Date(timestamp);
  let time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <div
        className={` w-fit p-2 max-w-[55%] text-[14px] font-semibold rounded-lg ${
          userId === user
            ? "bg-primary ml-auto text-primary-foreground "
            : "bg-accent"
        }`}
      >
        {message}
      </div>
      <p
        className={`text-[9px] -mt-2 text-muted-foreground ${
          userId === user && "ml-auto"
        }`}
      >
        {time}
      </p>
    </>
  );
};

export default ChatBox;
