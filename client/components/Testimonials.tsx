import { useState } from 'react';
const testimonials = [
  {
    name: 'Amit Sharma',
    image: '/placeholder.svg',
    rating: 5,
    review: 'Amazing service! The staff is very professional and caring. I felt a significant improvement after just a few sessions.'
  },
  {
    name: 'Priya Patel',
    image: '/placeholder.svg',
    rating: 4,
    review: 'Professional staff and great facilities. Highly recommend!'
  },
  {
    name: 'Rahul Mehta',
    image: '/placeholder.svg',
    rating: 5,
    review: 'Personalized care and attention. I felt supported throughout.'
  },
  {
    name: 'Sneha Rao',
    image: '/placeholder.svg',
    rating: 5,
    review: 'The best physiotherapy center in Mumbai!'
  },
  {
    name: 'Vikram Singh',
    image: '/placeholder.svg',
    rating: 4,
    review: 'Great results and friendly staff.'
  },
];

export default function Testimonials() {
  // For hover-to-pause, track hovered row index
  const [pausedRow, setPausedRow] = useState<number|null>(null);
  // Helper to duplicate testimonials for seamless loop
  const getLooped = (arr: any[], count: number) => {
    const out = [];
    for (let i = 0; i < count; i++) out.push(...arr);
    return out;
  };
  return (
    <section className="w-full">
      {/* Top Section - The Flexrite Experience (White) */}
      <div className="bg-white w-full">
        <div className="py-16 lg:py-24 px-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="font-playfair font-bold text-black text-4xl lg:text-7xl mb-4">
              The Flexrite Experience
            </h2>
            <p className="font-playfair font-bold text-black text-lg lg:text-xl tracking-wide">
              FEEDBACKS THAT INSPIRS US
            </p>
          </div>
          {/* Experience Cards Row - Half White, Half Black */}
          <div className="relative mt-16" style={{minHeight: '22rem'}}>
            <div className="flex flex-row justify-center items-center gap-12 lg:gap-10 relative z-20 overflow-x-auto whitespace-nowrap hide-scrollbar">
              {[
                {
                  image: "/BT.avif",
                  name: "Bhavna Talwar",
                  designation: "Phantom Production",
                  review: "Flexrite World has been my top choice for years. Whether it's any time, they are my first call."
                },
                {
                  image: "/JB.avif",
                  name: "Jaya Bhattacharya",
                  designation: "Actor",
                  review: "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch. "
                },
                {
                  image: "/CH.avif",
                  name: "Chandrakant Handore",
                  designation: "Member of Parliament",
                  review: "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief."
                },
                {
                  image: "/AM.avif",
                  name: "Anupam Mittal",
                  designation: "Investor",
                  review: "Priyanka excels at her work; bring your loved ones to Flexrite. Health is biggest investment."
                },
                {
                  image: "/AB.avif",
                  name: "Abhishek Bachchan",
                  designation: "Actor",
                  review: "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest."
                }
              ].map((person, index) => (
                <div key={index} className="flex flex-col">
                  <div className="bg-gray-100 rounded-3xl p-6 lg:p-6 min-h-[340px] lg:min-h-[400px] w-[180px] lg:w-[220px] flex flex-col items-center">
                    {/* Profile Image */}
                    <img src={person.image} alt={person.name} className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover mb-4 mt-2 border-4 border-purple-200 bg-purple-100" />
                    {/* Name */}
                    <div className="text-black font-bold text-sm lg:text-base mb-1 text-center">{person.name}</div>
                    {/* Designation */}
                    <div className="text-purple-700 text-xs lg:text-sm text-center m-0">{person.designation}</div>
                    {/* Review Text */}
                    <div className="text-black text-xs lg:text-sm leading-snug break-words whitespace-normal text-center m-0 -mt-1">{person.review}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - What Clients Are Saying (Black) */}
      <div className="bg-black w-full">
        <div className="py-16 lg:py-24 px-0 w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-white text-4xl lg:text-7xl leading-tight">
              What Clients Are<br />Saying ?
            </h2>
          </div>
          {/* Testimonial Cards Carousel - 3 rows, horizontal scroll */}
          <div className="space-y-8 w-full px-0">
            {/* Row 1 - left to right */}
            <div
              className="relative w-full overflow-hidden group"
              onMouseEnter={() => setPausedRow(0)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {/* Fade overlays */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to right, #000 60%, transparent 100%)'}}></div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to left, #000 60%, transparent 100%)'}}></div>
              <div
                className={`flex gap-6 whitespace-nowrap hide-scrollbar animate-marquee-smooth`}
                style={pausedRow === 0 ? { animationPlayState: 'paused' } : {}}
              >
                {getLooped(testimonials, 2).map((t, i) => (
                  <TestimonialCard key={i} showProfile={true} className="inline-block" testimonial={t} />
                ))}
              </div>
            </div>
            {/* Row 2 - right to left */}
            <div
              className="relative w-full overflow-hidden group"
              onMouseEnter={() => setPausedRow(1)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {/* Fade overlays */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to right, #000 60%, transparent 100%)'}}></div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to left, #000 60%, transparent 100%)'}}></div>
              <div
                className={`flex gap-6 whitespace-nowrap hide-scrollbar animate-marquee-reverse-smooth`}
                style={pausedRow === 1 ? { animationPlayState: 'paused' } : {}}
              >
                {getLooped(testimonials, 2).map((t, i) => (
                  <TestimonialCard key={i} showProfile={true} className="inline-block" testimonial={t} />
                ))}
              </div>
            </div>
            {/* Row 3 - left to right */}
            <div
              className="relative w-full overflow-hidden group"
              onMouseEnter={() => setPausedRow(2)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {/* Fade overlays */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to right, #000 60%, transparent 100%)'}}></div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-30" style={{background: 'linear-gradient(to left, #000 60%, transparent 100%)'}}></div>
              <div
                className={`flex gap-6 whitespace-nowrap hide-scrollbar animate-marquee-smooth`}
                style={pausedRow === 2 ? { animationPlayState: 'paused' } : {}}
              >
                {getLooped(testimonials, 2).map((t, i) => (
                  <TestimonialCard key={i} showProfile={true} className="inline-block" testimonial={t} />
                ))}
              </div>
            </div>
            {/* Marquee CSS */}
            <style>{`
              @keyframes marquee-smooth {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes marquee-reverse-smooth {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .animate-marquee-smooth {
                animation: marquee-smooth 22s linear infinite;
                animation-play-state: running;
              }
              .animate-marquee-reverse-smooth {
                animation: marquee-reverse-smooth 22s linear infinite;
                animation-play-state: running;
              }
              .hide-scrollbar {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ showProfile, className = "", testimonial }: { showProfile: boolean, className?: string, testimonial: any }) {
  return (
    <div className={`bg-black border border-white rounded-[43px] p-6 h-[185px] flex items-center gap-6 min-w-[350px] ${className}`}>
      {/* Profile Circle - Only show if showProfile is true */}
      {showProfile && (
        <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0 bg-purple-200" />
      )}
      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        {/* Name */}
        <div className="text-white font-bold text-lg mb-1 truncate">{testimonial.name}</div>
        {/* Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">★</span>
          ))}
          {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
            <span key={i} className="text-gray-600 text-xl">★</span>
          ))}
        </div>
        {/* Review Text */}
        <div className="text-white text-base leading-snug break-words whitespace-normal">{testimonial.review}</div>
      </div>
    </div>
  );
}
