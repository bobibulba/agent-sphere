import React from 'react';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-10"></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-1.5">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">Powered by ChatAndBuild</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Ready to create your own <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI agent</span>?
                </h2>
                
                <p className="text-gray-300 text-lg">
                  Build powerful, customized AI agents with ChatAndBuild's intuitive platform. No coding required.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <a 
                    href="https://chatandbuild.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-300 shadow-glow"
                  >
                    <span>Create Your Agent</span>
                    <Bot className="h-5 w-5" />
                  </a>
                  
                  <a 
                    href="/marketplace" 
                    className="bg-transparent border border-gray-700 hover:border-blue-500 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center space-x-2 transition duration-300"
                  >
                    <span>Browse Marketplace</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="AI Agent Creation" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot className="h-5 w-5 text-blue-400" />
                      <span className="text-white font-medium">ChatAndBuild Platform</span>
                    </div>
                    <p className="text-gray-200 text-sm max-w-md">
                      Create, customize, and deploy AI agents in minutes with our intuitive no-code platform.
                    </p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700 animate-float">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-white">No coding required</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-white">Deploy in minutes</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
