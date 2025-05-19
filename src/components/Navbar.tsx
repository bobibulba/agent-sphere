import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, Menu, X, Search, ChevronDown, Sparkles, Users, ShoppingBag, LogIn, Github, Mail, Wallet, User, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWeb3();

  const navItemVariants = {
    initial: { y: -5, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
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

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            
            {isConnected ? (
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full flex items-center space-x-2 px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Wallet className="h-4 w-4 text-white mr-2" />
                  <span className="text-sm font-medium">{formatAddress(account || '')}</span>
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
                        <p className="text-sm font-medium text-white">Connected Wallet</p>
                        <p className="text-xs text-gray-400 truncate">{account}</p>
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
                        onClick={() => {
                          disconnectWallet();
                          setIsProfileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Disconnect
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Connect'}
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
              
              {isConnected ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Connected Wallet</p>
                      <p className="text-xs text-gray-400 truncate">{account}</p>
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
                    onClick={disconnectWallet}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
