import { motion } from "framer-motion";
import demoGif from '../assets/demo.gif';
import {
  Aperture as Gesture,
  Pencil,
  Presentation,
  Users,
  Brain,
  Layers,
  Wand2,
  Lightbulb,
} from "lucide-react";

const mainFeatures = [
  {
    title: "Gesture Recognition",
    description:
      "Advanced hand tracking for precise gesture control of your presentations",
    icon: Gesture,
    highlights: [
      "Multi-hand tracking",
      "Real-time response",
      "Custom gesture mapping",
    ],
  },
  {
    title: "Virtual Whiteboard",
    description:
      "Create and annotate content in real-time with natural hand movements",
    icon: Pencil,
    highlights: [
      "Infinite canvas",
      "Smart shape recognition",
      "Multi-color tools",
    ],
  },
];

const features = [
  {
    icon: Presentation,
    title: "Smart Navigation",
    description: "Navigate through slides with intuitive hand gestures",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced gesture recognition with machine learning",
  },
  {
    icon: Layers,
    title: "Multi-Layer Support",
    description: "Create complex annotations with layered drawings",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Multiple presenters can control and annotate simultaneously",
  },
  {
    icon: Wand2,
    title: "Smart Tools",
    description: "Intelligent shape and text recognition",
  },
  {
    icon: Lightbulb,
    title: "Presentation Tips",
    description: "Real-time suggestions for better presentations",
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-900 py-24">
      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your presentation style with cutting-edge gesture controls
            and virtual whiteboard capabilities
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-3xl p-8 border border-blue-500/20 shadow-glow hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-500/10 rounded-2xl p-4">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 text-blue-400 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Feature Demo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 relative overflow-hidden border border-blue-500/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>
    <h3 className="text-3xl font-bold text-white mb-6">
      Experience the Future of Presentations
    </h3>
    <p className="text-lg text-gray-300 mb-8">
      Our advanced gesture recognition system allows you to control
      your presentations with natural hand movements, making your
      presentations more engaging and interactive.
    </p>
    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
      Try Demo
    </button>
  </div>
  <div className="relative">
    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border border-blue-500/20">
    <img
        src={demoGif}
        alt="Interactive Demo Preview"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
