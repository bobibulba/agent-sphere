import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu, X, Search, ChevronDown, Sparkles, Sun, Moon, Users, Compass, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navItemVariants = {
    initial: { y: -5, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50 border-b border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-8 w-8 text-primary-400" />
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                AgentSphere
              </motion.span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <div 
                className="relative group"
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
              >
                <motion.button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Compass className="h-4 w-4 mr-1" />
                  <span>Explore</span>
                  <motion.div
                    variants={navItemVariants}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>
                {isExploreOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-2 z-10"
                    initial="hidden"
                    animate="visible"
                    variants={dropdownVariants}
                  >
                    <Link to="/category/development" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Development</Link>
                    <Link to="/category/design" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Design</Link>
                    <Link to="/category/content" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Content</Link>
                    <Link to="/category/analytics" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Analytics</Link>
                    <Link to="/category/finance" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Finance</Link>
                  </motion.div>
                )}
              </div>
              <Link to="/marketplace" className="flex items-center text-gray-300 hover:text-white transition">
                <motion.div
                  className="flex items-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Marketplace
                </motion.div>
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => setIsCommunityOpen(true)}
                onMouseLeave={() => setIsCommunityOpen(false)}
              >
                <motion.button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="h-4 w-4 mr-1" />
                  <span>Community</span>
                </motion.button>
                {isCommunityOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-64 bg-gray-900 rounded-md shadow-lg py-4 px-4 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-sm font-semibold text-white mb-2">Join CommunitySpace</h3>
                    <p className="text-xs text-gray-400 mb-3">
                      Connect with other builders and share your creations in the ChatAndBuild community.
                    </p>
                    <a 
                      href="https://chatandbuild.com/community" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md text-center transition"
                    >
                      Join Now
                    </a>
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <a 
                        href="https://chatandbuild.com/showcase" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-gray-300 hover:text-white mb-2"
                      >
                        Showcase Your Agents
                      </a>
                      <a 
                        href="https://chatandbuild.com/events" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-gray-300 hover:text-white"
                      >
                        Upcoming Events
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <motion.button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            )}
            
            <motion.button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white p-2 rounded-full"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            
            <motion.a 
              href="https://chatandbuild.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full transition duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Agent
            </motion.a>
          </div>
          
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white p-1 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 pt-4 border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link to="/explore" className="flex items-center text-gray-300 hover:text-white transition">
                <Compass className="h-4 w-4 mr-2" />
                Explore
              </Link>
              <Link to="/marketplace" className="flex items-center text-gray-300 hover:text-white transition">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
              </Link>
              
              <div className="py-2 px-3 bg-gray-800 rounded-lg">
                <h3 className="flex items-center text-sm font-medium text-white mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </h3>
                <a 
                  href="https://chatandbuild.com/community" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-400 text-sm mb-1"
                >
                  Join CommunitySpace
                </a>
                <a 
                  href="https://chatandbuild.com/showcase" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Showcase Your Agents
                </a>
                <a 
                  href="https://chatandbuild.com/events" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-300"
                >
                  Upcoming Events
                </a>
              </div>
              
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <a 
                href="https://chatandbuild.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full text-center transition duration-300"
              >
                Create Agent
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
