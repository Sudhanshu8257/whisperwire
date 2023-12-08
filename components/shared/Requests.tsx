"use client";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FriendRequestCard from "../cards/FriendRequestCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const docRef = doc(db, "users", "lohanajoy@gmail.com");
    const q = query(
      collection(db, "friendRequests"),
      where("reciverId", "==", docRef)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let result: any = [];
      snapshot.forEach((doc) => {
        result.push(doc.data());
      });
      setRequests(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  console.log("requests", requests);
  return <div>hello</div>;
};

export default Requests;
