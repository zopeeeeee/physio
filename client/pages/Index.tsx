import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import BlogsAndNews from "@/components/BlogsAndNews";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <MeetOurDoctors />
      <BlogsAndNews />
      <Testimonials />
      <ContactFooter />
    </>
  );
}
