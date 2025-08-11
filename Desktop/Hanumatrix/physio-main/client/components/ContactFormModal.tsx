import { useState } from "react";

export default function ContactFormModal() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="w-full">
      <h1 className="font-playfair text-black text-[40px] lg:text-[50px] font-normal mb-8 text-center">
        Feedback
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-[56px] bg-gray-100 rounded-[14px] px-6 py-4 font-inter font-bold text-[18px] lg:text-[20px] text-black placeholder:text-black placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-submit-purple"
            placeholder="Name*"
            required
          />
        </div>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full h-[56px] bg-gray-100 rounded-[14px] px-6 py-4 font-inter font-bold text-[18px] lg:text-[20px] text-black placeholder:text-black placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-submit-purple"
            placeholder="Phone number*"
            required
          />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-[56px] bg-gray-100 rounded-[14px] px-6 py-4 font-inter font-bold text-[18px] lg:text-[20px] text-black placeholder:text-black placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-submit-purple"
            placeholder="Email address*"
            required
          />
        </div>
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="w-full h-[120px] bg-gray-100 rounded-[14px] px-6 py-4 font-inter font-bold text-[18px] lg:text-[20px] text-black placeholder:text-black placeholder:font-bold resize-none focus:outline-none focus:ring-2 focus:ring-submit-purple"
            placeholder="Type your feedback here*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-[56px] bg-submit-purple rounded-[33px] font-inter font-bold text-[18px] lg:text-[20px] text-black hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-submit-purple focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
