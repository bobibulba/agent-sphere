import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Wallet, Code } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: 'Connect Account',
      description: 'Sign in with your preferred method to access the AgentSphere platform securely.'
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'Browse Agents',
      description: 'Explore our marketplace of unique AI agents with various capabilities and use cases.'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Remix or Use',
      description: 'Use agents directly or remix them to create your own customized AI solutions.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AgentSphere makes it easy to discover, use, and create AI agents in a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-x-1/2 z-0"></div>
              )}
              
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 relative z-10 h-full">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-4 inline-flex text-white mb-4">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  <span className="text-primary-400 mr-2">{index + 1}.</span> {step.title}
                </h3>
                
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
