import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, Menu, X, Search, ChevronDown, Sparkles, Users, ShoppingBag, LogIn, Github, Mail, Wallet, User, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Demo state for signed in/out
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const signInModalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const toggleSignInState = () => {
    setIsSignedIn(!isSignedIn);
    if (isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  // Calculate modal position when sign-in button is clicked
  const openSignInModal = () => {
    if (signInButtonRef.current) {
      const buttonRect = signInButtonRef.current.getBoundingClientRect();
      // Position the modal below the button
      setModalPosition({
        top: buttonRect.bottom + window.scrollY + 10, // 10px below the button
        right: window.innerWidth - buttonRect.right // Align right edge with button
      });
    }
    setIsSignInModalOpen(true);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      
      // Close sign-in modal when clicking outside, but not on the sign-in button
      if (
        isSignInModalOpen && 
        signInModalRef.current && 
        !signInModalRef.current.contains(event.target as Node) &&
        signInButtonRef.current !== event.target &&
        !signInButtonRef.current?.contains(event.target as Node)
      ) {
        setIsSignInModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSignInModalOpen]);

  const handleLogout = () => {
    setIsSignedIn(false);
    setIsProfileMenuOpen(false);
  };

  // Mock function for Web3 wallet connection
  const connectWallet = () => {
    // In a real implementation, this would connect to MetaMask or other wallets
    console.log("Connecting to Web3 wallet...");
    // Simulate successful connection
    setTimeout(() => {
      setIsSignedIn(true);
      setIsSignInModalOpen(false);
    }, 1000);
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
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5 text-white" />
                </motion.button>
                
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-700"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">Demo User</p>
                        <p className="text-xs text-gray-400">user@example.com</p>
                      </div>
                      
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      
                      <button 
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                ref={signInButtonRef}
                onClick={openSignInModal}
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
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Demo User</p>
                      <p className="text-xs text-gray-400">user@example.com</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition rounded-lg"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  
                  <button 
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSignInModalOpen(true)}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Sign In Modal */}
        <AnimatePresence>
          {isSignInModalOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsSignInModalOpen(false)}
              />
              
              <motion.div
                ref={signInModalRef}
                className="fixed bg-gray-800 rounded-xl p-6 z-50 w-full max-w-md border border-gray-700 shadow-xl"
                style={{
                  top: `${modalPosition.top}px`,
                  right: `${modalPosition.right}px`,
                  maxWidth: '400px'
                }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Sign In</h3>
                  <button 
                    onClick={() => setIsSignInModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        id="remember-me" 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-primary-500 focus:ring-offset-gray-800"
                      />
                      <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                    
                    <button className="text-sm text-primary-400 hover:text-primary-300">
                      Forgot password?
                    </button>
                  </div>
                  
                  <button 
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    onClick={() => {
                      setIsSignedIn(true);
                      setIsSignInModalOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  
                  <div className="relative flex items-center justify-center mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative px-4 bg-gray-800 text-sm text-gray-400">
                      Or continue with
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <button className="flex justify-center items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                      <Github className="h-5 w-5" />
                    </button>
                    <button className="flex justify-center items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                      <Mail className="h-5 w-5" />
                    </button>
                    <button 
                      className="flex justify-center items-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                      onClick={connectWallet}
                    >
                      <Wallet className="h-5 w-5" />
                    </button>
                    <button 
                      className="flex justify-center items-center py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition"
                      onClick={connectWallet}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.0445 0L15.8945 0.5V21.8782L16.0445 22.0279L25.8582 16.4255L16.0445 0Z" fill="white"/>
                        <path d="M16.0445 0L6.23071 16.4255L16.0445 22.0279V11.7887V0Z" fill="white" fillOpacity="0.8"/>
                        <path d="M16.0445 23.8855L15.9597 23.9871V31.3453L16.0445 31.5944L25.8645 18.2856L16.0445 23.8855Z" fill="white"/>
                        <path d="M16.0445 31.5944V23.8855L6.23071 18.2856L16.0445 31.5944Z" fill="white" fillOpacity="0.8"/>
                        <path d="M16.0445 22.0279L25.8582 16.4255L16.0445 11.7887V22.0279Z" fill="white" fillOpacity="0.9"/>
                        <path d="M6.23071 16.4255L16.0445 22.0279V11.7887L6.23071 16.4255Z" fill="white" fillOpacity="0.7"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <span className="text-gray-400 text-sm">Don't have an account?</span>
                    <button className="ml-1 text-primary-400 hover:text-primary-300 text-sm font-medium">
                      Sign Up
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
