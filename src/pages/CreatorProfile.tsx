import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  ExternalLink,
  Mail,
  Twitter,
  Github,
  Globe,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredAgents, trendingAgents, categories } from '../data/agents';
import { Agent } from '../types';

const CreatorProfile: React.FC = () => {
  const { creatorName } = useParams<{ creatorName: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price'>('popular');
  
  // Find all agents by this creator
  const creatorAgents = [...featuredAgents, ...trendingAgents].filter(
    agent => agent.creator === creatorName
  );
  
  // Filter and sort agents
  const filteredAgents = creatorAgents
    .filter(agent => selectedCategory === 'all' || agent.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'price':
          return parseFloat(a.price) - parseFloat(b.price);
        default:
          return 0;
      }
    });
  
  // Get unique categories from creator's agents
  const creatorCategories = [...new Set(creatorAgents.map(agent => agent.category))];
  
  // Calculate creator stats
  const totalLikes = creatorAgents.reduce((sum, agent) => sum + agent.likes, 0);
  const totalAgents = creatorAgents.length;
  const avgPrice = creatorAgents.reduce((sum, agent) => sum + parseFloat(agent.price), 0) / totalAgents;
  
  // Mock creator data (in a real app, this would come from an API)
  const creatorData = {
    name: creatorName || 'Unknown Creator',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorName || '')}&background=random&size=200`,
    bio: `Passionate AI developer specializing in ${creatorCategories.join(', ').toLowerCase()} solutions. Creating intelligent agents that solve real-world problems and enhance productivity.`,
    location: 'San Francisco, CA',
    joinDate: '2023-06-15',
    website: 'https://example.com',
    twitter: '@creator',
    github: 'creator',
    email: 'creator@example.com',
    verified: true,
    followers: 1247,
    following: 89
  };
  
  if (!creatorName || creatorAgents.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Creator Not Found</h2>
          <p className="text-gray-400 mb-8">The creator you're looking for doesn't exist or has no published agents.</p>
          <Link 
            to="/marketplace" 
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/marketplace" className="hover:text-white transition">Marketplace</Link>
            <span>/</span>
            <span className="text-gray-300">Creator Profile</span>
          </nav>
        </div>

        {/* Creator Header */}
        <motion.div 
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
              <div className="relative mb-4">
                <img 
                  src={creatorData.avatar} 
                  alt={creatorData.name}
                  className="w-32 h-32 rounded-full border-4 border-gray-600"
                />
                {creatorData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{creatorData.name}</h1>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{creatorData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(creatorData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio and Stats */}
            <div className="flex-1">
              <p className="text-gray-300 mb-6 leading-relaxed">{creatorData.bio}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">{totalAgents}</div>
                  <div className="text-gray-400 text-sm">Agents</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">{totalLikes.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Likes</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">{creatorData.followers.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">{avgPrice.toFixed(2)} ETH</div>
                  <div className="text-gray-400 text-sm">Avg Price</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a 
                  href={`mailto:${creatorData.email}`}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Contact</span>
                </a>
                <a 
                  href={creatorData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href={`https://twitter.com/${creatorData.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm">Twitter</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href={`https://github.com/${creatorData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agents Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 lg:mb-0">
              Agents by {creatorData.name} ({filteredAgents.length})
            </h2>
            
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {creatorCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'price')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price">Price: Low to High</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-800 rounded-lg border border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg transition ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Agents Grid/List */}
          {filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No agents found matching your criteria.</div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('popular');
                }}
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/agent/${agent.id}`}>
                    {viewMode === 'grid' ? (
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition duration-300 h-full flex flex-col">
                        <div className="relative">
                          <img 
                            src={agent.image} 
                            alt={agent.name}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-blue-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              {agent.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                            <div className="flex items-center space-x-1 text-white">
                              <Heart className="h-4 w-4 fill-current" />
                              <span className="text-sm">{agent.likes}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-4 flex-1">{agent.description}</p>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                            <span className="text-sm text-gray-400">
                              {new Date(agent.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-lg font-bold text-white">{agent.price} ETH</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition duration-300">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={agent.image} 
                            alt={agent.name}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                                <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
                                  {agent.category}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1 text-white">
                                  <Heart className="h-4 w-4 fill-current" />
                                  <span>{agent.likes}</span>
                                </div>
                                <span className="text-lg font-bold text-white">{agent.price} ETH</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{agent.description}</p>
                            <div className="text-xs text-gray-500">
                              Created {new Date(agent.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorProfile;
