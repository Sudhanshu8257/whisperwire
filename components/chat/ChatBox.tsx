import { useAuth } from "@clerk/nextjs";
import React from "react";
interface ChatBoxProps {
  user: string;
  message: string;
  timestamp: string;
}
const ChatBox = ({ user, message, timestamp }: ChatBoxProps) => {
  const { userId } = useAuth();
  function formatFirebaseTimestamp(time: any): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString([], options);
  }
  return (
    <>
      <div
        className={`w-fit p-2 max-w-[55%] text-[14px] font-semibold rounded-lg ${
          userId === user
            ? "bg-primary ml-auto text-primary-foreground "
            : "bg-accent"
        }`}
      >
        <p className="font-sans">{message}</p>
      </div>
      <p
        className={`text-[9px] -mt-2 text-muted-foreground ${
          userId === user && "ml-auto"
        }`}
      >
        {formatFirebaseTimestamp(timestamp)}
      </p>
    </>
  );
};

export default ChatBox;
