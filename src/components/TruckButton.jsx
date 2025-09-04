import { motion } from "framer-motion";
import Lottie from "lottie-react";
import truckAnim from "../assets/truck.json";

const TruckButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        backgroundPosition: ["0% 50%", "100% 50%"],
        transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
      }}
      whileTap={{ scale: 0.92, rotate: -2 }}
      className="relative w-64 h-16 rounded-2xl font-bold text-black 
                 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                 bg-[length:200%_200%] overflow-hidden shadow-xl"
    >
      {/* Road effect (dashed lines) */}
      <div className="absolute inset-x-4 bottom-3 h-[2px] bg-gradient-to-r from-white via-transparent to-white bg-[length:20px_2px] animate-[roadmove_1s_linear_infinite]" />

      {/* Truck Animation */}
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-14"
      >
        <Lottie animationData={truckAnim} loop={true} />
      </motion.div>

      {/* Button text */}
      <span className="relative z-10 text-lg">Drive Your Move</span>

      <style jsx>{`
        @keyframes roadmove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 20px 0;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default TruckButton;
