import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Share2, 
  Heart, 
  ShoppingCart, 
  Bot, 
  Check, 
  Clock, 
  Tag, 
  Shield, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredAgents, trendingAgents } from '../data/agents';
import { Agent } from '../types';

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'related'>('overview');
  
  // Find the agent from our data
  const agent = [...featuredAgents, ...trendingAgents].find(a => a.id === id);
  
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

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/marketplace" className="hover:text-white transition">Marketplace</Link>
            <span>/</span>
            <Link to={`/category/${agent.category.toLowerCase()}`} className="hover:text-white transition">{agent.category}</Link>
            <span>/</span>
            <span className="text-gray-300">{agent.name}</span>
          </nav>
        </div>
        
        {/* Agent Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Agent Image */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition">
                  <Heart className="h-5 w-5 text-gray-300" />
                </button>
                <button className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition">
                  <Share2 className="h-5 w-5 text-gray-300" />
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Agent Info */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
                  {agent.category}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{agent.rating}</span>
                  <span className="text-gray-400">({agent.reviewCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{agent.name}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-400">by</span>
                <Link to={`/creator/${agent.creator}`} className="text-blue-400 hover:text-blue-300 transition">
                  {agent.creator}
                </Link>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">Updated {new Date(agent.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-300 text-lg mb-6">
                {agent.details?.longDescription || agent.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, i) => (
                  <Link 
                    key={i} 
                    to={`/search?tag=${tag}`}
                    className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 p-6 bg-gray-800 rounded-xl border border-gray-700">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{agent.price} ETH</div>
                  <div className="text-gray-400 text-sm">≈ $720.45 USD</div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-300">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Buy Now</span>
                  </button>
                  
                  <a 
                    href="https://chatandbuild.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-transparent border border-gray-600 hover:border-blue-500 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                  >
                    <Bot className="h-5 w-5" />
                    <span>Create Similar</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tabs */}
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
                activeTab === 'reviews' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({agent.reviewCount})
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
                {agent.details?.requirements && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {agent.details.requirements.map((requirement, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="mt-0.5 bg-gray-700 p-1.5 rounded-full">
                            <Check className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                      <div className="text-gray-400">Last Updated</div>
                      <div className="text-white font-medium">{agent.details?.lastUpdated || new Date(agent.updatedAt).toLocaleDateString()}</div>
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
          
          {activeTab === 'reviews' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Review Form */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="text-yellow-400">
                              <Star className="h-6 w-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Review</label>
                        <textarea 
                          className="w-full bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="Share your experience with this agent..."
                        ></textarea>
                      </div>
                      
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition">
                        Submit Review
                      </button>
                    </div>
                  </div>
                  
                  {/* Reviews List */}
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                              <img 
                                src={`https://ui-avatars.com/api/?name=User${i+1}&background=random`} 
                                alt={`User ${i+1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">User{i+1}</div>
                              <div className="text-gray-400 text-xs">
                                {new Date(Date.now() - (i * 86400000)).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star 
                                key={starIndex} 
                                className={`h-4 w-4 ${starIndex < 5 - (i * 0.5) ? 'fill-current' : ''}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm">
                          {i === 0 && "This agent has been incredibly helpful for my projects. The code suggestions are spot-on and it's saved me hours of debugging time. Highly recommended for any developer!"}
                          {i === 1 && "Great agent with lots of useful features. The only reason I'm not giving 5 stars is that it occasionally misunderstands complex requirements, but overall it's been a valuable addition to my workflow."}
                          {i === 2 && "Solid performance and good value for the price. I've been using it for a few weeks now and it's definitely improved my productivity. Would recommend to others in the field."}
                        </p>
                      </div>
                    ))}
                    
                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg border border-gray-700 transition">
                      Load More Reviews
                    </button>
                  </div>
                </div>
                
                <div>
                  {/* Rating Summary */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
                    <h3 className="text-lg font-semibold mb-4">Rating Summary</h3>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl font-bold text-white">{agent.rating}</div>
                      <div>
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(agent.rating) ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <div className="text-gray-400 text-sm">{agent.reviewCount} reviews</div>
                      </div>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = rating === 5 ? 70 : 
                                          rating === 4 ? 20 : 
                                          rating === 3 ? 7 : 
                                          rating === 2 ? 2 : 1;
                        
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 w-12">
                              <span className="text-gray-400">{rating}</span>
                              <Star className="h-3 w-3 text-yellow-400" />
                            </div>
                            
                            <div className="flex-grow h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            
                            <div className="text-gray-400 text-sm w-12 text-right">
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
              {/* Related agents - filter by same category */}
              {[...featuredAgents, ...trendingAgents]
                .filter(a => a.category === agent.category && a.id !== agent.id)
                .slice(0, 4)
                .map((relatedAgent, index) => (
                  <motion.div
                    key={relatedAgent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link to={`/agent/${relatedAgent.id}`} className="block">
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition duration-300 h-full flex flex-col">
                        <div className="relative">
                          <img 
                            src={relatedAgent.image} 
                            alt={relatedAgent.name}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {relatedAgent.category}
                          </div>
                        </div>
                        
                        <div className="p-5 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{relatedAgent.name}</h3>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm">{relatedAgent.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-4 flex-grow">{relatedAgent.description}</p>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                            <span className="text-sm text-gray-400">by {relatedAgent.creator}</span>
                            <span className="text-lg font-bold text-white">{relatedAgent.price} ETH</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
