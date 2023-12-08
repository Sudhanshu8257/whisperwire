"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { NavPrimaryLinks, NavSecondaryLinks } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const NavBar = () => {
  const pathName = usePathname();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading) redirect("/sign-in");
  }, [user, loading]);
  return (
    <div className="w-[90px] left-0 top-0 flex flex-col items-center justify-start py-4 h-full border-0 border-r-[2px] border-border">
      <div className="flex items-center justify-center">
        <Link href={"/"}>
          <Image src={"/assets/logo.png"} alt="logo" width={60} height={60} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-start  gap-6 mt-10 ">
        {NavPrimaryLinks.map((link) => {
          const isActive = pathName === link.route;
          return (
            <Link
              key={link.route}
              href={link.route}
              className={`p-3 flex items-center justify-center ${
                isActive ? "bg-primary" : "hover:bg-accent"
              }  rounded-[14px] transition duration-150 ease-out hover:ease-in  `}
            >
              <Image
                src={link.iconBlack}
                loading="lazy"
                width={24}
                height={24}
                alt={link.label}
                className="block dark:hidden"
              />
              <Image
                src={isActive ? link.iconBlack : link.iconLight}
                loading="lazy"
                width={24}
                height={24}
                alt={link.label}
                className="hidden dark:block"
              />
            </Link>
          );
        })}
        <Separator className="bg-border -py-2 border-[1px] " />
        {NavSecondaryLinks.map((link) => {
          const isActive = pathName === link.route;
          return (
            <Link
              key={link.route}
              href={link.route}
              className={`p-3 ${
                isActive ? "bg-primary " : "hover:bg-accent"
              }  rounded-[14px] transition duration-150 ease-out hover:ease-in  `}
            >
              <Image
                src={link.iconBlack}
                loading="lazy"
                width={24}
                height={24}
                alt={link.label}
                className="block dark:hidden"
              />
              <Image
                src={isActive ? link.iconBlack : link.iconLight}
                loading="lazy"
                width={24}
                height={24}
                alt={link.label}
                className="hidden dark:block"
              />
            </Link>
          );
        })}
      </div>
      <div className=" mt-auto flex flex-col items-center justify-start gap-5 ">
        <ModeToggle />
        <Link href={"/profile"}>
          <Avatar>
            <AvatarImage src="/assets/dog1.jpg" />
            <AvatarFallback>Dog</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
