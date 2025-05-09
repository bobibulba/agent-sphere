import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Twitter, Github, Linkedin, Mail, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-900 light:bg-gray-100 text-white dark:text-white light:text-gray-900 pt-16 pb-8 border-t border-gray-800 dark:border-gray-800 light:border-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                AgentSphere
              </span>
            </Link>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
              The premier marketplace for Non-Fungible Agents (NFAs). Discover, trade, and create intelligent agents powered by ChatAndBuild.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a 
                href="#" 
                className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-primary-400 transition"
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-primary-400 transition"
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-primary-400 transition"
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-primary-400 transition"
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-white light:text-gray-900">Marketplace</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">All Agents</Link></li>
              <li><Link to="/trending" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Trending</Link></li>
              <li><Link to="/new" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">New Releases</Link></li>
              <li><Link to="/collections" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Collections</Link></li>
              <li><Link to="/creators" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Top Creators</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-white light:text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Documentation</Link></li>
              <li><Link to="/guides" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Guides</Link></li>
              <li><Link to="/api" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">API Reference</Link></li>
              <li><Link to="/faq" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-white light:text-gray-900">Community</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://chatandbuild.com/community" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition"
                >
                  <Users className="h-4 w-4 mr-2" />
                  <span>Join CommunitySpace</span>
                </a>
              </li>
              <li><Link to="/about" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Blog</Link></li>
              <li><Link to="/privacy" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-800 light:border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AgentSphere. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Built with <span className="text-primary-400">❤</span> using <a href="https://www.chatandbuild.com" className="text-primary-400 hover:underline">ChatAndBuild</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
