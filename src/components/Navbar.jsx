import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
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
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg" />
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
          className="relative px-6 py-2 font-semibold rounded-full overflow-hidden transition-colors duration-300"
        >
          {/* Gradient Border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-indigo-600 p-[2px]" />
          {/* Inner Layer */}
          <span
            className={`relative block rounded-full px-6 py-2 backdrop-blur-md transition-colors duration-300 ${
              scrolled ? "bg-indigo-600 text-white" : "bg-black/30 text-white"
            }`}
          >
            Contact
          </span>
        </motion.button>
      </nav>
    </header>
  );
}

export default Navbar;
