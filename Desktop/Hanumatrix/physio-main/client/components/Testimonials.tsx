
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


interface CardData {
  id: string
  imageSrc: string // Place your celebrity images in /public/images and set e.g. "/images/bhavna.jpg"
  quote: string
  author: string
  company: string
}

/*
Where to add celebrity images:
- Place files in /public/images (e.g., /public/images/bhavna.jpg)
- Set imageSrc in cards[] to "/images/bhavna.jpg"
*/
const cards: CardData[] = [
  {
    id: "1",
    imageSrc: "/placeholder.svg?height=800&width=800",
    quote:
      "Flexrite World has been my top choice for years. Whether it's any time, they are my first call.",
    author: "Bhavna Talwar",
    company: "Phantom Production",
  },
  {
    id: "2",
    imageSrc: "/placeholder.svg?height=800&width=800",
    quote:
      "Flexrite World offers the fastest pain relief, and I believe the doctors there have a magical touch. I can vouch.",
    author: "Jaya Bhattacharya",
    company: "Actor",
  },
  {
    id: "3",
    imageSrc: "/placeholder.svg?height=800&width=800",
    quote:
      "After collaborating with many physiotherapy institutes, I can say Flexrite World offers the best pain relief.",
    author: "Chandrakant Handore",
    company: "Member of Parliament",
  },
  {
    id: "4",
    imageSrc: "/placeholder.svg?height=800&width=800",
    quote:
      "Priyanka excels at her work; bring your loved ones to Flexrite. Health is biggest investment.",
    author: "Anupam Mittal",
    company: "Investor",
  },
  {
    id: "5",
    imageSrc: "/placeholder.svg?height=800&width=800",
    quote:
      "Experiencing healing at Flexrite World is essential on my agenda, right alongside refreshments and rest.",
    author: "Abhishek Bachchan",
    company: "Actor",
  },
]

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Card sizing (reduced height as requested previously)
  const cardWidth = 680
  const cardHeight = 410
  const stackGap = 96 // visible portion shift in the centered stack

  const numCards = cards.length

  // Timeline in "segments":
  // - stackSegments: each card enters = numCards segments
  // - dwellSegments: small pause after complete stack (so 5th settles) before exits start
  // - exitSegments: all cards leave together = 1 segment
  const stackSegments = numCards
  const dwellSegments = 1 // 1 segment for a clear pause
  const exitSegments = 1 // all cards leave together
  const totalSegments = stackSegments + dwellSegments + exitSegments
  const segmentSize = 1 / totalSegments

  // Anchors for user-friendly navigation:
  // Only keep stacking and exit anchors
  const anchors = useMemo(() => {
    const a: number[] = []
    // End of stacking (all cards stacked)
    a.push(stackSegments * segmentSize)
    // Start of exit (all cards leave together)
    a.push((stackSegments + dwellSegments) * segmentSize)
    return a
  }, [stackSegments, dwellSegments, segmentSize])

  // Build breakpoints for segment-local progress: [0, ...anchors, 1]
  const breakpoints = useMemo(() => [0, ...anchors, 1], [anchors])

  // Total scrollable height (fixes Tailwind arbitrary height bug by using style)
  const totalHeightVh = totalSegments * 100

  // For reversed stack positioning:
  const totalStackWidth = cardWidth + (numCards - 1) * stackGap

  // Which anchor are we closest to? Drives arrows and keyboard UX
  const [activeStep, setActiveStep] = useState(0)

  // For the floating chip: segment-local progress [0..1] and display step number
  const [segmentProgress, setSegmentProgress] = useState(0)
  const [chipStep, setChipStep] = useState(1) // 1..anchors.length

  const findClosestAnchorIndex = (t: number) => {
    let idx = 0
    let best = Infinity
    for (let i = 0; i < anchors.length; i++) {
      const d = Math.abs(t - anchors[i])
      if (d < best) {
        best = d
        idx = i
      }
    }
    return idx
  }

  useMotionValueEvent(scrollYProgress, "change", (t) => {
    // 1) Existing: nearest anchor for arrows
    setActiveStep(findClosestAnchorIndex(t))

    // 2) Segment-local progress between breakpoints
    let k = 0
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (t >= breakpoints[i] && t <= breakpoints[i + 1]) {
        k = i
        break
      }
    }
    const start = breakpoints[k]
    const end = breakpoints[k + 1]
    const denom = Math.max(end - start, 0.000001)
    const local = (t - start) / denom
    setSegmentProgress(Math.min(1, Math.max(0, local)))

    // 3) Chip step number: map segment index to next anchor index (1..anchors.length)
    // k==0 (before first anchor) -> 1, k in [1..anchors.length] -> clamp to 1..anchors.length
    const display = Math.min(anchors.length, Math.max(1, k))
    setChipStep(display)
  })

  // Smooth step navigation
  const scrollToStep = (index: number) => {
    const clamped = Math.max(0, Math.min(anchors.length - 1, index))
    const targetProgress = anchors[clamped]
    const totalPx = totalSegments * window.innerHeight
    window.scrollTo({ top: targetProgress * totalPx, behavior: "smooth" })
  }

  // Keyboard navigation: Left/Right + Home/End
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollToStep(activeStep + 1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollToStep(activeStep - 1)
      } else if (e.key === "Home") {
        e.preventDefault()
        scrollToStep(0)
      } else if (e.key === "End") {
        e.preventDefault()
        scrollToStep(anchors.length - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeStep, anchors.length])

  // Ring geometry
  const R = 9
  const CIRC = 2 * Math.PI * R
  const dashOffset = CIRC * (1 - segmentProgress)

  return (
    <>
      {/* Top Section: Animated Stack */}
      <div
        ref={containerRef}
        style={{ height: `${totalHeightVh}vh` }}
        className="bg-white font-sans"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            className="relative w-full max-w-[1600px] h-[480px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Floating progress chip (decorative, non-interactive) */}
            <div
              className="absolute top-4 right-4 z-30 select-none"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-md border border-black/[0.06]">
                <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0">
                  {/* Track */}
                  <circle
                    cx="12"
                    cy="12"
                    r={R}
                    fill="none"
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="2"
                  />
                  {/* Progress */}
                  <circle
                    cx="12"
                    cy="12"
                    r={R}
                    fill="none"
                    stroke="rgb(239,68,68)" // red-500 accent to match pagination
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 12 12)"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-800">{`Step ${chipStep}/${anchors.length}`}</span>
              </div>
            </div>

            {cards.map((card, index) => {
              // REVERSED STACK POSITIONS:
              // After fully stacked, card 1 is right/front, 2 next left, ... 5 left/back.
              const reversedIndex = numCards - 1 - index
              const stackedX =
                -(totalStackWidth / 2) + cardWidth / 2 + reversedIndex * stackGap

              // Entry timings: original order (1..5)
              const entryStart = index * segmentSize;
              const entryEnd = (index + 1) * segmentSize;

              // Exit timings: all cards slide out together after dwell
              const exitStart = (stackSegments + dwellSegments) * segmentSize;
              const exitEnd = (stackSegments + dwellSegments + 1) * segmentSize;

              const inputRange = [entryStart, entryEnd, exitStart, exitEnd];

              // Off-screen bounds
              const offRight = cardWidth * 1.6;
              const offLeft = -cardWidth * 1.6;

              // Motion transforms (all cards leave together)
              const x = useTransform(scrollYProgress, inputRange, [
                offRight, // enter from right
                stackedX, // settle in stack
                stackedX, // hold (includes dwell at stack completion)
                offLeft, // all leave together
              ]);
              const opacity = useTransform(scrollYProgress, inputRange, [0, 1, 1, 0]);
              const scale = useTransform(scrollYProgress, inputRange, [0.96, 1, 1, 0.96]);
              const rotateY = useTransform(scrollYProgress, inputRange, [3, 0, 0, -3]);

              // Layering: ensure card 1 appears on top within the stack
              const zStatic = numCards - reversedIndex;

              return (
                <motion.div
                  key={card.id}
                  className="absolute bg-white rounded-[16px] overflow-hidden"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    left: "50%",
                    marginLeft: `-${cardWidth / 2}px`,
                    transformOrigin: "center",
                    x,
                    opacity,
                    scale,
                    rotateY,
                    zIndex: zStatic,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex h-full">
                    {/* IMAGE LEFT */}
                    <div className="relative w-1/2 h-full bg-gray-100">
                      <img
                        src={card.imageSrc || "/placeholder.svg"}
                        alt={card.author}
                        width={900}
                        height={900}
                        className="h-full w-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />

                      {/* Arrows (unchanged) */}
                      <div className="absolute bottom-4 right-4 flex gap-3">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Move to previous anchor
                            const prev = Math.max(0, activeStep - 1);
                            const totalPx = totalSegments * window.innerHeight;
                            window.scrollTo({ top: anchors[prev] * totalPx, behavior: "smooth" });
                          }}
                          disabled={activeStep <= 0}
                          className={`h-12 w-12 rounded-full grid place-items-center shadow-md transition-colors ${
                            activeStep <= 0
                              ? "bg-white/70 text-gray-400 cursor-not-allowed"
                              : "bg-white text-black hover:bg-white"
                          }`}
                          aria-label="Previous"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Move to next anchor
                            const next = Math.min(anchors.length - 1, activeStep + 1);
                            const totalPx = totalSegments * window.innerHeight;
                            window.scrollTo({ top: anchors[next] * totalPx, behavior: "smooth" });
                          }}
                          disabled={activeStep >= anchors.length - 1}
                          className={`h-12 w-12 rounded-full grid place-items-center shadow-md transition-colors ${
                            activeStep >= anchors.length - 1
                              ? "bg-white/70 text-gray-400 cursor-not-allowed"
                              : "bg-white text-black hover:bg-white"
                          }`}
                          aria-label="Next"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* TEXT RIGHT */}
                    <div className="w-1/2 h-full px-10 py-8 flex flex-col">
                      {/* Pagination 1/5, 2/5, ... */}
                      <div className="ml-auto text-sm font-semibold text-red-500">
                        {`${index + 1}/${numCards}`}
                      </div>

                      {/* Quote */}
                      <p className="mt-6 text-[20px] leading-8 text-black font-sans">
                        {card.quote}
                      </p>

                      {/* Author block */}
                      <div className="mt-auto pt-6">
                        <div className="w-12 h-[2px] bg-gray-300 mb-3" />
                        <p className="text-lg font-semibold text-black font-serif">
                          {card.author}
                        </p>
                        <p className="text-sm text-gray-600 font-sans">{card.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Bottom Section: What Clients Are Saying Carousel */}
      <BottomTestimonials />
    </>
  )
}
// Bottom Section Carousel Component
// ...existing code...
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

function BottomTestimonials() {
  const [pausedRow, setPausedRow] = useState<number|null>(null);
  const getLooped = (arr: any[], count: number) => {
    const out = [];
    for (let i = 0; i < count; i++) out.push(...arr);
    return out;
  };
  return (
    <div className="bg-black w-full">
      <div className="py-16 lg:py-24 px-0 w-full">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-white text-4xl lg:text-7xl leading-tight">
            What Clients Are<br />Saying ?
          </h2>
        </div>
        <div className="space-y-8 w-full px-0">
          {/* Row 1 - left to right */}
          <div
            className="relative w-full overflow-hidden group"
            onMouseEnter={() => setPausedRow(0)}
            onMouseLeave={() => setPausedRow(null)}
          >
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
