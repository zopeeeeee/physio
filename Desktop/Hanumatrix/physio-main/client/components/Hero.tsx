'use client';
import { FC, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AboutUs from "./AboutUs";

const Hero: FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* Original Hero section */}
      <div className="relative h-[200vh]">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            willChange: "transform",
          }}
        />

        <section
          className="sticky top-0 h-screen flex flex-col items-center justify-center bg-transparent z-10"
          id="hero"
        >
          {/* --- Everything below is exactly as your original --- */}
          <h1 className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/3 text-black font-playfair font-black leading-none text-center pointer-events-none select-none z-10 text-[60px] sm:text-[140px] md:text-[160px] lg:text-[180px] whitespace-nowrap mt-8">
            <motion.span
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="block"
            >
              Flexrite World
            </motion.span>
          </h1>

          <div className="relative flex flex-row items-center justify-center w-full h-[500px] mt-32 z-10 max-w-[1100px] mx-auto">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              className="relative flex-shrink-0"
              style={{ width: '680px', height: '350px' }}
            >
              <img
                src="/hero.png"
                alt="Cybernetic Hand"
                className="absolute left-0 top-[70%] -translate-y-1/2 w-full h-auto object-contain drop-shadow-2xl pointer-events-none select-none"
              />
            </motion.div>

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
      </div>

      {/* AboutUs fully overlapping Hero */}
      <div className="relative z-20 -mt-[100vh] bg-white">
        <AboutUs />
      </div>
    </div>
  );
};

export default Hero;
