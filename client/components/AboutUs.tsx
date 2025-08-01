export default function AboutUs() {
  return (
    <section className="bg-black py-16 lg:py-24 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Side - Image Placeholder */}
          <div className="lg:col-span-5">
            <div className="bg-gray-300 aspect-[4/5] w-full rounded-lg"></div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-7 lg:pl-2">
            {/* Story Header */}
            <div className="relative mb-8">
              {/* Gradient line absolutely aligned to the left of the text block, more visible */}
              <div className="flex items-center gap-4 pl-10">
                <span className="font-source font-bold text-gray-400 text-sm tracking-wide">OUR STORY</span>
                <div className="flex items-center">
                  <div className="w-8 h-px bg-gray-400"></div>
                  <svg 
                    className="w-4 h-4 ml-1 text-gray-400" 
                    fill="currentColor" 
                    viewBox="0 0 8 22"
                  >
                    <path d="M3.76122 21.8188C3.95649 22.0141 4.27307 22.0141 4.46833 21.8188L7.65031 18.6369C7.84557 18.4416 7.84557 18.125 7.65031 17.9298C7.45505 17.7345 7.13847 17.7345 6.9432 17.9298L4.11478 20.7582L1.28635 17.9298C1.09109 17.7345 0.774505 17.7345 0.579243 17.9298C0.383981 18.125 0.383981 18.4416 0.579243 18.6369L3.76122 21.8188ZM4.11478 -0.00162506L3.61478 -0.00162506L3.61478 21.4653H4.11478H4.61478L4.61478 -0.00162506L4.11478 -0.00162506Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-8">
              <div className="flex items-start relative">
                <div className="relative flex-shrink-0 mr-4 mt-2">
                  <div className="w-6 h-60 bg-gradient-to-b from-purple-200 to-transparent opacity-70"></div>
                </div>
                <div>
                  <h2 className="font-playfair font-bold text-white text-2xl lg:text-3xl xl:text-4xl leading-tight mb-4">
                    Your health is our mission—helping you move better, recover faster, and enjoy a vibrant lifestyle.
                  </h2>
                  <h3 className="font-playfair font-bold text-purple-200 text-2xl lg:text-3xl xl:text-4xl">
                    Stronger, Healthier, Happier
                  </h3>
                  {/* Description */}
                  <h4 className="font-source text-white text-base lg:text-lg leading-relaxed mb-12 mt-4">
                    Flexrite World is a health and wellness center in Mumbai, specializing in physiotherapy. Our mission is to help people live active, pain-free lives by providing personalized care for recovery, pain management, and improved performance. With expert guidance and tailored programs, we support every step of your wellness journey toward strength, vitality, and joy.
                  </h4>

                </div>
              </div>
            </div>

           
            
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center lg:text-left">
                <div className="font-source font-bold text-white text-3xl lg:text-4xl mb-2">10K+</div>
                <div className="font-source font-bold text-white text-sm">Completed Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-source font-bold text-white text-3xl lg:text-4xl mb-2">15K</div>
                <div className="font-source font-bold text-white text-sm">Years Of Mastery</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-source font-bold text-white text-3xl lg:text-4xl mb-2">10K+</div>
                <div className="font-source font-bold text-white text-sm">Satisfied Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-source font-bold text-white text-3xl lg:text-4xl mb-2">45+</div>
                <div className="font-source font-bold text-white text-sm">Worldwide Honors</div>
              </div>
            </div>

            {/* Bottom Section with Circles and Watch Intro */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {/* Testimonial Circles */}
              <div className="flex -space-x-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-flexrite-gray-light rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                  <img src="/placeholder.svg" alt="User 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-flexrite-gray-light rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                  <img src="/placeholder.svg" alt="User 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-flexrite-gray-light rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                  <img src="/placeholder.svg" alt="User 3" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Watch Intro Button */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-black border border-purple-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors">
                  <svg 
                    className="w-6 h-6 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 19V5l11 7-11 7z" />
                  </svg>
                </div>
                <span className="font-source font-bold text-white text-sm tracking-wide">WATCH INTRO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
