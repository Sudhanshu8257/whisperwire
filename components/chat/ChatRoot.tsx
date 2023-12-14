// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
import { SearchParamsProps } from "@/lib/utils";
import {
  collection,
  getCountFromServer,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchUser } from "@/lib/actions/user.action";
import LoadMore from "./LoadMore";
const ChatRoot = ({ searchParams }: SearchParamsProps) => {
  const chatId = searchParams?.chat;
  const userId = searchParams?.user;
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const [user, setUser] = useState();
  const [docSnap, setDocSnap] = useState();
  const [totalMessages, setTotalmessages] = useState();

  useEffect(() => {
    setMessages([]);
    setUser();
    setAllFetched(false);
    setDocSnap();
    setTotalmessages();
    let totalCount;
    async function fetch() {
      const result: any = await fetchUser({ userAId: userId });
      setUser(result);
      const coll = collection(db, "conversations", `${chatId}`, "messages");
      let collSnapshot = await getCountFromServer(coll);
      setTotalmessages(collSnapshot.data()?.count);
    }
    fetch();
    let quer = query(
      collection(db, "conversations", `${chatId}`, "messages"),
      orderBy("time"),
      limitToLast(10)
    );

    const unsubscribe = onSnapshot(quer, (snapshot) => {
      setDocSnap(snapshot.docs[0]);
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
      console.log("snapshot.size => ", snapshot?.docs.length);
      console.log("totalCount =>", totalCount);
      if (snapshot.docs.length === totalMessages || snapshot.docs.length <= 9) {
        setAllFetched(true);
      }
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    });
    return () => {
      unsubscribe();
    };
  }, [chatId, userId]);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className=" flex flex-col w-full justify-start items-center h-full">
      <Header
        //@ts-ignore
        userName={user?.userName}
        //@ts-ignore
        profilePic={user?.profilePic}
        status={"online"}
      />
      <div className="flex-grow scroll-smooth w-full flex flex-col overflow-y-auto custom-scrollbar gap-3 p-4">
        <LoadMore
          setDocSnap={setDocSnap}
          docSnap={docSnap}
          allFetchedInitially={allFetched}
          chatId={chatId}
        />

        {messages?.map((chat: any) => {
          return (
            <ChatBox
              key={chat.id}
              user={chat.senderId}
              message={chat.content}
              timestamp={chat.time}
            />
          );
        })}
        <div ref={chatContainerRef}></div>
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatRoot;

/*
  const fetchMore = async () => {
    if (docSnap) {
      const q = query(
        collection(db, "conversations", `${chatId}`, "messages"),
        orderBy("time"),
        limitToLast(10),
        endBefore(docSnap)
      );

      const snapshoxt = await getDocs(q);
      const receivedMessages: any = [];
      if (snapshoxt.size === 0) {
        console.log("fetched all");
        setAllFetched(true);
      } else {
        snapshoxt?.forEach((doc) => {
          console.log("fetched more");
          const messageData = doc?.data();
          const time = messageData?.time;
          const formattedMessage = {
            ...messageData,
            senderId: messageData?.senderId?.id,
            time: time.toDate(),
            id: doc?.id,
          };
          receivedMessages.push(formattedMessage);
        });

        setDocSnap(snapshoxt.docs[0]);
        setMessages((prevMessages) => [...receivedMessages, ...prevMessages]);
      }
    }
  };
*/
