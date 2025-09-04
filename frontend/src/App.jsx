import './App.css';
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  
      <ChatProvider>
        <div className="flex h-screen dark:bg-gray-900 dark:text-white">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Chat area */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-blue-600 dark:bg-gray-800 text-white text-lg font-bold">
              <div className="flex items-center gap-2">
                {/* Mobile: Hamburger button */}
                <button
                  className="md:hidden p-2"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={24} />
                </button>
                Gemini AI Chatbot 🤖
              </div>
             
            </div>

            {/* Chat messages */}
            <ChatWindow />

            {/* Input */}
            <InputBox />
          </div>
        </div>
      </ChatProvider>
  
  );
}

export default App;



