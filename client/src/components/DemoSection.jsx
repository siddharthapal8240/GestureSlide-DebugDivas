import { motion } from "framer-motion";

const DemoSection = () => {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            See GestureSlide in Action
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Watch how easy it is to control your presentations with hand
            gestures
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/30"
        >
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src="https://youtu.be/drqGbz2QgLk?si=21mT11wYIGeLumet"
              title="GestureSlide Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-6 rounded-lg border border-blue-500/30"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Natural Controls
            </h3>
            <p className="text-gray-400">
              Intuitive hand gestures for seamless navigation
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-6 rounded-lg border border-blue-500/30"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Real-time Drawing
            </h3>
            <p className="text-gray-400">
              Draw and annotate with precision hand tracking
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-6 rounded-lg border border-blue-500/30"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Smart Recognition
            </h3>
            <p className="text-gray-400">
              Advanced AI for accurate gesture detection
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
