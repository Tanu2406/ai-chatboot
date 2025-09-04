import { motion } from "framer-motion";
const Message = ({ text, sender }) => {
  const isUser = sender === "user";
  const safeText = text || ""; 
  return (
     <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-[70%] md:max-w-[60%] break-words ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {safeText}
      </div>
    </div>
    </motion.div>
  );
};

export default Message;
