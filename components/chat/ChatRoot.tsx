"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
import { SearchParamsProps } from "@/lib/utils";
import {
  collection,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchUser } from "@/lib/actions/user.action";
const ChatRoot = ({ searchParams }: SearchParamsProps) => {
  const chatId = searchParams?.chat;
  const userId = searchParams?.user;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    setMessages([]);
    const q = query(
      collection(db, "conversations", `${chatId}`, "messages"),
      orderBy("time"),
      limitToLast(10)
    );
    async function fetch() {
      const result: any = await fetchUser({ userAId: userId });
      setUser(result);
    }
    fetch();
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const receivedMessages: any = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const messageData = change?.doc?.data();
          const time = messageData?.time;
          const formattedMessage = {
            ...messageData,
            senderId: messageData?.senderId?.id,
            time: time.toDate(),
            id: change?.doc?.id,
          };
          receivedMessages.push(formattedMessage);
        }
      });
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    });

    return () => unsubscribe();
  }, [chatId, userId]);
  return (
    <div className=" flex flex-col w-full justify-start items-center h-full">
      <Header
        //@ts-ignore
        userName={user?.userName}
        //@ts-ignore
        profilePic={user?.profilePic}
        status={"online"}
      />
      <div className="flex-grow w-full flex flex-col overflow-y-auto custom-scrollbar gap-3 p-4">
        {messages?.map((chat: any) => (
          <ChatBox
            key={chat.id}
            user={chat.senderId}
            message={chat.content}
            timestamp={chat.time}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatRoot;
