import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
      className="flex space-x-1 items-center text-gray-500 dark:text-gray-300"
    >
      <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-300"></span>
    </motion.div>
  );
};

export default TypingIndicator;
