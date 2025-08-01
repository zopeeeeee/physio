export default function ContactFooter() {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-12 items-start">
          {/* Brand/Description/Feedback */}
          <div>
            <h2 className="text-6xl font-bold mb-6 font-montserrat">Flexrite World</h2>
            <p className="text-gray-300 text-2lg leading-relaxed mb-8 max-w-md ">
              Physiotherapist, we are dedicated to providing expert physiotherapy care tailored to your unique needs. Our experienced team combines evidence-based treatments with personalized attention to help you recover, move better, and live pain-free. Your health is our priority – from rehabilitation to wellness, we're with you every step of the way.
            </p>
            {/* Feedback Section */}
            <div className="flex items-center bg-[#E6D6FB] rounded-xl px-2 py-2 w-full max-w-md">
              <button className="flex-1 px-6 py-3 text-black font-bold bg-transparent hover:bg-[#d1bff2] rounded-xl transition-colors text-lg">Give Feedback</button>
              <div className="mx-2"></div>
              <button className="flex-1 px-6 py-3 text-coral font-bold bg-black hover:bg-gray-900 rounded-xl transition-colors text-lg">Submit</button>
            </div>
          </div>
          {/* Map Section */}
          <div className="w-full flex justify-center mb-12">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609826074!2d72.7410992!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c1b6e7b2b%3A0x1b1b1b1b1b1b1b1b!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '1rem', maxWidth: '900px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Services/Agency */}
          
        </div>
        {/* Social Media Links - left aligned with contact info right */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-12 pl-1 text-lg font-normal">
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#E6D6FB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M7.75 2C4.4 2 2 4.4 2 7.75v8.5C2 19.6 4.4 22 7.75 22h8.5C19.6 22 22 19.6 22 16.25v-8.5C22 4.4 19.6 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 3.75 1.55 3.75 3.75v8.5c0 2.2-1.55 3.75-3.75 3.75h-8.5c-2.2 0-3.75-1.55-3.75-3.75v-8.5c0-2.2 1.55-3.75 3.75-3.75zm4.25 3.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#E6D6FB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"/></svg>
              Facebook
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#E6D6FB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-7 19c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm7-11c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z"/></svg>
              Linkedin
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#E6D6FB] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
              Twitter
            </a>
          </div>
          <div className="mt-2 text-right">
            <div className="text-2xl font-bold mb-2 text-center">XXXXXX XXXX</div>
            <div className="font-montserrat text-3xl font-bold mb-1 text-[#E6D6FB] text-center">Call Flexrite World</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
