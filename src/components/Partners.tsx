import React from 'react';
import { motion } from 'framer-motion';

const Partners: React.FC = () => {
  const partners = [
    {
      name: 'Pivotal',
      logo: 'https://cdn.chatandbuild.com/images/pivotal-logo.svg',
      description: 'Powering intelligent agent development with advanced AI capabilities.'
    },
    {
      name: 'BNB Chain',
      logo: 'https://cdn.chatandbuild.com/images/bnb-chain-logo.svg',
      description: 'Providing secure blockchain infrastructure for agent transactions.'
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Partners</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We collaborate with industry leaders to bring you the most advanced AI agent ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-48 h-24 mb-6 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    const parent = target.parentNode as HTMLElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-2xl font-bold text-primary-400';
                      fallback.textContent = partner.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{partner.name}</h3>
              
              <p className="text-gray-400">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
