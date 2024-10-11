"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import sendMessageIcon from "@/public/icons/sendBtn.svg";
import ChatMessage from "./ChatMessage";
import MessageLoading from "./MessageLoading";

interface ChatMessage {
  type: string;
  message: string;
}

interface ChatBoxProps {
  selectedLanguage: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const renderMessage = () => {
    if (input.trim() === "") return;
    const newMessage: ChatMessage = { type: "user", message: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsMessageSent(true);
    setIsMessageLoading(true);
  };

  useEffect(() => {
    async function translateMessage() {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          body: JSON.stringify({
            text: messages[messages.length - 1].message,
            language: selectedLanguage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if(data.error) return;

        const newMessage: ChatMessage = { type: "system", message: data.translatedText };
        setMessages((prev) => [...prev, newMessage]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsMessageSent(false);
        setIsMessageLoading(false);
      }
    }

    if (isMessageSent) {
      translateMessage();
    }
  }, [isMessageSent]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isMessageLoading) {
      renderMessage();
    }
  };

  return (
    <>
      <div className="w-full max-h-[20rem] overflow-y-auto my-10 flex flex-col gap-3">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            type={message.type}
            message={message.message}
          />
        ))}
        {isMessageLoading && <MessageLoading />}
        <div className="h-0 w-0 m-0 p-0" ref={messagesEndRef} />
      </div>
      <div className="p-3 border border-solid border-gray-500 rounded-md flex flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Chat here..."
          className="w-full focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          onClick={() => renderMessage()}
          disabled={isMessageLoading}
          className={`p-1 ${isMessageLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{ pointerEvents: isMessageLoading ? "none" : "auto" }}
        >
          <Image
            src={sendMessageIcon}
            alt="send message"
          />
        </button>
      </div>
    </>
  );
};

export default ChatBox;
