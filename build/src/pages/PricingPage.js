import React from "react";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Choose Your Plan</h1>
      
      {/* Pricing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Freemium Plan */}
        <div className="card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-center mb-4">Freemium</h2>
          <p className="text-center text-lg mb-4">1 free AI-enhanced resume, then $5 per use.</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Start Free
          </button>
        </div>

        {/* Basic Plan */}
        <div className="card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-center mb-4">Basic</h2>
          <p className="text-center text-lg mb-4">$10/month - 5 AI-enhanced resumes</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
            Subscribe $10/month
          </button>
        </div>

        {/* Pro Plan */}
        <div className="card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-center mb-4">Pro</h2>
          <p className="text-center text-lg mb-4">$25/month - 15 AI-enhanced resumes</p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
            Subscribe $25/month
          </button>
        </div>
      </div>

      {/* Pay-Per-Use */}
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold">Pay-Per-Use</h2>
        <p className="text-lg mb-4">$5 per AI-enhanced resume</p>
        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
          Pay $5 Per Use
        </button>
      </div>
    </div>
  );
};



export default PricingPage;
