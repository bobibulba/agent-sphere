import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Heart, ArrowUpDown, X, ChevronUp, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, SearchFilters, Category } from '../types';
import { featuredAgents, trendingAgents, categories } from '../data/agents';
import { Link } from 'react-router-dom';

const Marketplace: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([...featuredAgents, ...trendingAgents]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'priceLowToHigh' | 'priceHighToLow' | 'mostLiked' | 'newest'>('priceLowToHigh');
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterSidebarCollapsed, setIsFilterSidebarCollapsed] = useState(true);
  const [likedAgents, setLikedAgents] = useState<Record<string, boolean>>({});

  // Common use cases for filtering
  const useCases = [
    'Content Creation',
    'Data Analysis',
    'Customer Support',
    'Code Generation',
    'Image Generation',
    'Research Assistant',
    'Language Translation',
    'Personalized Learning'
  ];

  // Filter agents based on search criteria
  useEffect(() => {
    let results = agents;
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(agent => agent.category === selectedCategory);
    }
    
    // Filter by use cases
    if (selectedUseCases.length > 0) {
      results = results.filter(agent => 
        agent.useCases && selectedUseCases.some(useCase => 
          agent.useCases.includes(useCase)
        )
      );
    }
    
    // Sort results
    switch (sortBy) {
      case 'priceLowToHigh':
        results = [...results].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceHighToLow':
        results = [...results].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'mostLiked':
        results = [...results].sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
        results = [...results].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    
    setFilteredAgents(results);
  }, [agents, searchQuery, selectedCategory, sortBy, selectedUseCases]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortBy('priceLowToHigh');
    setSelectedUseCases([]);
  };

  const toggleUseCase = (useCase: string) => {
    setSelectedUseCases(prev => 
      prev.includes(useCase) 
        ? prev.filter(uc => uc !== useCase)
        : [...prev, useCase]
    );
  };

  const handleLikeToggle = (agentId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to agent detail page
    e.stopPropagation(); // Stop event propagation
    
    setLikedAgents(prev => {
      const newLikedAgents = { ...prev };
      newLikedAgents[agentId] = !prev[agentId];
      return newLikedAgents;
    });
    
    // Update agent likes count in the state
    setAgents(prev => 
      prev.map(agent => {
        if (agent.id === agentId) {
          return {
            ...agent,
            likes: likedAgents[agentId] ? agent.likes - 1 : agent.likes + 1
          };
        }
        return agent;
      })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center mb-6 gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                <Sparkles className="h-10 w-10 text-primary-400" />
              </motion.div>
              <h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.025em" }}
              >
                AgentSphere Marketplace
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover and deploy powerful AI agents to supercharge your productivity and creativity
            </motion.p>
            
            {/* Search bar */}
            <motion.div 
              className="mt-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for agents, capabilities, or use cases..."
                  className="w-full py-4 px-6 pl-12 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-6">
          <button 
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg text-white transition"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Mobile filter panel */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div 
              className="lg:hidden mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <FilterContent 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                useCases={useCases}
                selectedUseCases={selectedUseCases}
                toggleUseCase={toggleUseCase}
                resetFilters={resetFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className={`hidden lg:block ${isFilterSidebarCollapsed ? 'w-12' : 'w-64'} shrink-0 transition-all duration-300`}>
            <div className="sticky top-6 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                {!isFilterSidebarCollapsed && <h3 className="text-lg font-medium">Filters</h3>}
                <button 
                  onClick={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
                  className={`text-gray-400 hover:text-white flex items-center ${isFilterSidebarCollapsed ? 'mx-auto' : ''}`}
                  aria-label={isFilterSidebarCollapsed ? "Expand filters" : "Collapse filters"}
                >
                  {isFilterSidebarCollapsed ? (
                    <Filter className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {!isFilterSidebarCollapsed && (
                <div className="p-4">
                  <FilterContent 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    useCases={useCases}
                    selectedUseCases={selectedUseCases}
                    toggleUseCase={toggleUseCase}
                    resetFilters={resetFilters}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Sorting and results count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-400">
                Showing {filteredAgents.length} agents
                {selectedCategory && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Sort by:</span>
                <select 
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="mostLiked">Most Liked</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategory || selectedUseCases.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory && (
                  <div className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    <span>Category: {selectedCategory}</span>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {selectedUseCases.map(useCase => (
                  <div key={useCase} className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    <span>{useCase}</span>
                    <button 
                      onClick={() => toggleUseCase(useCase)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={resetFilters}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Agent grid */}
            {filteredAgents.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredAgents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/20 flex flex-col h-full"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <Link to={`/agent/${agent.id}`} className="block h-full flex flex-col">
                      <div className="relative w-full">
                        {/* Standardized image container with fixed aspect ratio */}
                        <div className="w-full aspect-[4/3] overflow-hidden">
                          <img 
                            src={agent.image} 
                            alt={agent.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Category tag */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            {agent.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{agent.name}</h3>
                          <button 
                            onClick={(e) => handleLikeToggle(agent.id, e)}
                            className="flex items-center space-x-1 text-rose-400 hover:text-rose-300 transition-colors"
                            aria-label={likedAgents[agent.id] ? "Unlike" : "Like"}
                          >
                            <Heart className={`h-5 w-5 ${likedAgents[agent.id] ? 'fill-current' : ''} transition-all duration-300 hover:scale-110`} />
                            <span>{likedAgents[agent.id] ? agent.likes + 1 : agent.likes}</span>
                          </button>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {agent.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-700">
                          <span className="text-sm text-gray-400">By {agent.creator}</span>
                          <span className="text-sm font-medium text-white">{agent.price} ETH</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No agents found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query</p>
                <button 
                  className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white transition"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Content Component (used in both mobile and desktop)
interface FilterContentProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  useCases: string[];
  selectedUseCases: string[];
  toggleUseCase: (useCase: string) => void;
  resetFilters: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  useCases,
  selectedUseCases,
  toggleUseCase,
  resetFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    useCases: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border-b border-gray-700 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left mb-2"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="text-md font-medium">Categories</h4>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.categories && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mt-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category.name 
                          ? 'bg-primary-500 bg-opacity-20 text-primary-400' 
                          : 'hover:bg-gray-700 text-gray-300'
                      }`}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.name ? null : category.name
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Use Cases */}
      <div className="border-b border-gray-700 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left mb-2"
          onClick={() => toggleSection('useCases')}
        >
          <h4 className="text-md font-medium">Use Cases</h4>
          {expandedSections.useCases ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.useCases && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mt-3">
                {useCases.map((useCase) => (
                  <div key={useCase} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer w-full">
                      <input 
                        type="checkbox" 
                        checked={selectedUseCases.includes(useCase)}
                        onChange={() => toggleUseCase(useCase)}
                        className="rounded border-gray-600 text-primary-500 focus:ring-primary-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-gray-300">{useCase}</span>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Reset button */}
      <button 
        className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
        onClick={resetFilters}
      >
        Reset All Filters
      </button>
    </div>
  );
};

// Custom ChevronLeft icon component
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

export default Marketplace;
