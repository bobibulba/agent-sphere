import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  // Initialize provider and check for existing connection
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(ethProvider);
          
          // Check if already connected
          const accounts = await ethProvider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            
            const network = await ethProvider.getNetwork();
            setChainId(network.chainId);
          }
        } catch (error) {
          console.error("Failed to initialize web3 provider:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        setAccount(null);
        setIsConnected(false);
      } else {
        // Account changed
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or another Ethereum wallet to connect.");
      return;
    }

    setIsConnecting(true);
    
    try {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethProvider);
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setAccount(accounts[0]);
      setIsConnected(true);
      
      // Get network info
      const network = await ethProvider.getNetwork();
      setChainId(network.chainId);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setChainId(null);
  };

  return (
    <Web3Context.Provider 
      value={{ 
        account, 
        isConnected, 
        isConnecting,
        connectWallet, 
        disconnectWallet,
        chainId,
        provider
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
