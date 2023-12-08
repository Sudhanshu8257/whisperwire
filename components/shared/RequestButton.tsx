"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { RequestContext } from "@/context/Request";

const RequestButton = () => {
  const ctx = useContext(RequestContext);
  const openModal = () => {
    ctx?.setIsOpen(true);
  };
  return (
    <Button className="font-bold gap-2" onClick={openModal}>
      <Image
        src={"/assets/icons-black/user-plus-bl.svg"}
        alt="requests"
        width={20}
        height={20}
      />
      Requests
    </Button>
  );
};

export default RequestButton;
