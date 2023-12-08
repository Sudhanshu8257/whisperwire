import FriendsCard from "@/components/cards/FriendsCard";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  const users = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: true,
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 3,
      fullName: "Alex Johnson",
      email: "alex.johnson@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: true,
    },
    {
      id: 4,
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: false,
    },
    {
      id: 5,
      fullName: "Michael Wilson",
      email: "michael.wilson@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 6,
      fullName: "Sophia Martin",
      email: "sophia.martin@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: false,
    },
    {
      id: 7,
      fullName: "Daniel Garcia",
      email: "daniel.garcia@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: true,
    },
    {
      id: 8,
      fullName: "Olivia Rodriguez",
      email: "olivia.rodriguez@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 9,
      fullName: "William Hernandez",
      email: "william.hernandez@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: false,
    },
    {
      id: 10,
      fullName: "Emma Martinez",
      email: "emma.martinez@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: false,
    },
    {
      id: 11,
      fullName: "Aiden Lopez",
      email: "aiden.lopez@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 12,
      fullName: "Mia Perez",
      email: "mia.perez@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: false,
    },
    {
      id: 13,
      fullName: "James Turner",
      email: "james.turner@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: false,
    },
    {
      id: 14,
      fullName: "Ella Hall",
      email: "ella.hall@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 15,
      fullName: "Logan White",
      email: "logan.white@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: false,
    },
    {
      id: 16,
      fullName: "Ava Young",
      email: "ava.young@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: false,
    },
    {
      id: 17,
      fullName: "Benjamin Green",
      email: "benjamin.green@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
    {
      id: 18,
      fullName: "Chloe King",
      email: "chloe.king@example.com",
      imgSource: "/assets/dog3.jpg",
      friend: false,
    },
    {
      id: 19,
      fullName: "Henry Hill",
      email: "henry.hill@example.com",
      imgSource: "/assets/dog1.jpg",
      friend: true,
    },
    {
      id: 20,
      fullName: "Lily Adams",
      email: "lily.adams@example.com",
      imgSource: "/assets/dog2.jpg",
      friend: false,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-between items-center">
        <p className=" w-full text-[28px] text-center font-black mb-3">
          Friends
        </p>
        <Button className="font-bold gap-2 ">
          <Image
            src={"/assets/icons-black/user-plus-bl.svg"}
            alt="requests"
            width={20}
            height={20}
          />
          Requests
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <SearchBar />
      </div>
      <div className="flex flex-wrap gap-4 mt-8 overflow-y-auto custom-scrollbar w-full justify-center">
        {users.map((user, i) => (
          <FriendsCard
            key={user.id}
            friend={user.friend}
            index={i}
            username={user.fullName}
            mail={user.email}
            source={user.imgSource}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
