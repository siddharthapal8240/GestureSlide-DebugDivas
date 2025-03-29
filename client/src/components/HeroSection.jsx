import { motion } from 'framer-motion';
import { FaHandPaper, FaArrowLeft, FaArrowRight, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Transform Your Presentations with
              <span className="block mt-2 text-blue-500">Gesture Controls</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Control your presentations naturally with hand gestures. No more clickers, just seamless interaction.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Start Presenting
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                Watch Demo
              </a>
            </div>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                <FaHandPaper className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Navigate Slides</h3>
              <p className="text-gray-400 text-center">Swipe left or right to move between slides effortlessly</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                <FaPen className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Draw & Annotate</h3>
              <p className="text-gray-400 text-center">Use hand gestures to draw and highlight key points</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                <FaHandPaper className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Virtual Whiteboard</h3>
              <p className="text-gray-400 text-center">Create new slides on the fly for dynamic presentations</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
    </div>
  );
};

export default HeroSection;