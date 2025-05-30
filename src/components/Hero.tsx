import React from 'react';
import { ArrowRight, Bot, Zap, Shield, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredAgents } from '../data/agents';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-dark to-gray-900 text-white overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0aC0yNHpNMCAzNHYyNmgyNFYzNEgwek0zNiAwdjI2aDI0VjBoLTI0ek0wIDB2MjZoMjRWMEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The Future of AI is <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Non-Fungible</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Discover, trade, and utilize unique AI agents with real-world capabilities. 
              AgentSphere is the premier marketplace for Non-Fungible Agents powered by ChatAndBuild.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                to="/marketplace" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-300 shadow-glow"
              >
                <span>Explore Agents</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <a 
                href="https://chatandbuild.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border border-gray-700 hover:border-blue-500 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-300"
              >
                <span>Create Agent</span>
                <Bot className="h-5 w-5" />
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">1,000+ Agents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Secure Trading</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Unique Utility</span>
              </div>
            </motion.div>
          </motion.div>
          
          <FeaturedAgentCarousel />
        </div>
      </div>
    </div>
  );
};

// Featured Agent Carousel Component
const FeaturedAgentCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  
  // Get top 3 most liked agents
  const topLikedAgents = [...featuredAgents]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topLikedAgents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [topLikedAgents.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const agent = topLikedAgents[currentIndex];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Featured Agents</h3>
            </div>
            <span className="bg-gray-700 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
              Top Liked
            </span>
          </div>
          
          <motion.div 
            className="relative aspect-video rounded-lg overflow-hidden mb-4"
            key={currentIndex}
            initial={{ opacity: 0.8, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={agent.image} 
              alt={agent.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="text-xl font-bold">{agent.name}</h4>
              <p className="text-gray-300 text-sm">by {agent.creator}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-300">
              {agent.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.slice(0, 3).map((capability, i) => (
                <span key={i} className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                  {capability}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-1 text-white">
                <button 
                  onClick={handleLikeToggle}
                  className="flex items-center space-x-1"
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? agent.likes + 1 : agent.likes}</span>
                </button>
              </div>
              <div className="text-xl font-bold text-white">{agent.price} ETH</div>
            </div>
            
            <div className="flex space-x-3">
              <Link 
                to={`/agent/${agent.id}`} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
          
          {/* Carousel navigation dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {topLikedAgents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-5' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
    </motion.div>
  );
};

export default Hero;
