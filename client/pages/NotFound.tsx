import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-playfair font-bold text-6xl lg:text-8xl text-black mb-4">404</h1>
          <h2 className="font-playfair font-bold text-2xl lg:text-4xl text-black mb-6">
            Page Not Found
          </h2>
          <p className="font-source text-lg text-gray-600 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-black text-white font-lato font-medium text-lg px-8 py-4 rounded-full hover:bg-gray-800 transition-colors inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
