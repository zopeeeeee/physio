import React, { useEffect, useState } from "react";

export default function LoadingPage() {
  const statements = [
    "Choose to run.",
    "Choose to walk.",
    "Choose to dance.",
    "Choose to move!"
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < statements.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 750);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">
      <div className="flip-container mb-8">
        <img
          src="/Logo.jpg" // Adjust the path as necessary
          alt="Loading"
          className="loading-svg"
        />
      </div>
      {/* Animated statement */}
      <div className="h-12 flex items-center justify-center">
        <span
          key={index}
          className="text-white text-2xl md:text-3xl font-bold animate-fade-in"
          style={{ transition: "opacity 0.5s, transform 0.5s" }}
        >
          {statements[index]}
        </span>
      </div>
        {/* Final statement extra */}
        {/*
        {index === statements.length - 1 && (
          <div className="mt-6 text-[#DDD6FF] text-xl md:text-2xl font-semibold font-playfair animate-fade-in">
            Choose Physical Therapy
          </div>
        )}
        */}
      {/* Bottom center tagline */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <span className="text-white text-lg md:text-xl font-playfair opacity-80 tracking-wide animate-fade-in">flexrite is faster</span>
      </div>
      <style>{`
        .flip-container {
          perspective: 1000px;
        }
        .loading-svg {
          width: 120px;
          height: 120px;
          animation: flipX 1.2s cubic-bezier(.4,2,.3,1) infinite;
          display: block;
        }
        @keyframes flipX {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
