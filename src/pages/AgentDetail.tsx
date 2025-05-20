import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Bot, 
  Check, 
  Clock, 
  Tag, 
  Shield, 
  Users, 
  MessageSquare,
  DollarSign,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredAgents, trendingAgents } from '../data/agents';
import { Agent } from '../types';
import { useWeb3 } from '../context/Web3Context';

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'related'>('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [pendingAction, setPendingAction] = useState<'buy' | 'offer' | null>(null);
  
  const { isConnected, connectWallet } = useWeb3();
  const navigate = useNavigate();
  
  // Find the agent from our data
  const agent = [...featuredAgents, ...trendingAgents].find(a => a.id === id);
  
  useEffect(() => {
    if (agent) {
      setLikeCount(agent.likes);
    }
  }, [agent]);

  // Handle wallet connection success
  useEffect(() => {
    if (isConnected && pendingAction) {
      if (pendingAction === 'buy') {
        // Proceed with buy action
        handleBuyNow();
      } else if (pendingAction === 'offer') {
        // Show offer modal
        setShowOfferModal(true);
      }
      setPendingAction(null);
      setShowWalletModal(false);
    }
  }, [isConnected, pendingAction]);
  
  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Agent Not Found</h2>
        <p className="text-gray-400 mb-8">The agent you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  // Calculate USD value (mock conversion)
  const ethPrice = 1800; // Mock ETH price in USD
  const usdValue = parseFloat(agent.price) * ethPrice;

  const handleLikeToggle = () => {
    if (isLiked) {
      // Unlike: decrease count
      setLikeCount(prev => Math.max(0, prev - 1));
    } else {
      // Like: increase count
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBuyNow = () => {
    // Here you would handle the buy now action
    alert(`Purchasing ${agent.name} for ${agent.price} ETH`);
    // Navigate to checkout or process purchase
  };

  const handleActionClick = (action: 'buy' | 'offer') => {
    if (!isConnected) {
      // Set pending action and show wallet modal
      setPendingAction(action);
      setShowWalletModal(true);
    } else {
      // Already connected, proceed with action
      if (action === 'buy') {
        handleBuyNow();
      } else {
        setShowOfferModal(true);
      }
    }
  };

  const handleWalletConnect = async () => {
    await connectWallet();
    // The useEffect will handle the rest when isConnected changes
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the offer submission
    alert(`Offer of ${offerPrice} ETH submitted for ${agent.name}`);
    setShowOfferModal(false);
    setOfferPrice('');
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb - Updated to Home / Marketplace / Agent Name */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/marketplace" className="hover:text-white transition">Marketplace</Link>
            <span>/</span>
            <span className="text-gray-300">{agent.name}</span>
          </nav>
        </div>
        
        {/* Agent Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Left side - Visual Preview - Made to fit the page better */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden aspect-square w-full">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {agent.category}
                </span>
              </div>
            </div>
            
            {/* Removed hashtags below image */}
          </motion.div>
          
          {/* Right side - Quick Info */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{agent.name}</h1>
              <p className="text-xl text-gray-300 mb-4">{agent.description}</p>
              
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-gray-400">by</span>
                <Link to={`/creator/${agent.creator}`} className="text-blue-400 hover:text-blue-300 transition font-medium">
                  {agent.creator}
                </Link>
              </div>
              
              <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{agent.price} ETH</div>
                    <div className="text-gray-400 text-sm">≈ ${usdValue.toFixed(2)} USD</div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                      onClick={() => handleActionClick('buy')}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Buy Now</span>
                    </button>
                    
                    <button 
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                      onClick={() => handleActionClick('offer')}
                    >
                      <DollarSign className="h-5 w-5" />
                      <span>Make Offer</span>
                    </button>
                  </div>
                </div>
                
                {/* Like and Share buttons moved below the main buttons */}
                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center space-x-1 mr-2">
                    <span className="text-gray-300 text-sm">{likeCount}</span>
                    <button 
                      onClick={handleLikeToggle}
                      className="flex items-center"
                      aria-label={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart className={`h-5 w-5 text-white ${isLiked ? 'fill-current text-red-500' : ''}`} />
                    </button>
                  </div>
                  
                  <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    <Share2 className="h-5 w-5 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tabs - Removed reviews tab */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                activeTab === 'related' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('related')}
            >
              Related Agents
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-16">
          {activeTab === 'overview' && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="lg:col-span-2 space-y-8">
                {/* Agent Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This Agent</h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">
                      {agent.details?.longDescription || `
                        ${agent.name} is a powerful AI assistant designed to help you with ${agent.category.toLowerCase()} tasks. 
                        Whether you're a beginner or an expert in the field, this agent provides intuitive and effective solutions 
                        tailored to your specific needs.
                        
                        This agent is perfect for anyone looking to enhance their ${agent.category.toLowerCase()} workflow, 
                        save time, and achieve professional-quality results. You'll receive detailed, actionable outputs 
                        that you can implement right away.
                      `}
                    </p>
                  </div>
                </div>
                
                {/* Capabilities */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agent.capabilities.map((capability, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="mt-0.5 bg-blue-500/20 p-1.5 rounded-full">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Use Cases */}
                {agent.details?.useCases && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                    <ul className="space-y-3">
                      {agent.details.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="mt-0.5 bg-purple-500/20 p-1.5 rounded-full">
                            <Check className="h-4 w-4 text-purple-400" />
                          </div>
                          <span className="text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technical Requirements</h3>
                  <ul className="space-y-3">
                    {(agent.details?.requirements || agent.requirements).map((requirement, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="mt-0.5 bg-gray-700 p-1.5 rounded-full">
                          <Check className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-gray-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Agent Details */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Agent Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="text-gray-400">Version</div>
                      <div className="text-white font-medium">{agent.details?.version || "1.0.0"}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-gray-400">Category</div>
                      <div className="text-white font-medium">{agent.category}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-gray-400">Creator</div>
                      <Link to={`/creator/${agent.creator}`} className="text-blue-400 hover:text-blue-300 transition">
                        {agent.creator}
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(agent.creator)}&background=random`} 
                        alt={agent.creator} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.creator}</h3>
                      <div className="text-gray-400 text-sm">Agent Developer</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Creating powerful AI agents to help with various tasks. Specializing in {agent.category.toLowerCase()} solutions.
                  </p>
                  
                  <Link 
                    to={`/creator/${agent.creator}`}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                  >
                    <span>View all agents</span>
                    <ArrowLeft className="h-3 w-3 rotate-180" />
                  </Link>
                </div>
                
                {/* Support */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Creator</span>
                    </button>
                    
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition">
                      <Shield className="h-4 w-4" />
                      <span>Report Issue</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'related' && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Related agents - show agents from the same category */}
              {[...featuredAgents, ...trendingAgents]
                .filter(a => a.category === agent.category && a.id !== agent.id)
                .slice(0, 4)
                .map((relatedAgent, index) => (
                  <Link key={relatedAgent.id} to={`/agent/${relatedAgent.id}`}>
                    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition duration-300 h-full flex flex-col">
                      <div className="relative">
                        <img 
                          src={relatedAgent.image} 
                          alt={relatedAgent.name}
                          className="w-full aspect-video object-cover"
                        />
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-white">{relatedAgent.name}</h3>
                          <div className="flex items-center space-x-1 text-white">
                            <Heart className="h-4 w-4 fill-current" />
                            <span className="text-sm">{relatedAgent.likes}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4">{relatedAgent.description}</p>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                          <span className="text-sm text-gray-400">by {relatedAgent.creator}</span>
                          <span className="text-lg font-bold text-white">{relatedAgent.price} ETH</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Make an Offer</h3>
            <p className="text-gray-300 mb-6">Enter your offer price for {agent.name}</p>
            
            <form onSubmit={handleOfferSubmit}>
              <div className="mb-6">
                <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Offer (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="offerPrice"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">ETH</span>
                  </div>
                </div>
                {offerPrice && (
                  <p className="mt-2 text-sm text-gray-400">
                    ≈ ${(parseFloat(offerPrice) * ethPrice).toFixed(2)} USD
                  </p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
                >
                  Submit Offer
                </button>
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="bg-blue-500/20 p-4 rounded-full inline-flex mb-4">
                <Wallet className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-gray-300">
                You need to connect your wallet to {pendingAction === 'buy' ? 'purchase' : 'make an offer for'} this agent.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleWalletConnect}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
              
              <button
                onClick={() => {
                  setShowWalletModal(false);
                  setPendingAction(null);
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AgentDetail;
