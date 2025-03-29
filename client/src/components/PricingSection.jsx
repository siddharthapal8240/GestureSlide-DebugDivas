import { useState } from "react";
import { motion } from "framer-motion";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Forever Free",
      price: "₹0",
      features: [
        "250 conversations p/m",
        "2 voice channels",
        "1GB data storage",
        "GestureSlide Academy",
        "Basic support",
      ],
      buttonText: "Create a free account",
      highlighted: true,
      gradient: "border-2 border-blue-400 text-white",
      extraPadding: "pb-20",
    },
    {
      name: "Essentials",
      price: isYearly ? "₹39,999" : "₹3,999",
      features: [
        "1000 conversations p/m",
        "3 voice channels",
        "5GB data storage",
        "Chat Widget",
        "Realtime overview",
      ],
      buttonText: "Request demo",
    },
    {
      name: "Team",
      price: isYearly ? "₹72,999" : "₹7,299",
      features: [
        "2500 conversations p/m",
        "5 voice channels",
        "25GB data storage",
        "Channel statistics",
        "Artificial intelligence",
      ],
      buttonText: "Request demo",
    },
    {
      name: "Professional",
      price: isYearly ? "₹1,05,999" : "₹10,599",
      features: [
        "5000 conversations p/m",
        "20 voice channels",
        "100GB data storage",
        "Outbound webhooks",
        "Own success manager",
      ],
      buttonText: "Request demo",
    },
  ];

  return (
    <div className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to start with GestureSlide?</h2>
      <p className="mt-4 text-gray-400">Choose the package that suits you.</p>
      <div className="mt-6 flex justify-center items-center">
        <span className="text-sm text-gray-300">Monthly</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative mx-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isYearly ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          <span className="sr-only">Toggle yearly billing</span>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isYearly ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm text-blue-400">Yearly (15% discount)</span>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-xl shadow-lg p-8 transition-transform border border-gray-700 ${
              plan.highlighted ? plan.gradient : "bg-gray-800"
            } ${plan.extraPadding || "pb-10"}`}
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="mt-4 text-4xl font-extrabold">{plan.price}</p>
            <p className="text-sm text-gray-300">{isYearly ? "/year" : "/month"}</p>
            <ul className="mt-6 space-y-3 text-gray-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center whitespace-nowrap">
                  <span className="text-blue-400 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className={`mt-6 w-full font-bold py-3 rounded-lg transition ${
              plan.highlighted
                ? "border-2 border-blue-400 text-blue-400 hover:bg-gray-900"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
