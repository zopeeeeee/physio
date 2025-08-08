'use client';
import { FC } from "react";
import { motion } from "framer-motion";

const Hero: FC = () => (
  <section
    className="relative z-10 bg-white mx-auto max-w-7xl px-6 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] pt-16 pb-18"
    id="hero"
  >
    {/* Animated Text - Flexrite World centered properly */}
    <h1 className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/3 text-black font-playfair font-black leading-none text-center pointer-events-none select-none z-10 text-[60px] sm:text-[140px] md:text-[160px] lg:text-[180px] whitespace-nowrap">
      <motion.span
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="block"
      >
        Flexrite World
      </motion.span>
    </h1>

    {/* Image + CTAs Section */}
    <div className="relative flex flex-row items-center justify-center w-full h-[500px] mt-24 z-20 max-w-[1100px] mx-auto">
      {/* Animated Hand Image - from Bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        className="relative flex-shrink-0"
        style={{ width: '580px', height: '275px' }}
      >
        <img
          src="/hero.png"
          alt="Cybernetic Hand"
          className="absolute left-0 top-[70%] -translate-y-1/2 w-full h-auto object-contain drop-shadow-2xl pointer-events-none select-none"
          style={{ zIndex: 30 }}
        />
      </motion.div>

      {/* CTAs and Subtitle */}
      <div className="flex flex-col justify-center items-start ml-6 space-y-8 max-w-[520px] w-full">
        <p className="text-black font-lato text-lg sm:text-xl font-medium leading-relaxed whitespace-nowrap">
          Your Trusted Partner in Recovery and Pain Free Living
        </p>
        <div className="flex flex-row gap-4 w-full justify-center">
          <button className="rounded-[33px] bg-black text-white font-lato text-xl font-medium px-7 py-4 min-w-[260px] transition-colors shadow-md w-1/2 hover:bg-white hover:text-black border border-black">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
