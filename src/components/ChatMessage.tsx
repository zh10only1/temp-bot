import React from "react";

interface ChatMessageProps {
  type: string;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, message }) => {
  const messageStyles =
    type === "user" ? "bg-lightBlackGray text-white rounded-tr-lg mr-auto" : "bg-grSkin2 text-black rounded-tl-lg ml-auto";

  return (
    <div
      className={`max-w-[80%] break-words px-3 py-2 rounded-b-lg ${messageStyles}`}
    >
      {message}
    </div>
  );
};

export default ChatMessage;
