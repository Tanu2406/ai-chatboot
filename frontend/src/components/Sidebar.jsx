import { Plus, MessageSquare, Trash2, Pencil, X } from "lucide-react";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import ConfirmDialog from "./ConfirmDialog";

const Sidebar = ({ isOpen, onClose }) => {
  const {
    chats,
    activeChat,
    addNewChat,
    switchChat,
    deleteChat,
    clearAllChats,
    renameChat,
  } = useContext(ChatContext);

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const handleRename = (chat) => {
    setEditingId(chat.id);
    setNewTitle(chat.title);
  };

  const saveRename = (id) => {
    if (newTitle.trim()) {
      renameChat(id, newTitle.trim());
    }
    setEditingId(null);
    setNewTitle("");
  };

  return (
    <div
      className={`fixed md:static top-0 left-0 h-screen w-60 bg-gray-100 dark:bg-gray-950 border-r flex flex-col transform transition-transform duration-300 z-40 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b">
        <h2 className="font-bold text-gray-700 dark:text-gray-200">Chats</h2>
        <button
          onClick={addNewChat}
          className="p-2 bg-blue-500 text-white rounded-md flex items-center gap-1 text-sm"
        >
          <Plus size={16} /> New
        </button>
        {/* Close button (only on mobile) */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between px-3 py-2 group ${
              activeChat.id === chat.id
                ? "bg-blue-100 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {/* Title or edit */}
            <div
              className="flex items-center gap-2 flex-1 truncate"
              onClick={() => !editingId && switchChat(chat.id)}
            >
              <MessageSquare
                size={16}
                className="text-gray-600 dark:text-gray-300"
              />
              {editingId === chat.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => saveRename(chat.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveRename(chat.id)}
                  className="bg-transparent border-b border-gray-400 dark:border-gray-600 outline-none text-sm flex-1"
                  autoFocus
                />
              ) : (
                <span className="text-gray-800 dark:text-gray-200 text-sm truncate">
                  {chat.title}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => handleRename(chat)}
                className="p-1 text-gray-500 hover:text-blue-500"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setConfirmDelete(chat.id)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear All Chats */}
      <div className="p-3 border-t">
        <button
          onClick={() => setConfirmClearAll(true)}
          className="w-full py-2 text-sm text-center bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Clear All Chats
        </button>
      </div>

      {/* Confirmations */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => deleteChat(confirmDelete)}
        title="Delete Chat?"
        message="This will permanently delete the chat."
      />

      <ConfirmDialog
        isOpen={confirmClearAll}
        onClose={() => setConfirmClearAll(false)}
        onConfirm={clearAllChats}
        title="Clear All Chats?"
        message="This will remove all chat history."
      />
    </div>
  );
};

export default Sidebar;
