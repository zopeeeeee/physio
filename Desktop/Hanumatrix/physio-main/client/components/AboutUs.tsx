import { useRef, useEffect } from 'react';

export default function AboutUs() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const content = contentRef.current;
    const section = sectionRef.current;
    if (!bg || !content || !section) return;

    const baseWidth = bg.offsetWidth;
    const baseSize = 1 * baseWidth;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1
      );

      if (rect.top <= 0) {
        const scrollY = Math.abs(rect.top);

        const newSize = baseSize + scrollY * 2.5;
        const blur = scrollY > 100 ? (scrollY - 100) / 20 : 0;
        const opacity = 1 - scrollY / 1000;
        const textScale = 1 + scrollY / 1200;

        bg.style.backgroundSize = `${newSize}px`;
        bg.style.filter = `blur(${blur}px)`;
        bg.style.opacity = `${opacity}`;
        content.style.transform = `scale(${textScale})`;
      } else {
        bg.style.backgroundSize = `${baseSize}px`;
        bg.style.filter = 'blur(0px)';
        bg.style.opacity = '1';
        content.style.transform = 'scale(1)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[1800px] py-48 px-6 lg:px-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background image container */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ background: 'black' }}
      >
        <img
          src="/about.avif"
          alt="About Us Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
      </div>

      {/* Foreground content in a 3-column centered layout */}
      <div className="relative z-10 w-full grid grid-cols-3">
        {/* Left empty column */}
        <div></div>

        {/* Middle column with centered text */}
        <div
          ref={contentRef}
          className="flex flex-col items-center justify-center mt-10 lg:mt-32 text-center"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <div className="mb-8">
            <span className="text-sm text-gray-400 tracking-widest font-bold">
              OUR STORY
            </span>
          </div>
          <h2 className="font-bold text-3xl lg:text-4xl leading-tight mb-4">
            Your health is our mission—helping you move better, recover faster,
            and enjoy a vibrant lifestyle.
          </h2>
          <h3 className="text-purple-200 font-bold text-2xl lg:text-3xl mb-4">
            Stronger, Healthier, Happier
          </h3>
          <p className="text-lg leading-relaxed mb-8">
            Flexrite World is a health and wellness center in Mumbai,
            specializing in physiotherapy. Our mission is to help people live
            active, pain-free lives by providing personalized care for recovery,
            pain management, and improved performance. With expert guidance and
            tailored programs, we support every step of your wellness journey
            toward strength, vitality, and joy.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 justify-center">
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm">Completed Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold">15K</p>
              <p className="text-sm">Years Of Mastery</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm">Satisfied Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">45+</p>
              <p className="text-sm">Worldwide Honors</p>
            </div>
          </div>

          <div className="flex items-center gap-6 justify-center">
            <div className="flex -space-x-4">
              <img
                src="/das.jpg"
                className="w-14 h-14 rounded-full border-2 border-white"
              />
              <img
                src="/Gupta.avif"
                className="w-14 h-14 rounded-full border-2 border-white"
              />
              <img
                src="/Nandi.avif"
                className="w-14 h-14 rounded-full border-2 border-white"
              />
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
              <div className="w-14 h-14 bg-black border border-purple-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 19V5l11 7-11 7z" />
                </svg>
              </div>
              <span className="text-sm font-bold">WATCH INTRO</span>
            </div>
          </div>
        </div>

        {/* Right empty column */}
        <div></div>
      </div>
    </section>
  );
}
