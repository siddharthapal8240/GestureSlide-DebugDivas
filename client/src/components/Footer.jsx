import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-blue-400">GestureSlide</h3>
            <p className="mt-4 text-gray-400">
              Transform your presentations with intuitive hand gesture controls.
              Present smarter, engage better.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-300">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-300">Connect</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2025 GestureSlide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;