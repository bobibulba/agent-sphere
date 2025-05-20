import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Agent } from '../types';
import { motion } from 'framer-motion';

interface FeaturedAgentsProps {
  agents: Agent[];
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
}

const FeaturedAgents: React.FC<FeaturedAgentsProps> = ({ 
  agents, 
  title, 
  subtitle, 
  linkText, 
  linkUrl 
}) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const itemsToShow = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
  
  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => 
        (prevIndex + 1) % (Math.max(0, agents.length - itemsToShow + 1))
      );
    }, 7000);
    
    return () => clearInterval(interval);
  }, [agents.length, itemsToShow]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => 
      Math.max(0, prevIndex - 1)
    );
  };

  const handleNext = () => {
    setStart<pivotalArtifact id="update-rating-to-likes" title="Update Rating System to Likes">
<pivotalAction type="file" filePath="src/components/FeaturedAgents.tsx">import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Agent } from '../types';
import { motion } from 'framer-motion';

interface FeaturedAgentsProps {
  agents: Agent[];
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
}

const FeaturedAgents: React.FC<FeaturedAgentsProps> = ({ 
  agents, 
  title, 
  subtitle, 
  linkText, 
  linkUrl 
}) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const itemsToShow = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
  
  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => 
        (prevIndex + 1) % (Math.max(0, agents.length - itemsToShow + 1))
      );
    }, 7000);
    
    return () => clearInterval(interval);
  }, [agents.length, itemsToShow]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => 
      Math.max(0, prevIndex - 1)
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => 
      Math.min(agents.length - itemsToShow, prevIndex + 1)
    );
  };

  const visibleAgents = agents.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 max-w-2xl">{subtitle}</p>
          </motion.div>
          <Link 
            to={linkUrl}
            className="text-blue-400 hover:text-blue-300 mt-4 md:mt-0"
          >
            {linkText}
          </Link>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`p-2 rounded-full bg-gray-800 border border-gray-700 text-white ${
                startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              disabled={startIndex >= agents.length - itemsToShow}
              className={`p-2 rounded-full bg-gray-800 border border-gray-700 text-white ${
                startIndex >= agents.length - itemsToShow ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Agents grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            {visibleAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition duration-300 h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={agent.image} 
                      alt={agent.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {agent.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <div className="flex items-center space-x-1 text-rose-400">
                        <Heart className={`h-4 w-4 ${agent.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{agent.likes}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{agent.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.capabilities.slice(0, 2).map((capability, i) => (
                        <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          {capability}
                        </span>
                      ))}
                      {agent.capabilities.length > 2 && (
                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          +{agent.capabilities.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <span className="text-sm text-gray-400">by {agent.creator}</span>
                      <span className="text-lg font-bold text-white">{agent.price} ETH</span>
                    </div>
                    
                    <Link 
                      to={`/agent/${agent.id}`}
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-center transition"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-1 mt-8">
            {Array.from({ length: Math.max(1, agents.length - itemsToShow + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === startIndex ? 'bg-blue-500 w-4' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;
