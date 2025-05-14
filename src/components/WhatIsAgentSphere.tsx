import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Wallet, BarChart3 } from 'lucide-react';

const WhatIsAgentSphere: React.FC = () => {
  const points = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'Own Unique AI Agents',
      description: 'Discover and collect one-of-a-kind AI agents with unique capabilities and personalities.'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Use or Trade Them',
      description: 'Deploy agents in your projects or trade them with others in our secure marketplace.'
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: 'Buy with Crypto or Fiat',
      description: 'Flexible payment options including cryptocurrency and traditional payment methods.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What Is AgentSphere</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AgentSphere is the premier marketplace for unique AI agents, where you can discover, own, and trade digital intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 relative z-10 h-full">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-4 inline-flex text-white mb-4">
                  {point.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{point.title}</h3>
                
                <p className="text-gray-400">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAgentSphere;
