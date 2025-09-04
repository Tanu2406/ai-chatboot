import { useState, useContext } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";

const InputBox = () => {
  const [input, setInput] = useState("");
  const { addMessage,setIsLoading  } = useContext(ChatContext);

  const sendMessage = async () => {
    if (!input.trim()) return;

    addMessage({ sender: "user", text: input });
    setInput("");
    setIsLoading(true); 

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
        
      });

      addMessage({ sender: "ai", text: response.data.reply });
    } catch (error) {
      addMessage({ sender: "ai", text: "⚠️ Server error" });
    }finally {
      setIsLoading(false); // ✅ hide "thinking..."
    }

    
  };

  return (
    <div className="flex p-3 border-t bg-white dark:bg-gray-800">
      <input
        type="text"
        className="flex-1 border rounded-xl px-3 py-2 text-sm sm:text-base outline-none dark:bg-gray-700 dark:text-white"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="ml-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-xl text-sm sm:text-base cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;
