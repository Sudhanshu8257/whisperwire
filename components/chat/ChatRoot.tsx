import React from "react";
import Header from "./Header";
import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";

const ChatRoot = () => {
  const conversation = [
    {
      id: 1,
      timestamp: "2023-11-26T13:00:45Z",
      userId: "user123",
      message: "Hello, how are you?",
    },
    {
      id: 2,
      timestamp: "2023-11-26T13:01:00Z",
      userId: "assistant",
      message: "Hello, I'm doing well. How can I assist you today?",
    },
    {
      id: 3,
      timestamp: "2023-11-26T13:01:15Z",
      userId: "user123",
      message: "Can you help me with my homework?",
    },
    {
      id: 4,
      timestamp: "2023-11-26T13:01:30Z",
      userId: "assistant",
      message: "Of course! I'd be happy to help. What do you need help with?",
    },
    {
      id: 5,
      timestamp: "2023-11-26T13:02:00Z",
      userId: "user123",
      message: "I need help with my math homework. I'm stuck on a problem.",
    },
    {
      id: 6,
      timestamp: "2023-11-26T13:02:15Z",
      userId: "assistant",
      message:
        "Sure, I'd be glad to help with your math problem. Could you please tell me what the problem is?",
    },
    {
      id: 7,
      timestamp: "2023-11-26T13:02:30Z",
      userId: "user123",
      message:
        "The problem is about calculating the area of a circle. I'm not sure how to do it.",
    },
    {
      id: 8,
      timestamp: "2023-11-26T13:02:45Z",
      userId: "assistant",
      message:
        "The area of a circle can be calculated using the formula $$A = \\pi r^2$$ where $$A$$ is the area and $$r$$ is the radius of the circle.",
    },
    {
      id: 9,
      timestamp: "2023-11-26T13:03:00Z",
      userId: "user123",
      message: "Oh, I see. That makes sense. Thank you for your help!",
    },
    {
      id: 10,
      timestamp: "2023-11-26T13:03:15Z",
      userId: "assistant",
      message:
        "You're welcome! I'm glad I could help. If you have any other questions, feel free to ask.",
    },
  ];
  return (
    <div className=" flex flex-col w-full justify-start items-center h-full">
      <Header />
      <div className="flex-grow w-full flex flex-col overflow-y-auto custom-scrollbar gap-3 p-4">
        {conversation.map((chat) => (
          <ChatBox
            key={chat.id}
            user={chat.userId}
            message={chat.message}
            timestamp={chat.timestamp}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatRoot;
