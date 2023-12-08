"use client";
import React from "react";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { fetch } from "@/lib/actions/user.action";

const Refetch = () => {
  const pathName = usePathname();
  const f = () => {
    fetch(pathName);
  };
  return (
    <Button onClick={f}>
      <RefreshCwIcon className="w-[20px] h-[20px] hover:animate-spin" />
      <p className="ml-2 font-medium">Refresh</p>
    </Button>
  );
};

export default Refetch;
