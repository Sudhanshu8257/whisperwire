"use client";
import React from "react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignOutBtn = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Button
      className="font-bold rounded-md gap-2"
      onClick={() => signOut(() => router.push("/"))}
    >
      <Image
        src={"/assets/icons-black/logout.svg"}
        alt="logout"
        width={20}
        height={20}
      />
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
