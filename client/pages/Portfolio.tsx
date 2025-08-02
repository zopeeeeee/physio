import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";


export default function Portfolio() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 mt-24 mb-16">
        {/* Profile Section */}
        <section className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-20">
          {/* Profile Image Placeholder */}
          <div className="w-full lg:w-[427px] h-[150px] lg:h-[300px] rounded-[52px] flex-shrink-0 overflow-hidden mt-11">
            <img src="/Port1.avif" alt="Mrs. Kavita Nim" className="w-full h-full object-cover" />
          </div>

          {/* Profile Content */}
          <div className="flex-1 lg:pt-8">
            <h2 className="font-playfair text-5xl lg:text-[70px] text-black leading-none mb-4">Mrs. Kavita Nim</h2>
            <p className="font-itim text-lg lg:text-[22px] text-black mb-6 lg:mb-8">Sports Massage Therapist at Flexrite World (Through Oxid Wellness)</p>
            <p className="font-montserrat text-sm lg:text-base text-black leading-relaxed lg:max-w-[635px]">
              With over 20 years of hands-on experience, Mrs. Kavita Nim is a seasoned sports massage therapist known for her specialized expertise in enhancing athletic recovery and performance. She has provided therapy support at numerous high-profile tournaments and sporting events, working closely with professional athletes to aid muscle recovery, prevent injuries, and improve overall physical resilience. Her practice is grounded in deep anatomical knowledge and a personalized approach to therapy, making her a trusted name in the physiotherapy and wellness community.
            </p>
          </div>
        </section>

        {/* Portfolio Images Only */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {['/Port2.avif','/Port3.avif','/Port4.avif','/Port5.avif','/Port6.avif'].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Portfolio ${index+1}`}
                className="w-full h-[314px] object-cover rounded-lg"
              />
            ))}
          </div>
        </section>

        {/* Professional Journey Text */}
        <section className="mb-16">
          <p className="font-montserrat text-base lg:text-xl text-black leading-relaxed">
            Mrs. Kavita's professional journey gained momentum in 2015 at the HEAL Institute, Khar West, where she trained under Dr. Priyanka Das and served as Center Head. During her tenure, she honed her techniques while treating elite athletes and fitness enthusiasts. Now a senior therapist at Flexrite World, she continues to expand her reach across Mumbai, supported by an expert team dedicated to delivering top-tier sports massage therapy. Her contribution to the field has solidified her reputation as one of the most respected and experienced therapists in the golden hands domain of physiotherapy.
          </p>
        </section>

        {/* Video Section */}
        <section className="mb-20">
          <div className="w-full h-[250px] lg:h-[600px] bg-gray-300 rounded-[32px] lg:rounded-[63px] flex items-center justify-center overflow-hidden">
            <video
              src="/Flexrite.mp4"
              
              autoPlay
              className="w-full h-full object-cover rounded-[32px] lg:rounded-[63px]"
              poster="/Port1.avif"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  );
}
