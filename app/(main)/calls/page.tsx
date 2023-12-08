import { MotionDiv } from "@/components/shared/MotionDiv";
import Image from "next/image";
import React from "react";

const Page = async () => {
  return (
    <div className=" w-full h-fit flex flex-col items-center justify-center">
      <MotionDiv
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.3, ease: "easeInOut", duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src={"/assets/icons-black/calls-bl.svg"}
          alt="calls"
          width={64}
          height={64}
          className="block dark:hidden"
        />
        <Image
          src={"/assets/icons/calls.svg"}
          alt="calls"
          width={64}
          height={64}
          className="hidden dark:block"
        />
        <p className="text-[48px] mt-2 text-primary font-bold">
          Call Feature Coming Soon!
        </p>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.3, ease: "easeInOut", duration: 0.5 }}
      >
        <p className="text-[24px] text-gray-500 mt-2 ">
          We&apos;re working hard to bring you the latest features.Stay tuned
          for the exciting addition of the Call feature.
        </p>
      </MotionDiv>
    </div>
  );
};

export default Page;
