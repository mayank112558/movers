import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Lottie from "lottie-react";
import truckAnim from "../assets/truck.json";
import videoFour from "../assets/four.mp4";

function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />

      {/* Hero with video background */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          src={videoFour}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 text-white"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1.05 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          >
            Let’s Move Together
          </motion.h1>
          <p className="mt-4 text-lg text-gray-200">
            We’re here to answer questions & help plan your move.
          </p>
        </motion.div>

        {/* Truck animation */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-6 w-40 md:w-56 z-10"
        >
          <Lottie animationData={truckAnim} loop />
        </motion.div>
      </section>

      {/* Contact Info Section (col-12 full width) */}
      <section className="relative w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 py-16 px-6 text-white">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-12 drop-shadow-lg">
            Contact Info
          </h3>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Address */}
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/40">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <p className="text-lg font-medium leading-relaxed">
                1234 Elm Street, Suite 100 <br /> City, Country 56789
              </p>

              {/* Arrow to next column */}
              <div className="hidden md:block absolute right-[-25px] top-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent"></div>
              </div>
            </div>

            {/* Email */}
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/40">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <p className="text-lg font-medium">support@moversco.com</p>

              {/* Arrow to next column */}
              <div className="hidden md:block absolute right-[-25px] top-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent"></div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/40">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <p className="text-lg font-medium">+1 (555) 123-4567</p>
            </div>
          </div>
        </motion.div>
      </section>

{/* Map Section */}
<section className="relative w-full px-6 pb-16">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto"
  >
    <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900">
     
    </h3>

    <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 to-yellow-400 opacity-20 blur-2xl -z-10" />

      <iframe
        title="Our Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1848475297514!2d-122.41941568468184!3d37.77492977975905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbae123%3A0x5d7bfb3a3e8a2b8d!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1680483982945!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl"
      />
    </div>
  </motion.div>
</section>


      {/* Floating Quick Action */}
      <motion.a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
      >
        <Phone className="w-5 h-5" />
        <span className="font-semibold">Call Now</span>
      </motion.a>

      <Footer />
    </div>
  );
}

export default ContactPage;
