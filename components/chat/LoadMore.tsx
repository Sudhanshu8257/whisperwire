"use client";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatBox from "./ChatBox";
import {
  collection,
  endBefore,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSearchParams } from "next/navigation";

const LoadMore = ({ docSnap, setDocSnap, allFetchedInitially }: any) => {
  const [prevMessages, setPrevMessages] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const scrollref = useRef(null);
  const params = useSearchParams();
  const chatId = params.get("chat");
  const { ref, inView } = useInView({});
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
        //@ts-ignore
        setPrevMessages((prevMessages) => [
          ...receivedMessages,
          ...prevMessages,
        ]);
      }

      const currentScrollPosition = window.scrollY;
      const targetPosition = currentScrollPosition + 60;
      window.scrollTo({ behavior: "smooth", top: targetPosition });
    }
  };
  useEffect(() => {
    if (!allFetched) {
      fetchMore();
    }
  }, [inView, allFetched]);

  useEffect(() => {
    setDocSnap();
    setAllFetched(false);
    setPrevMessages([]);
  }, [chatId]);

  useEffect(() => {
    if (allFetchedInitially) {
      setAllFetched(true);
    }
  }, [allFetchedInitially]);

  return (
    <>
      {allFetched || allFetchedInitially ? (
        <div className="w-full flex items-center justify-center"></div>
      ) : (
        <div ref={ref} className="w-full flex items-center justify-center">
          <RefreshCcw className="w-[24px] h-[24px] animate-spin" />
        </div>
      )}
      <div className="flex flex-col gap-3  w-full h-fit">
        {prevMessages?.map((chat: any) => {
          return (
            <ChatBox
              key={chat.id}
              user={chat.senderId}
              message={chat.content}
              timestamp={chat.time}
            />
          );
        })}
        <div ref={scrollref}></div>
      </div>
    </>
  );
};

export default LoadMore;
