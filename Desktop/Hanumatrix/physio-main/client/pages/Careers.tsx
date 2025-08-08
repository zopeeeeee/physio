import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import { motion } from "framer-motion";

type JobCategory = 'all' | 'receptionist' | 'professionals' | 'creative' | 'sound' | 'physiotherapy' | 'massage';

interface Job {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Receptionist',
    description: 'Proficiency in basic computer skills and Microsoft Excel.\nStrong communication and organizational abilities.',
    category: 'receptionist'
  },
  {
    id: '2',
    title: 'Corporate Professionals',
    description: 'Corporate lawyers skilled in legal matters and compliance.\nChartered accountants for financial planning, auditing, and tax management.',
    category: 'professionals'
  },
  {
    id: '3',
    title: 'Creative Specialists',
    description: 'Photo and video editors with expertise in tools like Photoshop and Adobe Premiere Pro.\nContent creators for engaging health and wellness content.',
    category: 'creative'
  },
  {
    id: '4',
    title: 'Sound & Music Experts',
    description: 'Sound engineers skilled in recording, mixing, and mastering.\nVocalists, instrumentalists, and music trainers for wellness-focused programs.',
    category: 'sound'
  },
  {
    id: '5',
    title: 'Physiotherapy Specialists',
    description: 'Licensed physiotherapists experienced in pain management and rehabilitation.',
    category: 'physiotherapy'
  },
  {
    id: '6',
    title: 'Massage Therapists',
    description: 'Skilled male and female professionals for therapeutic and wellness massages.',
    category: 'massage'
  },
  {
    id: '7',
    title: 'Doctors (Physiotherapy-related Fields)',
    description: 'Specialists in sports medicine, orthopedic rehabilitation, and diagnostics.',
    category: 'physiotherapy'
  },
  {
    id: '8',
    title: 'Yoga & Wellness Experts',
    description: 'Professionals in yoga, meditation, and holistic therapies to complement physiotherapy services.',
    category: 'physiotherapy'
  },
  {
    id: '9',
    title: 'Administrative Professionals',
    description: 'Experts in operations, scheduling, and client management to ensure smooth workflows.',
    category: 'professionals'
  },
  {
    id: '10',
    title: 'Healthcare Technicians',
    description: 'Specialists in managing physiotherapy and rehabilitation equipment.',
    category: 'physiotherapy'
  }
];

const categories = [
  { id: 'all', label: 'View all' },
  { id: 'receptionist', label: 'Receptionist' },
  { id: 'professionals', label: 'Professionals' },
  { id: 'creative', label: 'Creative' },
  { id: 'sound', label: 'Sound & Music' },
  { id: 'physiotherapy', label: 'Physiotherapy' },
  { id: 'massage', label: 'Massage Therapists' }
];

export default function Careers() {
  const [activeCategory, setActiveCategory] = useState<JobCategory>('all');
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // Animate header on mount
    const timeout = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const filteredJobs = activeCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  const ArrowIcon = () => (
    <svg 
      width="47" 
      height="43" 
      viewBox="0 0 68 62" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 transform rotate-45"
    >
      <path 
        d="M38.4795 24.0824L22.8352 24.7043L23.0685 21.1205L45.4174 20.2321L44.2942 40.5219L40.3464 40.7105L41.1327 26.5076L23.2718 42.6228L20.6186 40.1976L38.4795 24.0824Z" 
        fill="#1D1B20"
      />
    </svg>
  );

  return (
    <>
      <Header />
      <style>{`
        .careers-header-animate {
          opacity: 0;
          transform: translateY(-32px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .careers-header-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="min-h-screen bg-white pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Hero Section */}
          <div className="container mx-auto px-4 pt-16 pb-8">
            {/* We're hiring badge */}
            <motion.div
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full mb-8 group cursor-pointer"
            >
              <span className="font-source font-bold text-base text-black group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 transition-all duration-200">
                We're hiring!
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`font-playfair font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black mb-8 leading-tight max-w-4xl careers-header-animate${headerVisible ? ' visible' : ''} relative group cursor-pointer`}
            >
              Be part of our mission
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="font-source font-semibold text-lg md:text-xl text-black mb-12 max-w-3xl leading-relaxed relative group cursor-pointer"
            >
              We're looking for passionate people to join us on our mission. Wee value
              flat hierarchies, clear communication, and full ownership and responsibility.
            </motion.p>

            {/* Filter buttons */}
            <motion.div
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap gap-3 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as JobCategory)}
                  className={`px-6 py-3 rounded-full border-2 border-black font-source font-bold text-base relative group cursor-pointer transition-all duration-200 ${
                    activeCategory === category.id || (activeCategory === 'all' && category.id === 'all')
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 transition-all duration-200">
                    {category.label}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Job listings */}
          <div className="container mx-auto px-4">
            <div className="space-y-0">
              {filteredJobs.map((job, index) => (
                <div key={job.id}>
                  {/* Job item */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between py-8 md:py-12">
                    <div className="flex-1 pr-8">
                      <h2 className="font-source font-semibold text-3xl md:text-4xl text-black mb-6 transition-all duration-200 cursor-pointer relative group">
                        <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 transition-all duration-200">
                          {job.title}
                        </span>
                      </h2>
                      <div className="ml-8 md:ml-12">
                        {job.description.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="font-source text-xl md:text-2xl text-black mb-2">
                            • {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    {/* Apply button */}
                    <div className="flex items-center gap-4 mt-6 md:mt-0 md:ml-8">
                      <button className="font-source font-semibold text-3xl md:text-4xl text-black hover:text-gray-700 transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-black">
                        <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 transition-all duration-200">Apply</span>
                      </button>
                      <ArrowIcon />
                    </div>
                  </div>
                  {/* Divider - don't show after last item */}
                  {index < filteredJobs.length - 1 && (
                    <div className="w-full h-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Walk-Ins Interview Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="w-full h-px bg-gray-300 mb-12"></div>
            <h2 className="font-source font-bold text-4xl md:text-5xl text-gray-900 mb-8">
              Walk-Ins Interview
            </h2>
            <div className="font-source text-xl md:text-2xl text-black leading-relaxed space-y-4">
              <p>
                <strong>Location:</strong> Andheri West Office, Mumbai
              </p>
              <p>
                Send your CV to <span className="underline">team@flexriteworld.org</span> with qualifications, experience, and relevant links (social media and portfolios).
              </p>
              <p>
                Shortlisted candidates will be contacted via our official email, landline, or WhatsApp only for interview details.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <ContactFooter />
    </>
  );
}
