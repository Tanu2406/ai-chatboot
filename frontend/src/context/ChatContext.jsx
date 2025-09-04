import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const storedChats = JSON.parse(localStorage.getItem("chats")) || [
    { id: Date.now(), title: "New Chat", messages: [] },
  ];
  const storedActiveChatId = localStorage.getItem("activeChatId");

  const [chats, setChats] = useState(storedChats);
    const [isLoading, setIsLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState(
    storedActiveChatId && storedChats.some(c => c.id === parseInt(storedActiveChatId))
    ? parseInt(storedActiveChatId)
    : storedChats[0].id
  );

  // Save chats + activeChatId
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("activeChatId", activeChatId);
  }, [activeChatId]);

  // Add message
const addMessage = (msg) => {
   console.log("Adding message:", msg);
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          const updatedMessages = [...chat.messages, msg];
          let updatedTitle = chat.title;

          if (
            chat.title === "New Chat" &&
            msg.sender === "user" &&
            updatedMessages.length === 1
          ) {
            updatedTitle =
              msg.text.length > 20
                ? msg.text.substring(0, 20) + "..."
                : msg.text;
          }
        console.log("Updated messages:", updatedMessages);
          return { ...chat, messages: updatedMessages, title: updatedTitle };
        }
        return chat;
      })
    );
  };

  // Add new chat
  const addNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // Switch chat
  const switchChat = (id) => {
    setActiveChatId(id);
  };

  // ✅ Rename chat
  const renameChat = (id, newTitle) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );
  };

  // Delete chat
  const deleteChat = (id) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== id);
      if (updated.length > 0) {
        setActiveChatId(updated[0].id);
      } else {
        const newChat = { id: Date.now(), title: "New Chat", messages: [] };
        setActiveChatId(newChat.id);
        return [newChat];
      }
      return updated;
    });
  };

  // Clear all chats
  const clearAllChats = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats([newChat]);
    setActiveChatId(newChat.id);
  };

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) || chats[0];

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        addMessage,
        addNewChat,
        switchChat,
        renameChat, // ✅ export rename function
        deleteChat,
        clearAllChats,
        isLoading,
         setIsLoading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
