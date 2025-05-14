import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Bot, 
  Activity, 
  ShoppingBag, 
  Settings, 
  Copy, 
  Check, 
  ChevronRight,
  Star,
  Clock,
  Calendar,
  Wallet,
  Mail,
  AtSign,
  AlertCircle,
  Bell,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Zap,
  LayoutDashboard,
  Send,
  Tag,
  ExternalLink,
  Plus,
  CreditCard,
  DollarSign,
  Bitcoin,
  Coins
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [showWalletFull, setShowWalletFull] = useState(false);

  // Demo user data
  const user = {
    name: 'Demo User',
    username: 'demouser',
    bio: 'AI enthusiast and developer exploring the potential of autonomous agents.',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    email: 'user@example.com',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo&backgroundColor=b6e3f4',
    joinedDate: 'January 2023'
  };

  // Demo agents data
  const myAgents = [
    {
      id: '1',
      name: 'CodeAssistant Pro',
      description: 'AI coding assistant that helps with code completion and debugging.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent1',
      category: 'Development',
      status: 'active',
      usageCount: 156,
      lastUsed: '2 hours ago',
      isListed: true
    },
    {
      id: '2',
      name: 'DataAnalyzer',
      description: 'Analyzes complex datasets and generates insights and visualizations.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent2',
      category: 'Data Science',
      status: 'active',
      usageCount: 89,
      lastUsed: '1 day ago',
      isListed: false
    },
    {
      id: '3',
      name: 'ContentCreator',
      description: 'Generates blog posts, social media content, and marketing copy.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent3',
      category: 'Content',
      status: 'inactive',
      usageCount: 42,
      lastUsed: '2 weeks ago',
      isListed: false
    }
  ];

  // Demo activity data
  const activities = [
    {
      id: '1',
      type: 'agent_used',
      agentName: 'CodeAssistant Pro',
      date: '2 hours ago',
      details: 'Used for debugging a React component'
    },
    {
      id: '2',
      type: 'agent_purchased',
      agentName: 'DataAnalyzer',
      date: '3 days ago',
      details: 'Purchased for 0.05 ETH'
    },
    {
      id: '3',
      type: 'agent_reviewed',
      agentName: 'CodeAssistant Pro',
      date: '1 week ago',
      details: 'Left a 5-star review'
    },
    {
      id: '4',
      type: 'agent_updated',
      agentName: 'ContentCreator',
      date: '2 weeks ago',
      details: 'Updated agent settings'
    },
    {
      id: '5',
      type: 'profile_updated',
      date: '1 month ago',
      details: 'Updated profile information'
    }
  ];

  // Demo listings data
  const listings = [
    {
      id: '1',
      name: 'ResearchAssistant',
      description: 'Helps with academic research, citation management, and paper summaries.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=listing1',
      price: '0.08 ETH',
      status: 'active',
      created: '2 months ago',
      sales: 12
    },
    {
      id: '2',
      name: 'FinanceAdvisor',
      description: 'Provides financial analysis, investment advice, and portfolio management.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=listing2',
      price: '0.15 ETH',
      status: 'pending',
      created: '1 week ago',
      sales: 0
    }
  ];

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const truncateWalletAddress = (address: string) => {
    if (showWalletFull) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1, scale: 1.05 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent flex items-center">
        <LayoutDashboard className="h-8 w-8 mr-3 text-primary-400" />
        Dashboard
      </h1>

      {/* Dashboard Tabs */}
      <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
        <motion.button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center px-4 py-2 mr-4 rounded-lg ${
            activeTab === 'profile' 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          variants={tabVariants}
          animate={activeTab === 'profile' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-5 w-5 mr-2" />
          Profile Info
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('agents')}
          className={`flex items-center px-4 py-2 mr-4 rounded-lg ${
            activeTab === 'agents' 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          variants={tabVariants}
          animate={activeTab === 'agents' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="h-5 w-5 mr-2" />
          My Agents
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center px-4 py-2 mr-4 rounded-lg ${
            activeTab === 'activity' 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          variants={tabVariants}
          animate={activeTab === 'activity' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Activity className="h-5 w-5 mr-2" />
          Activity
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center px-4 py-2 mr-4 rounded-lg ${
            activeTab === 'listings' 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          variants={tabVariants}
          animate={activeTab === 'listings' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Listings
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center px-4 py-2 mr-4 rounded-lg ${
            activeTab === 'preferences' 
              ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          variants={tabVariants}
          animate={activeTab === 'preferences' ? 'active' : 'inactive'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="h-5 w-5 mr-2" />
          Preferences
        </motion.button>
      </div>

      {/* Profile Info */}
      {activeTab === 'profile' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <div className="relative">
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-primary-500"
                />
                <motion.button 
                  className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="h-4 w-4 text-white" />
                </motion.button>
              </div>
              <h2 className="text-xl font-bold mt-4">{user.name}</h2>
              <p className="text-gray-400 flex items-center">
                <AtSign className="h-4 w-4 mr-1" />
                {user.username}
              </p>
              <p className="text-gray-400 text-sm mt-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {user.joinedDate}
              </p>
            </div>
            
            <div className="md:w-2/3 md:pl-8 border-t md:border-t-0 md:border-l border-gray-700 md:pl-8 pt-6 md:pt-0">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <motion.button 
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Bio</p>
                  <p className="text-white">{user.bio}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Wallet Address</p>
                  <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                    <Wallet className="h-4 w-4 mr-2 text-primary-400" />
                    <p className="text-white font-mono text-sm flex-1 truncate">
                      {truncateWalletAddress(user.walletAddress)}
                    </p>
                    <button 
                      onClick={() => setShowWalletFull(!showWalletFull)}
                      className="text-gray-400 hover:text-white mr-2"
                    >
                      {showWalletFull ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <motion.button 
                      onClick={copyWalletAddress}
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copiedWallet ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </motion.button>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                    <Mail className="h-4 w-4 mr-2 text-primary-400" />
                    <p className="text-white">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* My Agents */}
      {activeTab === 'agents' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Agents</h2>
            <div className="flex space-x-3">
              <motion.button 
                className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
                whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </motion.button>
              <motion.button 
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="h-4 w-4 mr-2" />
                Browse More Agents
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAgents.map(agent => (
              <motion.div 
                key={agent.id}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary-500 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="p-4 flex items-center space-x-4">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-16 h-16 rounded-lg bg-gray-700"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-white">{agent.name}</h3>
                      {agent.isListed && (
                        <span className="ml-2 bg-primary-900 text-primary-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Tag className="h-3 w-3 mr-1" />
                          Listed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{agent.category}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                        agent.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          agent.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                        {agent.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{agent.description}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-primary-400" />
                      {agent.usageCount} uses
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-primary-400" />
                      Last used {agent.lastUsed}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 p-3 bg-gray-850 flex justify-between">
                  <motion.button 
                    className="text-primary-400 text-sm flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Use Agent
                  </motion.button>
                  <div className="flex space-x-3">
                    <motion.button 
                      className="text-gray-400 text-sm flex items-center"
                      whileHover={{ scale: 1.05, color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Transfer
                    </motion.button>
                    {!agent.isListed && (
                      <motion.button 
                        className="text-gray-400 text-sm flex items-center"
                        whileHover={{ scale: 1.05, color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Tag className="h-4 w-4 mr-1" />
                        List
                      </motion.button>
                    )}
                    {agent.isListed && (
                      <motion.button 
                        className="text-gray-400 text-sm flex items-center"
                        whileHover={{ scale: 1.05, color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Activity */}
      {activeTab === 'activity' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {activities.map(activity => (
              <div 
                key={activity.id}
                className="border-l-2 border-primary-500 pl-4 pb-4 relative"
              >
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-0"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">
                      {activity.type === 'agent_used' && `Used ${activity.agentName}`}
                      {activity.type === 'agent_purchased' && `Purchased ${activity.agentName}`}
                      {activity.type === 'agent_reviewed' && `Reviewed ${activity.agentName}`}
                      {activity.type === 'agent_updated' && `Updated ${activity.agentName}`}
                      {activity.type === 'profile_updated' && 'Updated Profile'}
                    </h3>
                    <p className="text-sm text-gray-400">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <motion.button 
              className="text-primary-400 hover:text-primary-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Activity
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Listings */}
      {activeTab === 'listings' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Listings</h2>
            <motion.button 
              className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="h-4 w-4 mr-2" />
              Create New Listing
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map(listing => (
              <motion.div 
                key={listing.id}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="p-4 flex items-center space-x-4">
                  <img 
                    src={listing.image} 
                    alt={listing.name} 
                    className="w-16 h-16 rounded-lg bg-gray-700"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-white">{listing.name}</h3>
                      <span className="text-primary-400 font-medium">{listing.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                        listing.status === 'active' ? 'bg-green-900 text-green-300' : 
                        listing.status === 'pending' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          listing.status === 'active' ? 'bg-green-400' : 
                          listing.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></span>
                        {listing.status === 'active' ? 'Active' : 
                         listing.status === 'pending' ? 'Pending Review' : 'Inactive'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        {listing.sales} sales
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{listing.description}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {listing.created}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 p-3 bg-gray-850 flex justify-end">
                  <motion.button 
                    className="text-primary-400 text-sm flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Listing
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {listings.length === 0 && (
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Listings Yet</h3>
              <p className="text-gray-400 mb-6">You haven't created any agent listings yet.</p>
              <motion.button 
                className="bg-primary-500 text-white px-4 py-2 rounded-lg inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="h-4 w-4 mr-2" />
                Create Your First Listing
              </motion.button>
            </div>
          )}
        </motion.div>
      )}

      {/* Preferences */}
      {activeTab === 'preferences' && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Bell className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive emails about your activity</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Bell className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Agent Updates</p>
                      <p className="text-sm text-gray-400">Get notified about agent updates and new features</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Bell className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-gray-400">Receive updates about new agents and promotions</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium mb-4">Currency & Payment</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Coins className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Preferred Currency</p>
                      <p className="text-sm text-gray-400">Select your default currency for transactions</p>
                    </div>
                  </div>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>ETH</option>
                    <option>BNB</option>
                    <option>USDT</option>
                    <option>USDC</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm text-gray-400">Choose your preferred payment method</p>
                    </div>
                  </div>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Crypto Wallet</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <motion.button 
                    className="bg-primary-500 text-white px-3 py-1 text-sm rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enable
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Login Alerts</p>
                      <p className="text-sm text-gray-400">Get notified of new or unusual login attempts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium mb-4">Privacy</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-400">Control who can see your profile</p>
                    </div>
                  </div>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <Eye className="h-5 w-5 text-primary-400 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Activity Visibility</p>
                      <p className="text-sm text-gray-400">Control who can see your activity</p>
                    </div>
                  </div>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <motion.button 
                className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Preferences
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
