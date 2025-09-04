// import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

// export default function DarkModeToggle() {
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "dark") {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//     } else if (saved === "light") {
//       setDark(false);
//       document.documentElement.classList.remove("dark");
//     } else {
//       const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       setDark(prefers);
//       if (prefers) document.documentElement.classList.add("dark");
//     }
//   }, []);

//   const toggle = () => {
//   setDark(prev => {
//     const next = !prev;
//     if (next) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//     return next;
//   });
// };

//   return (
//     <button
//       onClick={toggle}
//       className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//       title={dark ? "Switch to light" : "Switch to dark"}
//     >
//       {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
//     </button>
//   );
// }

import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle({ dark, toggleDark }) {
  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
    </button>
  );
}
