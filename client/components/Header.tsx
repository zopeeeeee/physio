import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-50 fixed top-0 left-0 right-0
        transition-all duration-500 ease-in-out
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 px-4 lg:px-0 opacity-100 translate-y-0'
          : 'bg-white py-4 px-4 lg:px-0 opacity-90 -translate-y-4 shadow-none'}
        `}
      style={{
        willChange: 'opacity, transform',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="hidden lg:flex items-center space-x-24">
          <Link to="/" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link to="/services" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Services
          </Link>
          <Link to="/careers" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Careers
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="text-center">
          <div className="font-playfair font-bold text-black">
            <div className="text-3xl lg:text-5xl leading-none">Flexrite</div>
            <div className="text-base lg:text-xl">world</div>
          </div>
        </div>

        {/* Right Navigation */}
        <nav className="hidden lg:flex items-center space-x-24">
          <Link to="/perks" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Perks
          </Link>
          <Link to="/corporate" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Corporate
          </Link>
          <Link to="/portfolio" className="font-source font-bold text-black text-base hover:opacity-70 transition-opacity">
            Portfolio
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden flex flex-col space-y-1">
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>
    </header>
  );
}
