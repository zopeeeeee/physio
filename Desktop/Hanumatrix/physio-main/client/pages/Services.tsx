import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
    // GSAP Parallax integration
    blockRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const bg = ref.querySelector('.service-bg');
      const img = ref.querySelector('.service-img');
      if (bg) {
        gsap.to(bg, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
      if (img) {
        gsap.to(img, {
          y: -20,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      ScrollTrigger.getAll().forEach(t => t.kill());
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
          transform: translateX(180px); /* Increased distance */
        }
        .slide-from-left {
          transform: translateX(-180px); /* Increased distance */
        }
        button.pressed {
          transform: scale(0.93);
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
        <div className="container mx-auto px-4 space-y-10 md:space-y-14">
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
                    <div className="service-bg w-full h-48 md:h-56 lg:h-64 rounded-[80px] bg-gradient-to-r from-purple-200/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col md:flex-row items-center">
                      {/* Circle with image */}
                      <div className="service-img w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black flex-shrink-0 mb-4 md:mb-0 md:ml-4 lg:ml-8 overflow-hidden flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 px-2 md:px-4 lg:px-6 text-center md:text-left">
                        <h2 className="font-playfair font-bold text-xl md:text-2xl lg:text-3xl text-black mb-3">
                          {service.title}
                        </h2>
                        <p className="font-source text-sm md:text-base lg:text-lg xl:text-xl text-black mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        {/* Duration and Button Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <button
                            className="px-4 py-2 bg-black text-white font-source text-base md:text-lg rounded-lg hover:bg-gray-800 transition-colors active:scale-95 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                            onClick={e => {
                              const btn = e.currentTarget;
                              btn.classList.add('pressed');
                              setTimeout(() => btn.classList.remove('pressed'), 180);
                            }}
                            style={{ transition: 'transform 0.15s cubic-bezier(.4,2,.3,1)' }}
                          >
                            Book Session
                          </button>
                          <div className="text-right">
                            <p className="font-source text-base md:text-lg text-black">
                              {service.duration}
                            </p>
                            <p className="font-source text-base md:text-lg text-black">
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
                    <div className="service-bg w-full h-48 md:h-56 lg:h-64 rounded-[80px] bg-gradient-to-l from-purple-200/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col md:flex-row items-center">
                      {/* Content */}
                      <div className="flex-1 px-2 md:px-4 lg:px-6 text-center md:text-left order-2 md:order-1">
                        <h2 className="font-playfair font-bold text-xl md:text-2xl lg:text-3xl text-black mb-3">
                          {service.title}
                        </h2>
                        <p className="font-source text-sm md:text-base lg:text-lg xl:text-xl text-black mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        {/* Duration and Button Row */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <button
                            className="px-4 py-2 bg-black text-white font-source text-base md:text-lg rounded-lg hover:bg-gray-800 transition-colors active:scale-95 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                            onClick={e => {
                              const btn = e.currentTarget;
                              btn.classList.add('pressed');
                              setTimeout(() => btn.classList.remove('pressed'), 180);
                            }}
                            style={{ transition: 'transform 0.15s cubic-bezier(.4,2,.3,1)' }}
                          >
                            Book Session
                          </button>
                          <div className="text-right">
                            <p className="font-source text-base md:text-lg text-black">
                              {service.duration}
                            </p>
                            <p className="font-source text-base md:text-lg text-black">
                              Based on Experts
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Circle with image */}
                      <div className="service-img w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black flex-shrink-0 mb-4 md:mb-0 md:mr-4 lg:mr-8 order-1 md:order-2 overflow-hidden flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ContactFooter />
    </>
  );
}