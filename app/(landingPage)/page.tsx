import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16 ">
      <div className="flex items-center justify-center">
        <Image src={"/assets/logo.png"} alt="logo" width={56} height={56} />
        <p className="text-xl text-black dark:text-white font-bold font-caveat">
          Whisper Wire
        </p>
      </div>
      <div className="flex w-full items-center justify-center h-fit max-md:flex-col-reverse  ">
        <div className=" h-[250px] flex flex-col flex-grow  justify-between max-md:text-center max-md:items-center">
          <p className="text-[56px] text-black dark:text-white font-bold max-md:text-[36px] ">
            Experience Chatting, Elevated with Whisper Wire
          </p>
          <Link href={"/chats"}>
            <Button className="text-xl gap-2 w-fit h-[32px] bg-[#15DDFF] hover:bg-[#6ccede] flex items-center justify-start p-6  rounded-lg text-black font-bold transition ">
              Get Started
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron"
                width={24}
                height={24}
              />
            </Button>
          </Link>
        </div>
        <Image
          src={"/assets/hero-image2.png"}
          alt="hero-image"
          width={550}
          height={550}
        />
      </div>
      <div className="flex flex-col bg-yellow-200 p-6 fixed bottom-3 right-3 rounded-md">
        <h1 className="text-lg font-bold text-[#1e1e1e]">
          ✨🚧 Under Construction: Crafting Awesomeness! 🚧✨
        </h1>
      </div>
    </main>
  );
}
