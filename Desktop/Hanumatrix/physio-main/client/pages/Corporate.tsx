import Header from "@/components/Header";

export default function Corporate() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-playfair font-bold text-4xl lg:text-6xl text-black mb-6">
            Corporate
          </h1>
          <p className="font-source text-lg text-gray-600 mb-8 max-w-md">
            This page is under construction. Continue prompting to add content for corporate services.
          </p>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
      </div>
    </>
  );
}
