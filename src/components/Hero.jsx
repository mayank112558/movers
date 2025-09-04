import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import truckAnim from "../assets/truck.json";
import QuoteForm from "./QuoteForm";
import { X } from "lucide-react";
import videoOne from "../assets/one.mp4";
import videoFour from "../assets/four.mp4";

// ==========================
// Typing Effect
// ==========================
function TypingText({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

// ==========================
// Truck Button Component
// ==========================
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

// ==========================
// Story Stop Component
// ==========================
function StoryStop({ stop, isLast, onQuote, nextTitle }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % stop.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stop.titles.length]);

  return (
    <section className="h-screen flex items-center justify-center relative snap-start">
      {/* Background */}
      {stop.bg.includes(".mp4") ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={stop.bg}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <motion.img
          src={stop.bg}
          alt={stop.titles[0]}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl"
      >
        <motion.h2
          key={wordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 
                     bg-gradient-to-r from-yellow-400 to-orange-500 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          {stop.titles[wordIndex]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-base md:text-lg text-gray-200 leading-relaxed"
        >
          <TypingText text={stop.desc} speed={40} />
        </motion.p>

        {/* CTA (Final Stop Only) */}
        {isLast && (
          <div className="mt-10 flex justify-center">
            <TruckButton onClick={onQuote} />
          </div>
        )}

        {/* Transition text to next stop */}
      </motion.div>
    </section>
  );
}

// ==========================
// Hero Section
// ==========================
export default function Hero() {
  const [showQuote, setShowQuote] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Truck progress bar movement
  const truckY = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const storyStops = [
    {
      titles: ["We Pack with Care", "Handled with Love", "Safe & Sound"],
      desc: "Your memories are wrapped, sealed, and protected by experts.",
      bg: videoOne,
    },
    {
      titles: ["We Move with Precision", "Across Borders", "On Every Mile"],
      desc: "From highways to borders, your shipment is tracked every mile.",
      bg: videoOne,
    },
    {
      titles: ["We Deliver with Trust", "On Time", "Your New Start"],
      desc: "On-time, safe, and seamless – your new beginning awaits.",
      bg: videoFour,
    },
  ];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-black text-white snap-y snap-mandatory h-screen overflow-scroll"
    >
      {/* Hero Intro Section */}
      <section className="h-screen flex flex-col items-center justify-center relative snap-start">
        <div className="absolute inset-0 flex items-center justify-center">
          <Lottie animationData={truckAnim} loop className="w-40 md:w-56" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-2xl"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-6 
                       bg-gradient-to-r from-yellow-400 to-orange-500 
                       bg-clip-text text-transparent drop-shadow-lg"
          >
            <TypingText text="Relocating Made Easy" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-6"
          >
            We ensure a smooth, safe, and stress-free moving experience from
            packing to delivery.
          </motion.p>

          <TruckButton onClick={() => setShowQuote(true)} />
        </motion.div>
      </section>

      {/* Storytelling Journey */}
      {storyStops.map((stop, i) => (
        <StoryStop
          key={i}
          stop={stop}
          isLast={i === storyStops.length - 1}
          nextTitle={storyStops[i + 1]?.titles[0]}
          onQuote={() => setShowQuote(true)}
        />
      ))}

      {/* Truck Progress Tracker (side) */}
      <div className="fixed top-28 left-8 hidden md:flex flex-col items-center h-[70%]">
        {/* Track line */}
        <div className="relative h-full w-[3px] bg-gray-300 rounded-full overflow-hidden">
          {/* Progress indicator */}
          <motion.div
            style={{ height: progressHeight }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"
          />
        </div>

        {/* Truck */}
        <motion.div
          style={{ y: truckY }}
          className="absolute left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center"
        >
          <Lottie animationData={truckAnim} loop={false} />
        </motion.div>
      </div>

      {/* Modal Quote Form */}
      {showQuote && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowQuote(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 sm:p-10"
          >
            <button
              onClick={() => setShowQuote(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Get Your Instant Quote
            </h3>
            <QuoteForm />
          </motion.div>
        </div>
      )}
    </section>
  );
}
