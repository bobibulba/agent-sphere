import React from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityBanner: React.FC = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-3 md:mb-0">
          <Users className="h-5 w-5" />
          <span className="font-medium">Join the ChatAndBuild CommunitySpace and connect with other builders!</span>
        </div>
        
        <motion.a 
          href="https://chatandbuild.com/community" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-full text-sm font-medium transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Join Now</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default CommunityBanner;
