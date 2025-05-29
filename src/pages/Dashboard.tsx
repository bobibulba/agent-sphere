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
  Coins,
  Twitter,
  Github,
  Save,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [showWalletFull, setShowWalletFull] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Modal states
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const [listPrice, setListPrice] = useState('');
  
  const navigate = useNavigate();

  // Demo user data
  const [user, setUser] = useState({
    name: 'Demo User',
    username: 'demouser',
    bio: 'AI enthusiast and developer exploring the potential of autonomous agents.',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    email: 'user@example.com',
    website: 'https://mywebsite.com',
    twitter: '@demouser',
    github: 'demouser',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo&backgroundColor=b6e3f4',
    joinedDate: 'January 2023'
  });

  // Temporary state for editing
  const [editData, setEditData] = useState(user);

  // Demo agents data
  const myAgents = [
    {
      id: '1',
      name: 'CodeAssistant Pro',
      description: 'AI coding assistant that helps with code completion and debugging.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent1',
      category: 'Development',
      status: 'active',
      isListed: true
    },
    {
      id: '2',
      name: 'DataAnalyzer',
      description: 'Analyzes complex datasets and generates insights and visualizations.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent2',
      category: 'Data Science',
      status: 'active',
      isListed: false
    },
    {
      id: '3',
      name: 'ContentCreator',
      description: 'Generates blog posts, social media content, and marketing copy.',
      image: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent3',
      category: 'Content',
      status: 'inactive',
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

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData(user);
    } else {
      // Start editing - copy current data to edit state
      setEditData(user);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // Save the edited data
    setUser(editData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Agent action handlers
  const handleTransferClick = (agent: any) => {
    setSelectedAgent(agent);
    setTransferAddress('');
    setShowTransferModal(true);
  };

  const handleListClick = (agent: any) => {
    setSelectedAgent(agent);
    setListPrice('');
    setShowListModal(true);
  };

  const handleViewClick = (agent: any) => {
    navigate(`/agent/${agent.id}`);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAddress.trim()) return;
    
    // Here you would handle the transfer logic
    alert(`Agent "${selectedAgent.name}" transferred to ${transferAddress}`);
    setShowTransferModal(false);
    setTransferAddress('');
    setSelectedAgent(null);
  };

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listPrice.trim()) return;
    
    // Here you would handle the listing logic
    alert(`Agent "${selectedAgent.name}" listed for ${listPrice} ETH`);
    setShowListModal(false);
    setListPrice('');
    setSelectedAgent(null);
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
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <motion.button 
                        onClick={handleSaveProfile}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </motion.button>
                      <motion.button 
                        onClick={handleEditToggle}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <motion.button 
                      onClick={handleEditToggle}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </motion.button>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-white">{user.name}</p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  {isEditing ? (
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 py-2">
                      <AtSign className="h-4 w-4 mr-2 text-gray-400" />
                      <input
                        type="text"
                        value={editData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                      <AtSign className="h-4 w-4 mr-2 text-primary-400" />
                      <p className="text-white">{user.username}</p>
                    </div>
                  )}
                </div>
                
                {/* Bio */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Bio</p>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  ) : (
                    <p className="text-white">{user.bio}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  {isEditing ? (
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 py-2">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                      <Mail className="h-4 w-4 mr-2 text-primary-400" />
                      <p className="text-white">{user.email}</p>
                    </div>
                  )}
                </div>

                {/* Website */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Website</p>
                  {isEditing ? (
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 py-2">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <input
                        type="url"
                        value={editData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                      <Globe className="h-4 w-4 mr-2 text-primary-400" />
                      {user.website ? (
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 flex items-center"
                        >
                          {user.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">No website added</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Twitter */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Twitter</p>
                  {isEditing ? (
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 py-2">
                      <Twitter className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-400 mr-1">@</span>
                      <input
                        type="text"
                        value={editData.twitter.replace('@', '')}
                        onChange={(e) => handleInputChange('twitter', '@' + e.target.value.replace('@', ''))}
                        placeholder="username"
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                      <Twitter className="h-4 w-4 mr-2 text-primary-400" />
                      {user.twitter ? (
                        <a 
                          href={`https://twitter.com/${user.twitter.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 flex items-center"
                        >
                          {user.twitter}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">No Twitter added</p>
                      )}
                    </div>
                  )}
                </div>

                {/* GitHub */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">GitHub</p>
                  {isEditing ? (
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 py-2">
                      <Github className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-400 mr-1">github.com/</span>
                      <input
                        type="text"
                        value={editData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        placeholder="username"
                        className="flex-1 bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-900 p-2 rounded-lg">
                      <Github className="h-4 w-4 mr-2 text-primary-400" />
                      {user.github ? (
                        <a 
                          href={`https://github.com/${user.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 flex items-center"
                        >
                          github.com/{user.github}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">No GitHub added</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Wallet Address */}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
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
                      onClick={() => handleTransferClick(agent)}
                      className="text-gray-400 text-sm flex items-center"
                      whileHover={{ scale: 1.05, color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Transfer
                    </motion.button>
                    {!agent.isListed && (
                      <motion.button 
                        onClick={() => handleListClick(agent)}
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
                        onClick={() => handleViewClick(agent)}
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

      {/* Transfer Modal */}
      {showTransferModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Transfer Agent</h3>
            <p className="text-gray-300 mb-6">
              Transfer <span className="font-medium text-white">{selectedAgent.name}</span> to another wallet address.
            </p>
            
            <form onSubmit={handleTransferSubmit}>
              <div className="mb-6">
                <label htmlFor="transferAddress" className="block text-sm font-medium text-gray-400 mb-2">
                  Recipient Wallet Address
                </label>
                <input
                  type="text"
                  id="transferAddress"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  placeholder="0x..."
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                />
              </div>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-medium mb-1">Important Warning</h4>
                    <p className="text-red-300 text-sm">
                      Please double-check the recipient address. This action is <strong>irreversible</strong> and cannot be undone. 
                      Make sure the address is correct before proceeding.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Transfer Agent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTransferModal(false);
                    setSelectedAgent(null);
                    setTransferAddress('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* List Modal */}
      {showListModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">List Agent for Sale</h3>
            <p className="text-gray-300 mb-6">
              Set a price for <span className="font-medium text-white">{selectedAgent.name}</span> to list it on the marketplace.
            </p>
            
            <form onSubmit={handleListSubmit}>
              <div className="mb-6">
                <label htmlFor="listPrice" className="block text-sm font-medium text-gray-400 mb-2">
                  Listing Price (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="listPrice"
                    value={listPrice}
                    onChange={(e) => setListPrice(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">ETH</span>
                  </div>
                </div>
                {listPrice && (
                  <p className="mt-2 text-sm text-gray-400">
                    ≈ ${(parseFloat(listPrice) * 1800).toFixed(2)} USD
                  </p>
                )}
              </div>
              
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Listing Information</h4>
                    <p className="text-blue-300 text-sm">
                      Your agent will be available for purchase on the marketplace. You can update or remove the listing at any time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  List Agent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowListModal(false);
                    setSelectedAgent(null);
                    setListPrice('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
