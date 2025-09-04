import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Glowing aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-orange-400 opacity-60 blur-lg group-hover:opacity-80 transition" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
              {/* Logo content if needed */}
            </div>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 bg-clip-text text-transparent group-hover:tracking-wide transition">
            MoversCo
          </span>
        </motion.div>

        {/* Contact Button */}
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 font-semibold text-white rounded-full overflow-hidden"
        >
          {/* Gradient Border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-indigo-600 p-[2px]" />
          {/* Inner Transparent Layer */}
          <span className="relative block rounded-full bg-black/30 backdrop-blur-md px-6 py-2">
            Contact
          </span>
        </motion.button>
      </nav>
    </header>
  );
}

export default Navbar;
