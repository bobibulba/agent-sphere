import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu, X, Search, ChevronDown, Sparkles, Users, ShoppingBag, LogIn, Github, Mail, Wallet, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Demo state for signed in/out

  const navItemVariants = {
    initial: { y: -5, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const toggleSignInState = () => {
    setIsSignedIn(!isSignedIn);
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
              <Link to="/community" className="flex items-center text-gray-300 hover:text-white transition">
                <motion.div
                  className="flex items-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="h-4 w-4 mr-1" />
                  <span>Community</span>
                </motion.div>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Always visible search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search agent or creator..."
                className="bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {/* Demo switch for signed in/out state */}
            <div className="flex items-center mr-2">
              <span className="text-xs text-gray-400 mr-2">Demo:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  checked={isSignedIn}
                  onChange={toggleSignInState}
                />
                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                <span className="ml-2 text-xs text-gray-300">
                  {isSignedIn ? 'Signed In' : 'Signed Out'}
                </span>
              </label>
            </div>
            
            {isSignedIn ? (
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </button>
              </motion.div>
            ) : (
              <motion.button 
                onClick={() => setIsSignInModalOpen(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </motion.button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
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
              <Link to="/marketplace" className="flex items-center text-gray-300 hover:text-white transition">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
              </Link>
              
              <Link to="/community" className="flex items-center text-gray-300 hover:text-white transition">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Link>
              
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search agent or creator..."
                  className="bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-2">Demo:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      checked={isSignedIn}
                      onChange={toggleSignInState}
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
                    <span className="ml-2 text-xs text-gray-300">
                      {isSignedIn ? 'Signed In' : 'Signed Out'}
                    </span>
                  </label>
                </div>
              </div>
              
              {isSignedIn ? (
                <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Demo User</p>
                    <p className="text-xs text-gray-400">user@example.com</p>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsSignInModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full text-center transition duration-300 flex items-center justify-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sign In Modal */}
      <AnimatePresence>
        {isSignInModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setIsSignInModalOpen(false)}
            >
              <motion.div
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700 shadow-xl"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Sign In</h2>
                  <button
                    onClick={() => setIsSignInModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition">
                    <Github className="h-5 w-5 mr-2" />
                    Continue with GitHub
                  </button>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition">
                    <Mail className="h-5 w-5 mr-2" />
                    Continue with Email
                  </button>

                  <div className="relative py-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-gray-900 px-4 text-sm text-gray-400">Or</span>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition"
                    onClick={() => {
                      setIsSignedIn(true);
                      setIsSignInModalOpen(false);
                    }}
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect Web3 Wallet
                  </button>
                </div>

                <p className="text-gray-400 text-sm text-center mt-6">
                  By continuing, you agree to AgentSphere's{" "}
                  <a href="#" className="text-primary-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary-400 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
