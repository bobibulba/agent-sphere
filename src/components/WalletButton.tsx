import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Loader } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

interface WalletButtonProps {
  className?: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({ className = '' }) => {
  const { account, isConnected, isConnecting, connectWallet } = useWeb3();

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <motion.button
      onClick={connectWallet}
      disabled={isConnecting || isConnected}
      className={`bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 flex items-center justify-center ${className} ${isConnecting ? 'opacity-80' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isConnecting ? (
        <>
          <Loader className="h-4 w-4 mr-2 animate-spin" />
          <span>Connecting...</span>
        </>
      ) : isConnected ? (
        <>
          <Wallet className="h-4 w-4 mr-2" />
          <span>{formatAddress(account || '')}</span>
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4 mr-2" />
          <span>Connect Wallet</span>
        </>
      )}
    </motion.button>
  );
};

export default WalletButton;
