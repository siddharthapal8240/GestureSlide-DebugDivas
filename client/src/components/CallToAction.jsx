import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl shadow-xl p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Start Presenting the Smart Way
          </h2>
          <p className="mt-4 text-xl text-gray-200">
            Transform your presentation style with gesture controls and
            real-time annotations.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100 transition duration-300"
          >
            Start Presenting
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
