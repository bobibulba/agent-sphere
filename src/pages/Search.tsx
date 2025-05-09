import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Filter, 
  Star, 
  ChevronDown, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredAgents, trendingAgents, categories } from '../data/agents';
import { Agent, SearchFilters } from '../types';

const Search: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Agent[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'popular'
  });
  
  // Get all agents
  const allAgents = [...featuredAgents, ...trendingAgents];
  
  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || undefined;
    const tag = params.get('tag') || undefined;
    
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      category,
      query: tag || query
    }));
    
    // Filter agents based on query params
    filterAgents(query, { category, query: tag || query });
  }, [location.search]);
  
  // Filter agents based on search query and filters
  const filterAgents = (query: string, currentFilters: SearchFilters = filters) => {
    let filtered = [...allAgents];
    
    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(lowerQuery) ||
        agent.description.toLowerCase().includes(lowerQuery) ||
        agent.creator.toLowerCase().includes(lowerQuery) ||
        agent.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Filter by category
    if (currentFilters.category) {
      filtered = filtered.filter(agent => 
        agent.category.toLowerCase() === currentFilters.category?.toLowerCase()
      );
    }
    
    // Filter by price range
    if (currentFilters.priceMin !== undefined || currentFilters.priceMax !== undefined) {
      filtered = filtered.filter(agent => {
        const price = parseFloat(agent.price);
        if (currentFilters.priceMin !== undefined && price < currentFilters.priceMin) {
          return false;
        }
        if (currentFilters.priceMax !== undefined && price > currentFilters.priceMax) {
          return false;
        }
        return true;
      });
    }
    
    // Filter by rating
    if (currentFilters.rating) {
      filtered = filtered.filter(agent => agent.rating >= currentFilters.rating!);
    }
    
    // Sort results
    if (currentFilters.sortBy) {
      switch (currentFilters.sortBy) {
        case 'popular':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'price':
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }
    
    setResults(filtered);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterAgents(searchQuery, newFilters);
  };
  
  // Clear all filters
  const clearFilters = () => {
    const newFilters = { sortBy: 'popular' };
    setFilters(newFilters);
    filterAgents(searchQuery, newFilters);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterAgents(query);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Sidebar filters - mobile toggle */}
        <div className="w-full md:hidden mb-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <SlidersHorizontal className="h-5 w-5 text-gray-500 mr-2" />
              <span>Filters</span>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Sidebar filters */}
        <div className={`w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${isFilterOpen ? 'max-h-[1000px]' : 'max-h-0 md:max-h-[1000px]'}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
            
            {/* Category filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`category-${category.id}`}
                      name="category"
                      checked={filters.category === category.name}
                      onChange={() => handleFilterChange('category', category.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                      {category.name} ({category.count})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price range filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
              </div>
            </div>
            
            {/* Rating filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Minimum Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`rating-${rating}`}
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange('rating', rating)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      {rating}+ <Star className="h-3 w-3 text-yellow-400 ml-1 inline" fill="currentColor" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sort by filter */}
            <div>
              <h4 className="font-medium mb-2">Sort By</h4>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as SearchFilters['sortBy'])}
                className="w-full p-2 text-sm border border-gray-300 rounded bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Search bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for agents..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  filterAgents('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {/* Active filters */}
          {(filters.category || filters.priceMin !== undefined || filters.priceMax !== undefined || filters.rating) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category && (
                <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Category: {filters.category}
                  <button 
                    onClick={() => handleFilterChange('category', undefined)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {(filters.priceMin !== undefined || filters.priceMax !== undefined) && (
                <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Price: {filters.priceMin || 0} - {filters.priceMax || 'Any'}
                  <button 
                    onClick={() => {
                      handleFilterChange('priceMin', undefined);
                      handleFilterChange('priceMax', undefined);
                    }}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {filters.rating && (
                <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Rating: {filters.rating}+
                  <button 
                    onClick={() => handleFilterChange('rating', undefined)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Results count */}
          <div className="mb-4">
            <p className="text-gray-600">
              {results.length} {results.length === 1 ? 'agent' : 'agents'} found
              {searchQuery && ` for "${searchQuery}"`}
              {filters.category && ` in ${filters.category}`}
            </p>
          </div>
          
          {/* Results grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <Link to={`/agent/${agent.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={agent.image} 
                        alt={agent.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">by {agent.creator}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          ${agent.price}/min
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{agent.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({agent.reviewCount})</span>
                        </div>
                        <span className="text-xs text-gray-500">{agent.category}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <SearchIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
