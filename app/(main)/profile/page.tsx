"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

const Page = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);
  return (
    <div className="flex flex-col gap-2 p-8 bg-secondary">
      <h1>{user?.email}</h1>
      <h1>{user?.displayName}</h1>
      <Button
        onClick={async () => {
          const success = await signOut();
          if (success) {
            alert("You are sign out");
          }
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Page;
