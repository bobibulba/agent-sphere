import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, ArrowUpDown, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Agent, SearchFilters, Category } from '../types';
import { featuredAgents, trendingAgents, categories } from '../data/agents';
import { Link } from 'react-router-dom';

const Marketplace: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([...featuredAgents, ...trendingAgents]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating' | 'newest'>('popular');
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    
    // Filter by price
    results = results.filter(agent => {
      const price = parseFloat(agent.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter by rating
    if (minRating > 0) {
      results = results.filter(agent => agent.rating >= minRating);
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
      case 'price':
        results = [...results].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results = [...results].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
      default:
        results = [...results].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    setFilteredAgents(results);
  }, [agents, searchQuery, selectedCategory, priceRange, minRating, sortBy, selectedUseCases]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 1]);
    setMinRating(0);
    setSortBy('popular');
    setSelectedUseCases([]);
  };

  const toggleUseCase = (useCase: string) => {
    setSelectedUseCases(prev => 
      prev.includes(useCase) 
        ? prev.filter(uc => uc !== useCase)
        : [...prev, useCase]
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
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Agent Marketplace
            </motion.h1>
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
        {isMobileFilterOpen && (
          <motion.div 
            className="lg:hidden mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
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
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              useCases={useCases}
              selectedUseCases={selectedUseCases}
              toggleUseCase={toggleUseCase}
              resetFilters={resetFilters}
            />
          </motion.div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6 bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-6">Filters</h3>
              
              <FilterContent 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                useCases={useCases}
                selectedUseCases={selectedUseCases}
                toggleUseCase={toggleUseCase}
                resetFilters={resetFilters}
              />
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
                  <option value="popular">Most Popular</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategory || minRating > 0 || selectedUseCases.length > 0) && (
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
                
                {minRating > 0 && (
                  <div className="bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    <span>Rating: {minRating}+ stars</span>
                    <button 
                      onClick={() => setMinRating(0)}
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
                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/20"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img 
                        src={agent.image} 
                        alt={agent.name} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 px-2 py-1 rounded-full text-sm font-medium">
                        ${agent.price} / query
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{agent.name}</h3>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{agent.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">By {agent.creator}</span>
                        <Link 
                          to={`/agent/${agent.id}`}
                          className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-full text-white text-sm font-medium transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
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
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  useCases: string[];
  selectedUseCases: string[];
  toggleUseCase: (useCase: string) => void;
  resetFilters: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  useCases,
  selectedUseCases,
  toggleUseCase,
  resetFilters
}) => {
  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h4 className="text-md font-medium mb-3">Price Range</h4>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">$0</span>
            <span className="text-sm text-gray-400">Max: ${priceRange[1].toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div>
        <h4 className="text-md font-medium mb-3">Categories</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
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
      </div>
      
      {/* Minimum Rating */}
      <div>
        <h4 className="text-md font-medium mb-3">Minimum Rating</h4>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`p-1.5 rounded-md ${
                minRating >= rating ? 'text-yellow-400' : 'text-gray-500'
              }`}
              onClick={() => setMinRating(rating === minRating ? 0 : rating)}
            >
              <Star className="h-5 w-5 fill-current" />
            </button>
          ))}
          {minRating > 0 && (
            <button 
              className="ml-2 text-xs text-gray-400 hover:text-white"
              onClick={() => setMinRating(0)}
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {/* Use Cases */}
      <div>
        <h4 className="text-md font-medium mb-3">Use Cases</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
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

export default Marketplace;
