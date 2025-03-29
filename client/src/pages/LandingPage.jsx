import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DemoSection from '../components/DemoSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <HeroSection />
      
      {/* Stats Section */}
      <motion.div 
        className="py-16 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-blue-500/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">50k+</div>
              <div className="text-gray-400">Presentations</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-blue-500/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">100k+</div>
              <div className="text-gray-400">Users</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-blue-500/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-blue-500/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </motion.div>

      <DemoSection />
      <FeaturesSection />
      <PricingSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;