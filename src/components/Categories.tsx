import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { AgentCategory } from '../types';

interface CategoriesProps {
  categories: AgentCategory[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  // Dynamically get the icon component
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  return (
    <section className="py-16 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our diverse collection of AI agents categorized by their specialized capabilities and use cases.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link 
                to={`/category/${category.id}`}
                className="block bg-gray-800 border border-gray-700 hover:border-primary-500 rounded-xl p-6 text-center transition duration-300 h-full"
              >
                <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full p-4 inline-flex mb-4">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-3 text-white">
                    {getIcon(category.icon)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                <span className="text-primary-400 text-sm font-medium">{category.count} agents</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
