import { useState } from "react";
import { motion } from "framer-motion";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: isYearly ? "0" : "0",
      features: ["Basic hand gestures", "5 presentations", "Basic analytics"],
    },
    {
      name: "Solo",
      price: isYearly ? "99" : "9.99",
      features: [
        "Advanced gestures",
        "Unlimited presentations",
        "Advanced analytics",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: isYearly ? "199" : "19.99",
      features: [
        "Everything in Solo",
        "Team collaboration",
        "Custom gestures",
        "API access",
      ],
    },
  ];

  return (
    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isYearly ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <span className="sr-only">Toggle yearly billing</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isYearly ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-300">Yearly billing</span>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-blue-500 rounded-lg shadow-lg divide-y divide-gray-700 bg-gray-800"
            >
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-400">
                    {isYearly ? "/year" : "/month"}
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <span className="text-blue-400">✓</span>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pt-6 pb-8">
                <button className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300">
                  Get started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
