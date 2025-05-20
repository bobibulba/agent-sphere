import { Agent, Category } from '../types';

export const featuredAgents: Agent[] = [
  {
    id: "1",
    name: "CodeAssist Pro",
    description: "Advanced coding assistant with real-time pair programming capabilities.",
    creator: "ChatAndBuild Labs",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.25",
    likes: 342, // Changed from rating
    reviewCount: 342,
    category: "Development",
    capabilities: ["Code completion", "Bug detection", "Refactoring", "Documentation"],
    tags: ["coding", "development", "programming"],
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2023-10-20T14:30:00Z",
    details: {
      longDescription: "CodeAssist Pro is an advanced AI coding assistant that helps developers write better code faster. It provides real-time suggestions, identifies potential bugs, and offers refactoring options to improve code quality. With its pair programming capabilities, it's like having an expert developer by your side at all times.",
      useCases: [
        "Real-time code completion and suggestions",
        "Automated bug detection and fixes",
        "Code refactoring and optimization",
        "Documentation generation",
        "Learning new programming languages"
      ],
      requirements: [
        "Compatible with VS Code, JetBrains IDEs, and web-based editors",
        "Supports JavaScript, TypeScript, Python, Java, and more",
        "Internet connection required for real-time suggestions"
      ],
      version: "2.3.0",
      lastUpdated: "October 20, 2023"
    }
  },
  {
    id: "2",
    name: "DesignGenius",
    description: "UI/UX design assistant that helps create beautiful interfaces with wireframing and color palette suggestions.",
    creator: "PixelPerfect Studios",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.35",
    likes: 256, // Changed from rating
    reviewCount: 256,
    category: "Design",
    capabilities: ["Wireframing", "Color palette", "Components", "Responsive design"],
    tags: ["design", "ui", "ux"],
    createdAt: "2023-08-22T09:15:00Z",
    updatedAt: "2023-10-18T11:45:00Z",
    details: {
      longDescription: "DesignGenius is your AI design partner that helps create beautiful and functional user interfaces. From wireframing to color palette selection, it assists designers in making informed decisions and creating cohesive designs. It can generate component suggestions based on your design system and ensure responsive layouts across all devices.",
      useCases: [
        "Wireframe generation from text descriptions",
        "Color palette suggestions based on brand guidelines",
        "Component library recommendations",
        "Responsive design checking",
        "Design system consistency validation"
      ],
      requirements: [
        "Works with Figma, Adobe XD, and Sketch",
        "Supports web and mobile app design",
        "Exports to various formats including SVG and PNG"
      ],
      version: "1.8.5",
      lastUpdated: "October 18, 2023"
    }
  },
  {
    id: "3",
    name: "DataWizard",
    description: "Data analysis and visualization assistant for business intelligence with powerful insights extraction.",
    creator: "AnalyticsPro",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.45",
    likes: 189, // Changed from rating
    reviewCount: 189,
    category: "Analytics",
    capabilities: ["Data cleaning", "Analysis", "Visualization", "Reporting"],
    tags: ["data", "analytics", "business intelligence"],
    createdAt: "2023-07-10T14:20:00Z",
    updatedAt: "2023-10-15T16:30:00Z",
    details: {
      longDescription: "DataWizard transforms raw data into actionable insights through advanced analysis and beautiful visualizations. It automates data cleaning processes, identifies patterns and trends, and generates comprehensive reports. With natural language querying, you can ask questions about your data and receive instant answers with supporting visualizations.",
      useCases: [
        "Automated data cleaning and preparation",
        "Pattern and anomaly detection",
        "Interactive dashboard creation",
        "Natural language data querying",
        "Predictive analytics and forecasting"
      ],
      requirements: [
        "Supports CSV, Excel, SQL databases, and API connections",
        "Works with Tableau, Power BI, and custom web dashboards",
        "Handles datasets up to 100GB in size"
      ],
      version: "3.2.1",
      lastUpdated: "October 15, 2023"
    }
  },
  {
    id: "4",
    name: "ContentCraft",
    description: "Content creation assistant that helps generate engaging blog posts, social media content, and marketing copy.",
    creator: "WordSmith AI",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.30",
    likes: 215, // Changed from rating
    reviewCount: 215,
    category: "Content",
    capabilities: ["Blog writing", "Social media", "Email campaigns", "SEO optimization"],
    tags: ["content", "writing", "marketing"],
    createdAt: "2023-09-05T11:30:00Z",
    updatedAt: "2023-10-22T09:15:00Z",
    details: {
      longDescription: "ContentCraft is an AI-powered content creation assistant that helps marketers, bloggers, and businesses generate engaging written content. From blog posts to social media updates, it can create content that resonates with your target audience while maintaining your brand voice. It also provides SEO optimization suggestions to improve content visibility.",
      useCases: [
        "Blog post generation and optimization",
        "Social media content calendar creation",
        "Email marketing campaign development",
        "Product description writing",
        "SEO-focused content strategy"
      ],
      requirements: [
        "Integrates with WordPress, Medium, and major CMS platforms",
        "Supports multiple languages including English, Spanish, and French",
        "Connects with social media management tools"
      ],
      version: "2.1.3",
      lastUpdated: "October 22, 2023"
    }
  },
  {
    id: "5",
    name: "FinanceGPT",
    description: "Financial analysis and investment assistant with market insights and portfolio management capabilities.",
    creator: "QuantEdge",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.55",
    likes: 176, // Changed from rating
    reviewCount: 176,
    category: "Finance",
    capabilities: ["Market analysis", "Portfolio management", "Risk assessment", "Financial planning"],
    tags: ["finance", "investing", "trading"],
    createdAt: "2023-08-15T08:45:00Z",
    updatedAt: "2023-10-19T13:20:00Z",
    details: {
      longDescription: "FinanceGPT is your AI financial advisor, providing market analysis, investment recommendations, and portfolio management assistance. It tracks market trends, analyzes company fundamentals, and helps you make informed investment decisions. With risk assessment tools and financial planning capabilities, it's a comprehensive solution for individual investors and financial professionals.",
      useCases: [
        "Real-time market analysis and insights",
        "Portfolio diversification recommendations",
        "Risk assessment and mitigation strategies",
        "Retirement and financial goal planning",
        "Tax optimization suggestions"
      ],
      requirements: [
        "Connects to major brokerages and financial data providers",
        "Supports stocks, bonds, ETFs, cryptocurrencies, and more",
        "Requires account linking for personalized recommendations"
      ],
      version: "2.4.7",
      lastUpdated: "October 19, 2023"
    }
  },
  {
    id: "6",
    name: "LegalAssist",
    description: "Legal document analysis and contract review assistant with compliance checking and risk identification.",
    creator: "LawTech Solutions",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.50",
    likes: 142, // Changed from rating
    reviewCount: 142,
    category: "Legal",
    capabilities: ["Contract review", "Compliance checking", "Risk identification", "Document drafting"],
    tags: ["legal", "contracts", "compliance"],
    createdAt: "2023-07-25T15:10:00Z",
    updatedAt: "2023-10-17T10:45:00Z",
    details: {
      longDescription: "LegalAssist is an AI-powered legal assistant that helps lawyers and businesses analyze legal documents, review contracts, and ensure compliance with relevant regulations. It can identify potential risks in agreements, suggest alternative clauses, and even assist in drafting new documents based on templates and requirements.",
      useCases: [
        "Contract review and risk identification",
        "Compliance checking against multiple jurisdictions",
        "Legal document drafting assistance",
        "Case law research and citation",
        "Due diligence process automation"
      ],
      requirements: [
        "Supports PDF, Word, and plain text document formats",
        "Knowledge base covers US, EU, and UK legal frameworks",
        "Integrates with major legal document management systems"
      ],
      version: "1.9.2",
      lastUpdated: "October 17, 2023"
    }
  }
];

