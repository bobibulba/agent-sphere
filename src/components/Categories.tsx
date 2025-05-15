import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { 
  Code, 
  Palette, 
  FileText, 
  BarChart, 
  DollarSign, 
  GraduationCap, 
  Heart, 
  Scale,
  ChevronRight
} from 'lucide-react';

interface CategoriesProps {
  categories: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
  'Code': <Code className="h-6 w-6" />,
  'Palette': <Palette className="h-6 w-6" />,
  'FileText': <FileText className="h-6 w-6" />,
  'BarChart': <BarChart className="h-6 w-6" />,
  'DollarSign': <DollarSign className="h-6 w-6" />,
  'GraduationCap': <GraduationCap className="h-6 w-6" />,
  'Heart': <Heart className="h-6 w-6" />,
  'Scale': <Scale className="h-6 w-6" />
};

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by Category</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our diverse collection of AI agents organized by specialized categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary-500 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <Link to={`/marketplace?category=${category.name}`} className="block h-full">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <span className="px-2 py-1 bg-gray-700 bg-opacity-80 text-primary-400 text-sm rounded">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-primary-400">
                      <span className="text-sm font-medium">Explore category</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-primary-400">
                      {iconMap[category.icon]}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/marketplace"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
