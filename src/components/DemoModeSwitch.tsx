import React from 'react';
import { motion } from 'framer-motion';
import { Beaker } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

interface DemoModeSwitchProps {
  className?: string;
}

const DemoModeSwitch: React.FC<DemoModeSwitchProps> = ({ className = '' }) => {
  const { isDemoMode, toggleDemoMode } = useWeb3();

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center mr-2">
        <Beaker className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-sm text-gray-400">Demo Mode</span>
      </div>
      <motion.button
        onClick={toggleDemoMode}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${
          isDemoMode ? 'bg-primary-500' : 'bg-gray-700'
        }`}
        whileTap={{ scale: 0.95 }}
        aria-pressed={isDemoMode}
        aria-label="Toggle demo mode"
      >
        <span
          className={`${
            isDemoMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </motion.button>
    </div>
  );
};

export default DemoModeSwitch;
