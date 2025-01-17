import React, { useState, ChangeEvent, FormEvent } from "react";

interface Message {
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

const FIXED_MESSAGE: Message = {
  text: "안녕하세요. 대학생 연합 IT 동아리 잇타입니다.\n궁금한 점이 있으시다면 무엇이든지 물어보세요.",
  sender: "system",
  timestamp: new Date()
};

export default function Chatting() {
  const [messages, setMessages] = useState<Message[]>([FIXED_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputMessage, sender: "user", timestamp: new Date() }
      ]);
      setInputMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full h-full bg-gray-100 relative flex flex-col">
      <header className="flex-shrink-0 w-full h-[65px] px-5 py-[22px] custom-shadow text-left text-callout text-gray-1000 bg-white-100">
        7기 리크루팅 Q&A 채팅
      </header>

      <div className="h-[calc(100vh-65px-82px)] overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
          >
            {message.sender === "system" && (
              <div className="flex items-center mb-2">
                <img
                  src="/itstime.png"
                  alt="It's Time"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-caption1 ml-[10px]">
                  대학생 연합 IT 동아리 잇타
                </p>
              </div>
            )}
            <div
              className={`w-fit mb-1 p-[14px] rounded-lg text-left text-caption3 ${
                message.sender === "user"
                  ? "bg-main-100 text-white-100 rounded-br-none ml-auto"
                  : "bg-gray-150 rounded-bl-none mb-5"
              } font-medium`}
            >
              {message.text}
            </div>

            {message.sender === "user" && (
              <div className="text-xs text-gray-500 mb-5">
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full flex-shrink-0">
        <section className="w-full relative">
          <input
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="질문을 작성해주세요."
            className="w-full h-[82px] text-subheadline pl-[27px] pr-[60px] py-[30px] bg-white-100 focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-8">
            <img src="/assets/ic-send-chat.svg" alt="Send" />
          </button>
        </section>
      </form>
    </div>
  );
}
