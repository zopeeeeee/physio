import Header from "@/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  layout: 'left' | 'right';
  image: string; // Add image property
}



// Animation directions for each block (index-based)
const animationDirections = [
  "right", // 1st block

  "left",  // 2nd block
  "right", // 3rd block
  "left",  // 4th block
  "right", // 5th block
  "left"   // 6th block
];

const services: Service[] = [
  {
    id: '1',
    title: 'Injury Recovery',
    description: 'Achieve recovery and growth with personalized care that offers vital support for lasting health. We are dedicated to empowering you on your journey to reach goals.',
    duration: '45 min',
    layout: 'left',
    image: '/images/placeholder1.jpg', // TODO: Replace with actual image path
  },
  {
    id: '2',
    title: 'Therapeutic Massage',
    description: 'Experience therapeutic massage to ease tension and enhance relaxation. Schedule your session today for a healthier and more balanced you.',
    duration: '45 min',
    layout: 'right',
    image: '/images/placeholder2.jpg', // TODO: Replace with actual image path
  },
  {
    id: '3',
    title: 'Fitness Training',
    description: 'Unlock your fitness potential with training designed for you. Our expert trainers will help you achieve your goals and transform your wellness journey. Start your path to a stronger you today!',
    duration: '1 hour',
    layout: 'left',
    image: '/images/placeholder3.jpg', // TODO: Replace with actual image path
  },
  {
    id: '4',
    title: 'Deep Tissue Massage',
    description: 'Deep tissue massage relieves pain and enhances flexibility. It targets deeper muscles, reducing stress and improving well-being. Experience its benefits.',
    duration: '45 min',
    layout: 'right',
    image: '/images/placeholder4.jpg', // TODO: Replace with actual image path
  },
  {
    id: '5',
    title: 'Pain Relief Acupuncture',
    description: 'Explore Pain Relief Acupuncture to ease discomfort and restore balance in your body. Discover its benefits and take a step toward a pain-free life.',
    duration: '45 min',
    layout: 'left',
    image: '/images/placeholder5.jpg', // TODO: Replace with actual image path
  },
  {
    id: '6',
    title: 'Prenatal Care',
    description: 'Prenatal care is crucial for a healthy pregnancy, supporting both mother and baby. Regular check-ups and guidance help monitor progress and address any concerns',
    duration: '1 hour',
    layout: 'right',
    image: '/images/placeholder6.jpg', // TODO: Replace with actual image path
  }
];

export default function Services() {
  // Refs for each service block
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = React.useState<boolean[]>(Array(services.length).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    blockRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                if (prev[idx]) return prev;
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <Header />
      <style>{`
        .service-animate {
          opacity: 0;
          transform: translateX(0);
          transition: opacity 0.6s ease-in-out, transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .service-animate.in-view {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-from-right {
          transform: translateX(60px);
        }
        .slide-from-left {
          transform: translateX(-60px);
        }
      `}</style>
      <div className="min-h-screen bg-white py-16 pt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="container mx-auto px-4 text-center mb-16"
        >
          <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-black mb-6">
            Our Services
          </h1>
          <p className="font-source text-lg md:text-xl lg:text-2xl text-black max-w-3xl mx-auto">
            Comprehensive care tailored to restore your strength, mobility, and wellness.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 space-y-16 md:space-y-20">
          {services.map((service, idx) => {
            const direction = animationDirections[idx] === "right" ? "slide-from-right" : "slide-from-left";
            return (
              <div
                key={service.id}
                ref={el => (blockRefs.current[idx] = el)}
                className={`relative service-animate ${direction} ${visible[idx] ? "in-view" : ""}`}
                style={{ willChange: "opacity, transform" }}
              >
                {service.layout === 'left' ? (
                  /* Left Layout - Circle on left, content on right */
                  <div className="relative">
                    <div className="w-full h-80 md:h-96 lg:h-[410px] rounded-[150px] bg-gradient-to-r from-purple-200/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col md:flex-row items-center">
                      {/* Circle with image */}
                      <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-black flex-shrink-0 mb-8 md:mb-0 md:ml-8 lg:ml-12 overflow-hidden flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="object-cover w-full h-full"
                        />
                        {/* TODO: Replace src with actual image path for {service.title} */}
                      </div>
                      {/* Content */}
                      <div className="flex-1 px-4 md:px-8 lg:px-12 text-center md:text-left">
                        <h2 className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                          {service.title}
                        </h2>
                        <p className="font-source text-lg md:text-xl lg:text-2xl xl:text-3xl text-black mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        {/* Duration and Button Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <button className="px-8 py-3 bg-black text-white font-source text-lg md:text-xl rounded-xl hover:bg-gray-800 transition-colors">
                            Book Session
                          </button>
                          <div className="text-right">
                            <p className="font-source text-lg md:text-xl text-black">
                              {service.duration}
                            </p>
                            <p className="font-source text-lg md:text-xl text-black">
                              Based on Experts
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Right Layout - Content on left, circle on right */
                  <div className="relative">
                    <div className="w-full h-80 md:h-96 lg:h-[410px] rounded-[150px] bg-gradient-to-l from-purple-200/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col md:flex-row items-center">
                      {/* Content */}
                      <div className="flex-1 px-4 md:px-8 lg:px-12 text-center md:text-left order-2 md:order-1">
                        <h2 className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                          {service.title}
                        </h2>
                        <p className="font-source text-lg md:text-xl lg:text-2xl xl:text-3xl text-black mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        {/* Duration and Button Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <button className="px-8 py-3 bg-black text-white font-source text-lg md:text-xl rounded-xl hover:bg-gray-800 transition-colors">
                            Book Session
                          </button>
                          <div className="text-right">
                            <p className="font-source text-lg md:text-xl text-black">
                              {service.duration}
                            </p>
                            <p className="font-source text-lg md:text-xl text-black">
                              Based on Experts
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Circle with image */}
                      <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-black flex-shrink-0 mb-8 md:mb-0 md:mr-8 lg:mr-12 order-1 md:order-2 overflow-hidden flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="object-cover w-full h-full"
                        />
                        {/* TODO: Replace src with actual image path for {service.title} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}