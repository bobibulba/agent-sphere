import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Bot, Sparkles, BarChart, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: 'Unique AI Agents',
      description: 'Each agent is a unique digital asset with specific capabilities and utility, created using ChatAndBuild technology.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Trading',
      description: 'All transactions are secured by blockchain technology, ensuring safe and transparent trading of agents.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Deployment',
      description: 'Deploy your purchased agents instantly to your projects or applications with our seamless integration.'
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Customizable Agents',
      description: 'Modify and enhance your agents with additional capabilities to suit your specific needs.'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Performance Analytics',
      description: 'Track the performance and usage of your agents with detailed analytics and insights.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Creator Royalties',
      description: 'Creators earn royalties from secondary sales of their agents, incentivizing quality development.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose NFA Exchange</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform offers unique advantages for both users and creators of Non-Fungible Agents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-full">
                <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full p-3 inline-flex mb-4">
                  <div className="text-primary-400">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