export const trendingAgents: Agent[] = [
  {
    id: "7",
    name: "VideoGenius",
    description: "Video editing and production assistant with scene suggestions, transitions, and effects recommendations.",
    creator: "MediaLabs",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.40",
    likes: 198, // Changed from rating
    reviewCount: 198,
    category: "Media",
    capabilities: ["Video editing", "Scene suggestions", "Transitions", "Effects"],
    tags: ["video", "editing", "production"],
    createdAt: "2023-09-20T13:15:00Z",
    updatedAt: "2023-10-21T15:30:00Z",
    details: {
      longDescription: "VideoGenius is an AI video production assistant that helps creators edit and enhance their videos. It can suggest scene arrangements, recommend transitions and effects, and even generate B-roll footage suggestions. With its intelligent editing capabilities, it streamlines the video production process while maintaining creative control.",
      useCases: [
        "Automated video editing suggestions",
        "Scene arrangement optimization",
        "Transition and effect recommendations",
        "Color grading assistance",
        "Audio enhancement and synchronization"
      ],
      requirements: [
        "Works with Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve",
        "Supports common video formats including MP4, MOV, and AVI",
        "Requires minimum 8GB RAM for optimal performance"
      ],
      version: "1.5.3",
      lastUpdated: "October 21, 2023"
    }
  },
  {
    id: "8",
    name: "HealthCoach",
    description: "Personal health and wellness assistant with nutrition planning, workout routines, and health tracking.",
    creator: "WellnessAI",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.35",
    likes: 267, // Changed from rating
    reviewCount: 267,
    category: "Health",
    capabilities: ["Nutrition planning", "Workout routines", "Health tracking", "Habit formation"],
    tags: ["health", "fitness", "wellness"],
    createdAt: "2023-08-10T09:30:00Z",
    updatedAt: "2023-10-16T14:15:00Z",
    details: {
      longDescription: "HealthCoach is your personal AI wellness assistant, providing customized nutrition plans, workout routines, and health tracking capabilities. It adapts to your goals, preferences, and progress, offering personalized recommendations to improve your overall wellbeing. With habit formation strategies and motivational support, it helps you maintain a healthy lifestyle long-term.",
      useCases: [
        "Personalized meal planning and nutrition advice",
        "Custom workout routines based on goals and equipment",
        "Health metrics tracking and progress visualization",
        "Sleep quality improvement suggestions",
        "Stress management and mindfulness practices"
      ],
      requirements: [
        "Integrates with fitness trackers and smartwatches",
        "Connects with nutrition and workout apps",
        "Available on iOS and Android devices"
      ],
      version: "2.2.4",
      lastUpdated: "October 16, 2023"
    }
  },
  {
    id: "9",
    name: "TravelPlanner",
    description: "Travel itinerary and booking assistant with personalized recommendations and local insights.",
    creator: "WanderWise",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.30",
    likes: 221, // Changed from rating
    reviewCount: 221,
    category: "Travel",
    capabilities: ["Itinerary planning", "Booking assistance", "Local recommendations", "Budget management"],
    tags: ["travel", "vacation", "planning"],
    createdAt: "2023-09-12T10:45:00Z",
    updatedAt: "2023-10-20T11:30:00Z",
    details: {
      longDescription: "TravelPlanner is an AI travel assistant that helps you plan and book your perfect trip. It creates personalized itineraries based on your interests, budget, and travel style, while providing local insights and hidden gems. From flight and accommodation recommendations to daily activity scheduling, it handles all aspects of your travel planning.",
      useCases: [
        "Personalized travel itinerary creation",
        "Flight and accommodation booking assistance",
        "Local attraction and restaurant recommendations",
        "Budget tracking and optimization",
        "Real-time travel updates and adjustments"
      ],
      requirements: [
        "Covers destinations worldwide with detailed information",
        "Integrates with major booking platforms and travel services",
        "Works offline with downloadable itineraries and maps"
      ],
      version: "1.7.2",
      lastUpdated: "October 20, 2023"
    }
  },
  {
    id: "10",
    name: "MusicMuse",
    description: "Music composition and production assistant with melody generation, chord progression, and arrangement suggestions.",
    creator: "SonicLabs",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.45",
    likes: 178, // Changed from rating
    reviewCount: 178,
    category: "Music",
    capabilities: ["Melody generation", "Chord progressions", "Arrangement", "Mixing assistance"],
    tags: ["music", "production", "composition"],
    createdAt: "2023-08-05T16:20:00Z",
    updatedAt: "2023-10-18T09:45:00Z",
    details: {
      longDescription: "MusicMuse is an AI music composition and production assistant that helps musicians create original music. It can generate melodies, suggest chord progressions, and provide arrangement ideas across various genres and styles. With its mixing and mastering assistance, it helps you achieve professional-quality sound in your productions.",
      useCases: [
        "Melody and chord progression generation",
        "Arrangement suggestions and structure optimization",
        "Instrument selection and sound design",
        "Mixing and mastering assistance",
        "Writer's block solutions with creative prompts"
      ],
      requirements: [
        "Integrates with major DAWs including Ableton, Logic Pro, and FL Studio",
        "Supports MIDI and audio file import/export",
        "Works with VST plugins and virtual instruments"
      ],
      version: "2.0.1",
      lastUpdated: "October 18, 2023"
    }
  },
  {
    id: "11",
    name: "EduTutor",
    description: "Educational tutoring assistant with personalized learning paths, interactive lessons, and progress tracking.",
    creator: "LearnSmart",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.35",
    likes: 312, // Changed from rating
    reviewCount: 312,
    category: "Education",
    capabilities: ["Personalized tutoring", "Interactive lessons", "Progress tracking", "Adaptive learning"],
    tags: ["education", "tutoring", "learning"],
    createdAt: "2023-07-15T11:30:00Z",
    updatedAt: "2023-10-19T16:45:00Z",
    details: {
      longDescription: "EduTutor is an AI educational assistant that provides personalized tutoring across various subjects and grade levels. It creates customized learning paths based on individual needs and learning styles, offering interactive lessons and exercises. With its adaptive learning capabilities, it adjusts difficulty and focus areas based on student progress.",
      useCases: [
        "One-on-one tutoring in multiple subjects",
        "Personalized learning path creation",
        "Interactive problem-solving assistance",
        "Progress tracking and performance analysis",
        "Exam preparation and practice tests"
      ],
      requirements: [
        "Covers K-12 curriculum and introductory college courses",
        "Supports multiple languages for global education",
        "Works on desktop and mobile devices with internet connection"
      ],
      version: "3.1.5",
      lastUpdated: "October 19, 2023"
    }
  },
  {
    id: "12",
    name: "GameDesigner",
    description: "Game design and development assistant with level design, character creation, and gameplay mechanics suggestions.",
    creator: "PixelForge",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: "0.50",
    likes: 156, // Changed from rating
    reviewCount: 156,
    category: "Gaming",
    capabilities: ["Level design", "Character creation", "Gameplay mechanics", "Narrative development"],
    tags: ["game design", "development", "gaming"],
    createdAt: "2023-09-08T14:15:00Z",
    updatedAt: "2023-10-22T12:30:00Z",
    details: {
      longDescription: "GameDesigner is an AI game development assistant that helps creators design and build engaging games. From level design and character creation to gameplay mechanics and narrative development, it provides suggestions and solutions throughout the game development process. It can generate assets, balance gameplay elements, and even help with debugging.",
      useCases: [
        "Level design and environment creation",
        "Character design and balancing",
        "Gameplay mechanics development",
        "Narrative and quest design",
        "Asset generation and optimization"
      ],
      requirements: [
        "Integrates with Unity, Unreal Engine, and Godot",
        "Supports 2D and 3D game development",
        "Compatible with major asset creation tools"
      ],
      version: "1.4.8",
      lastUpdated: "October 22, 2023"
    }
  }
];

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Development",
    description: "Coding and development assistants to help build software faster and better.",
    icon: "Code",
    count: 156,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat2",
    name: "Design",
    description: "Design assistants for UI/UX, graphic design, and creative work.",
    icon: "Palette",
    count: 124,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat3",
    name: "Content",
    description: "Content creation assistants for writing, editing, and marketing.",
    icon: "FileText",
    count: 98,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat4",
    name: "Analytics",
    description: "Data analysis and business intelligence assistants.",
    icon: "BarChart",
    count: 87,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat5",
    name: "Finance",
    description: "Financial analysis and investment assistants.",
    icon: "DollarSign",
    count: 76,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat6",
    name: "Education",
    description: "Educational and tutoring assistants for learning.",
    icon: "GraduationCap",
    count: 112,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat7",
    name: "Health",
    description: "Health and wellness assistants for personal wellbeing.",
    icon: "Heart",
    count: 94,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat8",
    name: "Legal",
    description: "Legal assistants for document review and compliance.",
    icon: "Scale",
    count: 68,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];
