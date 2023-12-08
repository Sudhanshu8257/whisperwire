import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="w-full flex items-center gap-1 bg-[#C5F7FF] rounded-lg mt-4 py-1">
      <Input
        placeholder="Search"
        className=" h-[35px] w-full bg-transparent border-none text-[14px] text-black  placeholder:text-[#657cc8] placeholder:font-medium placeholder:text-[14px] focus-visible:ring-0  focus-visible:ring-offset-0 "
      />
      <Image
        src={"/assets/icons/search.svg"}
        width={20}
        height={20}
        alt="search"
        className="cursor-pointer mr-2"
      />
    </div>
  );
};

export default SearchBar;
