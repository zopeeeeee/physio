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
  
  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('4th July, Monday');
  const [selectedTime, setSelectedTime] = useState('6:30 PM');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showKnowledgeOverlay, setShowKnowledgeOverlay] = useState(false);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  
  // Doctors data for carousel
  const doctors = [
    { name: 'Dr. Sarah Johnson', image: '/das.jpg', linkedin: '#', instagram: '#', twitter: '#' },
    { name: 'Dr. Michael Chen', image: '/doe.jpg', linkedin: '#', instagram: '#', twitter: '#' },
    { name: 'Dr. Emily Rodriguez', image: '/reddy.jpg', linkedin: '#', instagram: '#', twitter: '#' }
  ];
  
  // Handle carousel navigation
  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    if (showBookingModal) {
      const interval = setInterval(nextDoctor, 1500);
      return () => clearInterval(interval);
    }
  }, [showBookingModal, currentDoctorIndex]);

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

  // Close modal and reset states
  const closeBookingModal = () => {
    setShowBookingModal(false);
    setShowServiceDropdown(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowKnowledgeOverlay(false);
  };

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
                              setShowBookingModal(true);
                              setSelectedService(service.title);
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
                              setShowBookingModal(true);
                              setSelectedService(service.title);
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
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ backgroundColor: 'rgba(60, 60, 60, 0.9)' }}>
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button 
              onClick={closeBookingModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              title="Close booking modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Grid layout */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Card 1: Visit Type and Date (Green) */}
              <div 
                className="bg-[#3CBD72] rounded-xl p-6 flex flex-col transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg"
                style={{ minHeight: '280px' }}
              >
                <h2 className="text-white text-lg font-medium mb-6">visit type<br />and date</h2>
                
                {/* Service Type Row */}
                <div 
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                >
                  <div>
                    <p className="text-[#B5B5B5] text-sm">type:</p>
                    <p className="text-white">{selectedService || 'general consultation'}</p>
                  </div>
                  <div className={`transition-transform duration-300 ${showServiceDropdown ? 'translate-x-1' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Service Dropdown */}
                {showServiceDropdown && (
                  <div className="bg-white rounded-lg p-3 mb-4 shadow-lg animate-fadeIn">
                    {services.map(service => (
                      <div 
                        key={service.id}
                        className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedService(service.title);
                          setShowServiceDropdown(false);
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Date Row */}
                <div 
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <div>
                    <p className="text-[#B5B5B5] text-sm">date:</p>
                    <p className="text-white">{selectedDate}</p>
                  </div>
                  <div className={`transition-transform duration-300 ${showDatePicker ? 'translate-x-1' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Enhanced Date Picker with Calendar */}
                {showDatePicker && (
                  <div className="bg-white rounded-lg p-3 mb-4 shadow-lg animate-fadeIn">
                    <div className="mb-2 text-sm text-gray-600 font-medium">Select a date:</div>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                      title="Select appointment date"
                      placeholder="Select date"
                      aria-label="Select appointment date"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formattedDate = date.toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          weekday: 'long',
                          year: 'numeric'
                        });
                        setSelectedDate(formattedDate);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                )}
                
                {/* Time Row */}
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setShowTimePicker(!showTimePicker)}
                >
                  <div>
                    <p className="text-[#B5B5B5] text-sm">time:</p>
                    <p className="text-white">{selectedTime}</p>
                  </div>
                  <div className={`transition-transform duration-300 ${showTimePicker ? 'translate-x-1' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Enhanced Time Picker */}
                {showTimePicker && (
                  <div className="bg-white rounded-lg p-3 mt-4 shadow-lg animate-fadeIn">
                    <div className="mb-2 text-sm text-gray-600 font-medium">Select a time:</div>
                    <input 
                      type="time" 
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Select appointment time"
                      placeholder="Select time"
                      aria-label="Select appointment time"
                      onChange={(e) => {
                        const timeValue = e.target.value;
                        const [hours, minutes] = timeValue.split(':');
                        const date = new Date();
                        date.setHours(parseInt(hours));
                        date.setMinutes(parseInt(minutes));
                        const formattedTime = date.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        });
                        setSelectedTime(formattedTime);
                        setShowTimePicker(false);
                      }}
                    />
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 mb-1">Quick select:</div>
                      <div className="grid grid-cols-3 gap-1">
                        {['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:30 PM'].map(time => (
                          <div 
                            key={time}
                            className="py-1 px-2 text-sm hover:bg-gray-100 rounded cursor-pointer transition-colors text-center"
                            onClick={() => {
                              setSelectedTime(time);
                              setShowTimePicker(false);
                            }}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button 
                  className="w-full mt-6 bg-white text-[#4AC2E0] py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => {
                    // Handle appointment submission
                    alert(`Appointment confirmed!\n\nService: ${selectedService}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
                    closeBookingModal();
                  }}
                >
                  Confirm Appointment
                </button>
              </div>
              
              {/* Card 2: Knowledge Base (Blue) */}
              <div 
                className="bg-[#4AC2E0] rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.03] hover:brightness-105 relative overflow-hidden"
                style={{ minHeight: '280px' }}
              >
                <h2 className="text-white text-lg font-medium mb-4">knowledge base</h2>
                
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-3">Health Tips</h3>
                  <p className="text-white">
                    Regular exercise, balanced nutrition, adequate sleep, and stress management are the cornerstones of good health. Our experts provide personalized care plans to help you achieve optimal wellness.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 3: Meet Our Experts (Image) - Full Width */}
            <div 
              className="bg-gray-800 rounded-xl overflow-hidden relative group"
              style={{ height: '320px' }}
            >
              {/* Doctor Carousel */}
              <div className="absolute inset-0 transition-all duration-600 ease-in-out">
                {doctors.map((doctor, index) => (
                  <div 
                    key={doctor.name}
                    className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${currentDoctorIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    
                    {/* Doctor Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg font-medium mb-2">{doctor.name}</h3>
                      <div className="flex space-x-4">
                        <a href={doctor.linkedin} className="text-white hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a href={doctor.instagram} className="text-white hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </a>
                        <a href={doctor.twitter} className="text-white hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Overlay Content and Navigation */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <h2 className="text-white text-lg font-medium">meet our experts</h2>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center cursor-pointer group" onClick={nextDoctor}>
                    <span className="text-white mr-2 text-sm font-medium">discover</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Carousel Navigation Dots */}
                  <div className="flex space-x-2">
                    {doctors.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDoctorIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentDoctorIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                        title={`View doctor ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}