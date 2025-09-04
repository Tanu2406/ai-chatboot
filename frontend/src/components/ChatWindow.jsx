import { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = () => {
  const { activeChat,isLoading  } = useContext(ChatContext);
    console.log("Rendering ChatWindow with messages:", activeChat.messages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat,isLoading ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
      {activeChat.messages.map((msg, i) => (
        <Message key={i} text={msg.text} sender={msg.sender} />
      ))}
      {/* ✅ Show typing indicator */}
      {isLoading && (
  <div className="flex items-center space-x-2">
    <span className="mr-2">🤖</span>
    <TypingIndicator />
  </div>
)}


      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
