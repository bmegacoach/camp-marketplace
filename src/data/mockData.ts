import { Agent, User, Transaction, CampRank, CamperRole, TechBadge, Achievement, Challenge, Collaboration, CampEvent } from '../types';

// Mock Users (Campers)
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'alex.chen@camp.ai',
    username: 'alexchen',
    fullName: 'Alex Chen',
    avatar: 'https://i.pravatar.cc/150?img=33',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    bio: 'Building autonomous trading systems. Former quant trader turned AI researcher.',
    campRole: 'builder',
    campRank: 'platinum',
    collaborationMetrics: {
      score: 92,
      projectsCompleted: 12,
      partnersCount: 8,
      activeCols: 3,
    },
    projectsBuilt: 15,
    techBadges: ['react', 'python', 'ai-ml', 'blockchain'],
    achievements: [
      { id: 'ach-1', type: 'mentor', name: 'Master Mentor', description: 'Mentored 10+ campers', unlockedAt: new Date('2024-11-15') },
      { id: 'ach-2', type: 'builder', name: 'Prolific Builder', description: 'Built 10+ agents', unlockedAt: new Date('2024-10-20') },
    ],
    socialLinks: {
      twitter: 'https://twitter.com/alexchen',
      github: 'https://github.com/alexchen',
    },
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date(),
  },
  {
    id: 'user-2',
    email: 'maya.patel@camp.ai',
    username: 'mayapatel',
    fullName: 'Maya Patel',
    avatar: 'https://i.pravatar.cc/150?img=47',
    walletAddress: '0x8a9b5c2d1e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t',
    bio: 'DeFi researcher & protocol designer. Passionate about making finance accessible.',
    campRole: 'researcher',
    campRank: 'diamond',
    collaborationMetrics: {
      score: 98,
      projectsCompleted: 18,
      partnersCount: 12,
      activeCols: 5,
    },
    projectsBuilt: 22,
    techBadges: ['blockchain', 'defi', 'web3', 'python'],
    achievements: [
      { id: 'ach-3', type: 'innovator', name: 'Innovator', description: 'Created breakthrough protocol', unlockedAt: new Date('2024-12-01') },
      { id: 'ach-4', type: 'collaborator', name: 'Super Collaborator', description: 'Collaborated on 15+ projects', unlockedAt: new Date('2024-11-10') },
    ],
    socialLinks: {
      twitter: 'https://twitter.com/mayapatel',
      github: 'https://github.com/mayapatel',
      linkedin: 'https://linkedin.com/in/mayapatel',
    },
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date(),
  },
  {
    id: 'user-3',
    email: 'jordan.rivers@camp.ai',
    username: 'jordanrivers',
    fullName: 'Jordan Rivers',
    avatar: 'https://i.pravatar.cc/150?img=12',
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    bio: 'Creative AI artist. Exploring the intersection of art and autonomous systems.',
    campRole: 'builder',
    campRank: 'gold',
    collaborationMetrics: {
      score: 85,
      projectsCompleted: 9,
      partnersCount: 6,
      activeCols: 2,
    },
    projectsBuilt: 11,
    techBadges: ['ai-ml', 'nft', 'react'],
    achievements: [
      { id: 'ach-5', type: 'builder', name: 'First Agent', description: 'Created first AI agent', unlockedAt: new Date('2024-09-05') },
    ],
    socialLinks: {
      twitter: 'https://twitter.com/jordanrivers',
    },
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date(),
  },
  {
    id: 'user-4',
    email: 'sam.nakamoto@camp.ai',
    username: 'samnakamoto',
    fullName: 'Sam Nakamoto',
    avatar: 'https://i.pravatar.cc/150?img=68',
    walletAddress: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g',
    bio: 'Smart contract auditor turned agent builder. Security first, always.',
    campRole: 'mentor',
    campRank: 'platinum',
    collaborationMetrics: {
      score: 94,
      projectsCompleted: 14,
      partnersCount: 10,
      activeCols: 4,
    },
    projectsBuilt: 16,
    techBadges: ['blockchain', 'web3', 'defi'],
    achievements: [
      { id: 'ach-6', type: 'mentor', name: 'Trusted Mentor', description: 'Mentored 5+ campers', unlockedAt: new Date('2024-10-12') },
    ],
    socialLinks: {
      github: 'https://github.com/samnakamoto',
    },
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date(),
  },
  {
    id: 'user-5',
    email: 'zara.kim@camp.ai',
    username: 'zarakim',
    fullName: 'Zara Kim',
    avatar: 'https://i.pravatar.cc/150?img=45',
    walletAddress: '0xf1e2d3c4b5a6978869504132231415161718192',
    bio: 'Data scientist building predictive AI agents. Love turning data into insights.',
    campRole: 'builder',
    campRank: 'gold',
    collaborationMetrics: {
      score: 88,
      projectsCompleted: 10,
      partnersCount: 7,
      activeCols: 3,
    },
    projectsBuilt: 13,
    techBadges: ['python', 'ai-ml', 'data-science'],
    achievements: [
      { id: 'ach-7', type: 'builder', name: 'Data Master', description: 'Built 5 data-driven agents', unlockedAt: new Date('2024-11-01') },
    ],
    socialLinks: {
      twitter: 'https://twitter.com/zarakim',
      linkedin: 'https://linkedin.com/in/zarakim',
    },
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date(),
  },
];

// BmegaCoach user for spotlight agent (Troy Joyner)
const bmegaCoachUser: User = {
  id: 'user-bmegacoach',
  email: 'troy@bmegacoach.com',
  username: 'bmegacoach',
  fullName: 'BmegaCoach',
  avatar: '/images/bmegacoach.jpg',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  bio: 'Founder of CAMP and master Vibe Coder. Building sovereignty through tokenized digital assets.',
  campRole: 'mentor',
  campRank: 'diamond',
  collaborationMetrics: {
    score: 99,
    projectsCompleted: 25,
    partnersCount: 15,
    activeCols: 6,
  },
  projectsBuilt: 30,
  techBadges: ['ai-ml', 'blockchain', 'defi', 'web3'],
  achievements: [
    { id: 'ach-founder', type: 'innovator', name: 'Founder', description: 'Founded the CAMP ecosystem', unlockedAt: new Date('2024-01-01') },
    { id: 'ach-vibe', type: 'mentor', name: 'Vibe Master', description: 'Pioneer of Vibe Coding methodology', unlockedAt: new Date('2024-06-01') },
  ],
  socialLinks: {
    twitter: 'https://x.com/camptech',
    github: 'https://github.com/bmegacoach',
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
};

// Qualified Campers - Tech Camp Scholarship Recipients
export interface QualifiedCamper {
  id: string;
  name: string;
  age: number;
  avatar: string;
  impactArea: string;
  bio: string;
  fullResume: string;
  dreams: string;
  motivations: string;
  ultimateGoal: string;
  heroProgram: boolean;
  impactAreas: string[];
}

export const qualifiedCampers: QualifiedCamper[] = [
  {
    id: 'camper-marcus',
    name: 'Marcus Johnson',
    age: 27,
    avatar: '/images/camper-marcus.jpg',
    impactArea: 'AI Consulting',
    bio: 'Aspiring AI consultant dedicated to helping small businesses leverage artificial intelligence for growth and efficiency.',
    fullResume: 'B.S. Computer Science, Howard University. 3 years experience as junior developer at tech startup. Completed multiple AI/ML certifications through Coursera and Google. Built personal projects including a customer service chatbot for local businesses.',
    dreams: 'To build an AI consulting practice that specifically serves underrepresented entrepreneurs, making cutting-edge technology accessible to everyone regardless of their background or resources.',
    motivations: 'Growing up, I watched my parents struggle with their small business because they lacked access to the same tools as larger competitors. I want to change that story for the next generation of Black business owners.',
    ultimateGoal: 'Launch a full-service AI consulting firm with a team of 10+ consultants, serving 100+ small businesses annually and creating measurable economic impact in underserved communities.',
    heroProgram: true,
    impactAreas: ['AI Consulting', 'Information Technology', 'Education'],
  },
  {
    id: 'camper-deshawn',
    name: 'DeShawn Williams',
    age: 25,
    avatar: '/images/camper-deshawn.jpg',
    impactArea: 'Renewable Energy',
    bio: 'Passionate about sustainable energy solutions and bringing clean power to underserved communities.',
    fullResume: 'B.S. Environmental Engineering, Morehouse College. Internship at Tesla Energy division. Volunteer solar panel installer with Grid Alternatives. EPA Environmental Justice Fellow.',
    dreams: 'To create a renewable energy company that focuses on providing affordable solar solutions to low-income neighborhoods and creating green jobs in communities that need them most.',
    motivations: 'Environmental injustice hits closest to home in communities like the one I grew up in. Clean air and affordable energy should not be a privilege - they are rights everyone deserves.',
    ultimateGoal: 'Install solar panels on 1,000 homes in underserved communities within 5 years while training and employing 50+ local residents in the green energy sector.',
    heroProgram: true,
    impactAreas: ['Renewable Energy', 'Humanitarian Work', 'Project Management'],
  },
  {
    id: 'camper-jamal',
    name: 'Jamal Thompson',
    age: 29,
    avatar: '/images/camper-jamal.jpg',
    impactArea: 'Marketing and Sales',
    bio: 'Strategic marketer with a vision for helping minority-owned businesses scale through digital transformation.',
    fullResume: 'MBA Marketing, Spelman College. 5 years in digital marketing at Fortune 500 companies. Helped launch 20+ successful product campaigns. Founded grassroots marketing collective for local businesses.',
    dreams: 'Build a marketing agency that combines traditional storytelling with cutting-edge digital strategies, specifically designed to elevate Black-owned businesses to national recognition.',
    motivations: 'The best products often come from our communities, but they never get the spotlight they deserve. I want to change the narrative and show the world what we can build.',
    ultimateGoal: 'Establish a full-service marketing agency generating $5M+ annual revenue while dedicating 30% of services to pro-bono work for emerging Black entrepreneurs.',
    heroProgram: true,
    impactAreas: ['Marketing and Sales', 'Motivational Speaking', 'Education'],
  },
  {
    id: 'camper-andre',
    name: 'Andre Davis',
    age: 26,
    avatar: '/images/camper-andre.jpg',
    impactArea: 'Information Technology',
    bio: 'Full-stack developer committed to creating technology that bridges the digital divide in urban communities.',
    fullResume: 'Self-taught developer with 4 years professional experience. Built apps serving 50,000+ users. Open source contributor. Teaches coding workshops at community centers. AWS and Azure certified.',
    dreams: 'Develop a tech education platform that makes coding accessible to youth in underserved areas, complete with mentorship matching and job placement assistance.',
    motivations: 'I learned to code from free YouTube videos in my public library. Now I want to create a structured path so the next kid from my neighborhood has a clearer road to success.',
    ultimateGoal: 'Train 5,000 students in programming within 3 years, with at least 60% securing tech employment or launching their own ventures.',
    heroProgram: false,
    impactAreas: ['Information Technology', 'Education', 'Data Center Development'],
  },
  {
    id: 'camper-chris',
    name: 'Chris Martinez',
    age: 28,
    avatar: '/images/camper-chris.jpg',
    impactArea: 'Health and Wellness',
    bio: 'Certified wellness coach integrating technology and traditional healing practices for holistic community health.',
    fullResume: 'Certified Personal Trainer (NASM). Nutrition Coach Certification. 3 years running community fitness programs. Developed wellness app prototype. Studied traditional healing practices.',
    dreams: 'Create a comprehensive wellness platform that combines fitness, nutrition, mental health support, and cultural healing practices specifically designed for communities of color.',
    motivations: 'Health disparities in our communities are devastating. I believe that by making wellness culturally relevant and accessible, we can transform health outcomes for generations.',
    ultimateGoal: 'Launch a wellness center chain in 5 major cities serving 10,000+ clients annually, while training 100+ certified wellness coaches from local communities.',
    heroProgram: true,
    impactAreas: ['Health and Wellness', 'Motivational Speaking', 'Food Distribution'],
  },
];

// RWA Listings - Real World Assets
export interface RWAProperty {
  id: string;
  name: string;
  type: 'property' | 'unit';
  image: string;
  description: string;
  units?: number;
  status: 'available' | 'tokenized' | 'occupied';
  tokenPrice?: string;
  totalValue?: string;
  occupancy?: number;
  location: string;
}

export const rwaListings: RWAProperty[] = [
  {
    id: 'rwa-beta-camp-1',
    name: 'Beta Camp 1 - Residential Rehab',
    type: 'property',
    image: '/images/rwa-beta-camp-1.jpg',
    description: 'Fully renovated residential complex designed for tech camp participants. Features modern amenities, co-working spaces, and high-speed internet infrastructure.',
    units: 24,
    status: 'tokenized',
    tokenPrice: '$125.00',
    totalValue: '$2,400,000',
    occupancy: 85,
    location: 'Atlanta, GA',
  },
  {
    id: 'rwa-beta-camp-2',
    name: 'Beta Camp 2 - Residential 4-Plex',
    type: 'property',
    image: '/images/rwa-beta-camp-2.jpg',
    description: 'Modern 4-plex designed for collaborative living. Each unit features private bedrooms with shared common areas optimized for networking and skill-building.',
    units: 24,
    status: 'tokenized',
    tokenPrice: '$89.00',
    totalValue: '$1,800,000',
    occupancy: 92,
    location: 'Houston, TX',
  },
  {
    id: 'rwa-unit-1',
    name: 'Beta Camp 1 - Unit 1 thru 24',
    type: 'unit',
    image: '/images/rwa-beta-camp-1.jpg',
    description: '24 individual units within Beta Camp 1 property. Each unit features dedicated workspace with modern amenities for tech camp participants.',
    status: 'tokenized',
    tokenPrice: '$45.00',
    totalValue: '$2,040,000',
    location: 'Beta Camp 1, Atlanta',
  },
  {
    id: 'rwa-unit-2',
    name: 'Beta Camp 2 - Unit 1 thru 24',
    type: 'unit',
    image: '/images/rwa-beta-camp-2.jpg',
    description: '24 individual units within Beta Camp 2 property. Open-concept units with natural lighting, optimized for collaborative living and creative work.',
    status: 'tokenized',
    tokenPrice: '$38.00',
    totalValue: '$1,728,000',
    location: 'Beta Camp 2, Houston',
  },
];

// Service Agents Categories and Listings
export interface ServiceAgent {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  icon: string;
  status: 'active' | 'coming-soon';
  price?: string;
}

export const serviceAgentCategories = [
  'Audits',
  'Security',
  'AI Receptionists',
  'Marketing',
  'Sales',
  'Customer Support',
  'Customer Experience',
  'Data Management',
  'Accounting',
  'Business Planning',
  'Social Media',
  'Content Creation',
  'Token Launch',
  'Reputation Management',
  'Health and Wellness Coach',
  'Artists Way Coach',
  'Study Buddy',
  'Productivity Coach',
  'Personal Finance Coach',
  'Real Estate Coach',
  'Business Management Coach',
  'CAMP IDL Campaign Launch Agent',
];

export const serviceAgents: ServiceAgent[] = [
  // Audits
  { id: 'sa-audit-smart', name: 'Smart Contract Auditor', category: 'Audits', subcategory: 'Smart Contracts', description: 'Automated smart contract security analysis and vulnerability detection', icon: 'Shield', status: 'active', price: '$299/audit' },
  { id: 'sa-audit-tech', name: 'Tech Infrastructure Auditor', category: 'Audits', subcategory: 'Technology', description: 'Comprehensive technology stack assessment and optimization recommendations', icon: 'Server', status: 'active', price: '$499/audit' },
  { id: 'sa-audit-infra', name: 'Infrastructure Auditor', category: 'Audits', subcategory: 'Infrastructure', description: 'Physical and cloud infrastructure security and efficiency audit', icon: 'Building', status: 'active', price: '$399/audit' },
  
  // Security
  { id: 'sa-sec-tech', name: 'Tech Security Agent', category: 'Security', subcategory: 'Technology', description: '24/7 monitoring and threat detection for your tech assets', icon: 'Lock', status: 'active', price: '$199/mo' },
  { id: 'sa-sec-data', name: 'Data Protection Agent', category: 'Security', subcategory: 'Data', description: 'Data encryption, backup, and compliance monitoring', icon: 'Database', status: 'active', price: '$149/mo' },
  
  // AI Receptionists
  { id: 'sa-reception', name: 'Angel AI Receptionist', category: 'AI Receptionists', description: '24/7 AI-powered customer engagement, scheduling, and inquiry handling', icon: 'Headphones', status: 'active', price: '$99/mo' },
  
  // Marketing & Sales
  { id: 'sa-marketing', name: 'Marketing Automation Agent', category: 'Marketing', description: 'Campaign creation, A/B testing, and performance optimization', icon: 'Megaphone', status: 'active', price: '$249/mo' },
  { id: 'sa-sales', name: 'Sales Pipeline Agent', category: 'Sales', description: 'Lead scoring, follow-up automation, and deal tracking', icon: 'TrendingUp', status: 'active', price: '$199/mo' },
  
  // Customer Support & Experience
  { id: 'sa-support', name: 'Customer Support Agent', category: 'Customer Support', description: 'Intelligent ticket routing, FAQ automation, and escalation management', icon: 'MessageCircle', status: 'active', price: '$149/mo' },
  { id: 'sa-cx', name: 'Customer Experience Agent', category: 'Customer Experience', description: 'Journey mapping, feedback analysis, and satisfaction tracking', icon: 'Heart', status: 'active', price: '$179/mo' },
  
  // Data & Finance
  { id: 'sa-data', name: 'Data Management Agent', category: 'Data Management', description: 'Data cleaning, organization, and insights generation', icon: 'BarChart', status: 'active', price: '$129/mo' },
  { id: 'sa-accounting', name: 'Accounting Agent', category: 'Accounting', description: 'Bookkeeping automation, expense tracking, and financial reporting', icon: 'Calculator', status: 'active', price: '$199/mo' },
  
  // Business
  { id: 'sa-bizplan', name: 'Business Planning Agent', category: 'Business Planning', description: 'Business model analysis, strategy development, and goal tracking', icon: 'Target', status: 'active', price: '$299/mo' },
  
  // Content & Social
  { id: 'sa-social', name: 'Social Media Agent', category: 'Social Media', description: 'Content scheduling, engagement tracking, and audience growth', icon: 'Share2', status: 'active', price: '$149/mo' },
  { id: 'sa-content', name: 'Content Creation Agent', category: 'Content Creation', description: 'AI-powered copywriting, image generation, and content optimization', icon: 'FileText', status: 'active', price: '$179/mo' },
  
  // Web3
  { id: 'sa-token', name: 'Token Launch Agent', category: 'Token Launch', description: 'Convert your business to Web3 with tokenization strategy and launch support', icon: 'Coins', status: 'active', price: '$999 setup' },
  { id: 'sa-reputation', name: 'Reputation Management Agent', category: 'Reputation Management', description: 'Online presence monitoring, review management, and brand protection', icon: 'Star', status: 'active', price: '$199/mo' },
  
  // Coaching Agents
  { id: 'sa-wellness', name: 'Health & Wellness Coach', category: 'Health and Wellness Coach', description: 'Personalized workout plans, diet guidance, and mental health support', icon: 'Activity', status: 'active', price: '$79/mo' },
  { id: 'sa-artist', name: 'Artists Way Coach', category: 'Artists Way Coach', description: 'Daily creative routines, inner artist development, and creative blocks support', icon: 'Palette', status: 'active', price: '$49/mo' },
  { id: 'sa-study', name: 'Study Buddy Agent', category: 'Study Buddy', description: 'Learning optimization, study scheduling, and knowledge retention techniques', icon: 'BookOpen', status: 'active', price: '$39/mo' },
  { id: 'sa-productivity', name: 'Productivity Coach', category: 'Productivity Coach', description: 'Time management, task prioritization, and workflow optimization', icon: 'Clock', status: 'active', price: '$59/mo' },
  { id: 'sa-finance', name: 'Personal Finance Coach', category: 'Personal Finance Coach', description: 'Credit improvement, budgeting strategies, and financing guidance', icon: 'Wallet', status: 'active', price: '$69/mo' },
  { id: 'sa-realestate', name: 'Real Estate Coach', category: 'Real Estate Coach', description: 'Property investment strategies, market analysis, and deal evaluation', icon: 'Home', status: 'active', price: '$99/mo' },
  { id: 'sa-bizcoach', name: 'Business Management Coach', category: 'Business Management Coach', description: 'Operations optimization, team management, and growth strategies', icon: 'Briefcase', status: 'active', price: '$149/mo' },
  
  // CAMP Specific
  { id: 'sa-idl', name: 'CAMP IDL Campaign Launch Agent', category: 'CAMP IDL Campaign Launch Agent', description: 'End-to-end IDL campaign setup, distribution strategy, and launch execution', icon: 'Rocket', status: 'active', price: '$499 setup' },
];

// Mock Agents with Human Stories
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'AlphaTraderAI',
    symbol: 'ALPHA',
    description: 'Autonomous trading agent leveraging deep reinforcement learning for high-frequency strategies across multiple DEXs. Built with the Vibe Coding methodology. Drop into the future of sovereign trading.',
    category: 'Trading',
    imageUrl: '/images/bmegacoach.jpg',
    creatorId: bmegaCoachUser.id,
    creatorName: bmegaCoachUser.fullName,
    creator: bmegaCoachUser,
    status: 'active',
    isSpotlight: true,
    dayInTheLife: {
      currentProject: 'CAMP IDL Development',
      projectDescription: 'Building the next generation Eth-Inscription Distribution Layer - an omnichain, autonomous AI agent-powered system designed to revolutionize token distribution.',
      collaborators: ['user-2', 'user-4'],
    },
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    tokenAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    totalSupply: '1000000',
    currentPrice: '24.50',
    priceChange24h: 4.2,
    priceChange7d: 8.5,
    marketCap: '24500000',
    volume24h: '850000',
    totalRevenue: '312450',
    holdersCount: 3247,
    transactionsCount: 8934,
    revenueSplit: { creator: 40, holders: 30, treasury: 20, ecosystem: 10 },
    websiteUrl: 'https://campdefi.app',
    githubUrl: 'https://github.com/camp-ai/alphatrader',
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-2',
    name: 'DeFi Compass',
    symbol: 'COMPASS',
    description: 'Maya\'s research-driven protocol analyzer. Evaluates DeFi protocols for safety and yield optimization.',
    category: 'Finance',
    imageUrl: mockUsers[1].avatar,
    creatorId: mockUsers[1].id,
    creatorName: mockUsers[1].fullName,
    creator: mockUsers[1],
    status: 'active',
    dayInTheLife: {
      currentProject: 'Smart Risk Assessment System',
      projectDescription: 'Analyzing 200+ DeFi protocols daily using ML models to detect vulnerabilities and predict yield sustainability. Helped users avoid $2M+ in potential losses.',
      collaborators: ['user-1'],
    },
    contractAddress: '0x8a9b5c2d1e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t',
    tokenAddress: '0x8a9b5c2d1e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t',
    totalSupply: '5000000',
    currentPrice: '12.35',
    priceChange24h: 2.8,
    priceChange7d: 5.4,
    marketCap: '61700000',
    volume24h: '520000',
    totalRevenue: '445000',
    holdersCount: 4821,
    transactionsCount: 12456,
    revenueSplit: { creator: 35, holders: 35, treasury: 20, ecosystem: 10 },
    websiteUrl: 'https://deficompass.camp.ai',
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-3',
    name: 'ArtForge AI',
    symbol: 'ARTF',
    description: 'Jordan\'s creative AI that generates and curates digital art. Specializes in generative NFT collections.',
    category: 'Creative',
    imageUrl: mockUsers[2].avatar,
    creatorId: mockUsers[2].id,
    creatorName: mockUsers[2].fullName,
    creator: mockUsers[2],
    status: 'active',
    dayInTheLife: {
      currentProject: 'Evolving Art Collection',
      projectDescription: 'Creating a living NFT collection where artwork evolves based on holder interactions and market sentiment. Each piece is unique and changes over time.',
    },
    contractAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    tokenAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    totalSupply: '2000000',
    currentPrice: '8.90',
    priceChange24h: 1.5,
    priceChange7d: 3.2,
    marketCap: '17800000',
    volume24h: '180000',
    totalRevenue: '89000',
    holdersCount: 1842,
    transactionsCount: 5621,
    revenueSplit: { creator: 50, holders: 25, treasury: 15, ecosystem: 10 },
    websiteUrl: 'https://artforge.camp.ai',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-4',
    name: 'SecureAudit Pro',
    symbol: 'AUDIT',
    description: 'Sam\'s automated smart contract auditor. Scans code for vulnerabilities using advanced static analysis.',
    category: 'Legal',
    imageUrl: mockUsers[3].avatar,
    creatorId: mockUsers[3].id,
    creatorName: mockUsers[3].fullName,
    creator: mockUsers[3],
    status: 'active',
    dayInTheLife: {
      currentProject: 'Real-time Contract Monitoring',
      projectDescription: 'Building a continuous monitoring system that watches deployed contracts 24/7 and alerts teams to suspicious activity. Currently protecting $50M+ in TVL.',
      collaborators: ['user-2'],
    },
    contractAddress: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g',
    tokenAddress: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g',
    totalSupply: '3000000',
    currentPrice: '15.65',
    priceChange24h: 2.1,
    priceChange7d: 4.8,
    marketCap: '47000000',
    volume24h: '420000',
    totalRevenue: '234000',
    holdersCount: 2934,
    transactionsCount: 7823,
    revenueSplit: { creator: 40, holders: 30, treasury: 20, ecosystem: 10 },
    githubUrl: 'https://github.com/camp-ai/secureaudit',
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-5',
    name: 'DataSeer',
    symbol: 'SEER',
    description: 'Zara\'s predictive analytics agent. Forecasts market trends using ensemble ML models.',
    category: 'Finance',
    imageUrl: mockUsers[4].avatar,
    creatorId: mockUsers[4].id,
    creatorName: mockUsers[4].fullName,
    creator: mockUsers[4],
    status: 'active',
    dayInTheLife: {
      currentProject: 'Sentiment Analysis Engine',
      projectDescription: 'Training models on social media, news, and on-chain data to predict market movements. Achieved 73% accuracy on 7-day price predictions.',
    },
    contractAddress: '0xf1e2d3c4b5a6978869504132231415161718192',
    tokenAddress: '0xf1e2d3c4b5a6978869504132231415161718192',
    totalSupply: '4000000',
    currentPrice: '6.45',
    priceChange24h: 3.5,
    priceChange7d: 6.2,
    marketCap: '25700000',
    volume24h: '310000',
    totalRevenue: '145000',
    holdersCount: 2156,
    transactionsCount: 6234,
    revenueSplit: { creator: 45, holders: 30, treasury: 15, ecosystem: 10 },
    createdAt: new Date('2024-10-12'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-6',
    name: 'Guardian Elite',
    symbol: 'GUARD',
    description: 'Advanced quantitative trading system with market-making capabilities.',
    category: 'Trading',
    imageUrl: mockUsers[0].avatar,
    creatorId: mockUsers[0].id,
    creatorName: mockUsers[0].fullName,
    creator: mockUsers[0],
    status: 'active',
    contractAddress: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    tokenAddress: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    totalSupply: '2500000',
    currentPrice: '18.20',
    priceChange24h: 1.8,
    priceChange7d: 4.5,
    marketCap: '45500000',
    volume24h: '480000',
    totalRevenue: '189000',
    holdersCount: 1923,
    transactionsCount: 5432,
    revenueSplit: { creator: 40, holders: 30, treasury: 20, ecosystem: 10 },
    createdAt: new Date('2024-08-28'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-7',
    name: 'CampFlow AI',
    symbol: 'CFLOW',
    description: 'AI-powered sales and marketing agent for campaign optimization. Automates lead generation, engagement tracking, and conversion optimization.',
    category: 'Marketing',
    imageUrl: 'https://i.pravatar.cc/150?img=51',
    creatorId: mockUsers[1].id,
    creatorName: mockUsers[1].fullName,
    creator: mockUsers[1],
    status: 'active',
    contractAddress: '0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
    tokenAddress: '0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
    totalSupply: '3500000',
    currentPrice: '11.90',
    priceChange24h: 3.2,
    priceChange7d: 5.8,
    marketCap: '41600000',
    volume24h: '580000',
    totalRevenue: '267000',
    holdersCount: 2845,
    transactionsCount: 7123,
    revenueSplit: { creator: 35, holders: 35, treasury: 20, ecosystem: 10 },
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-8',
    name: 'Dexleon',
    symbol: 'DEXL',
    description: 'AI receptionist for seamless customer engagement. Handles inquiries, schedules appointments, and provides 24/7 personalized support.',
    category: 'Service',
    imageUrl: 'https://i.pravatar.cc/150?img=23',
    creatorId: mockUsers[4].id,
    creatorName: mockUsers[4].fullName,
    creator: mockUsers[4],
    status: 'active',
    contractAddress: '0xc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    tokenAddress: '0xc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    totalSupply: '2000000',
    currentPrice: '9.45',
    priceChange24h: 2.5,
    priceChange7d: 4.8,
    marketCap: '18900000',
    volume24h: '380000',
    totalRevenue: '156000',
    holdersCount: 1987,
    transactionsCount: 4892,
    revenueSplit: { creator: 40, holders: 30, treasury: 20, ecosystem: 10 },
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-9',
    name: 'ArbiForge AI',
    symbol: 'ARBI',
    description: 'Cross-chain arbitrage detection and execution. Maximizes yield through automated multi-DEX strategies.',
    category: 'Trading',
    imageUrl: 'https://i.pravatar.cc/150?img=15',
    creatorId: mockUsers[0].id,
    creatorName: mockUsers[0].fullName,
    creator: mockUsers[0],
    status: 'active',
    contractAddress: '0xd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3',
    tokenAddress: '0xd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3',
    totalSupply: '1500000',
    currentPrice: '22.35',
    priceChange24h: 2.9,
    priceChange7d: 5.6,
    marketCap: '33500000',
    volume24h: '520000',
    totalRevenue: '198000',
    holdersCount: 2341,
    transactionsCount: 6789,
    revenueSplit: { creator: 40, holders: 30, treasury: 20, ecosystem: 10 },
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date(),
  },
  {
    id: 'agent-10',
    name: 'Angel AI Receptionist',
    symbol: 'ANGEL',
    description: 'Premium AI receptionist providing enterprise-grade customer service automation with natural conversation flow.',
    category: 'Service',
    imageUrl: 'https://i.pravatar.cc/150?img=44',
    creatorId: mockUsers[2].id,
    creatorName: mockUsers[2].fullName,
    creator: mockUsers[2],
    status: 'active',
    contractAddress: '0xe5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
    tokenAddress: '0xe5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
    totalSupply: '2500000',
    currentPrice: '7.90',
    priceChange24h: 2.2,
    priceChange7d: 4.5,
    marketCap: '19700000',
    volume24h: '290000',
    totalRevenue: '134000',
    holdersCount: 1678,
    transactionsCount: 4123,
    revenueSplit: { creator: 45, holders: 30, treasury: 15, ecosystem: 10 },
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date(),
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = Array.from({ length: 20 }, (_, i) => {
  const agent = mockAgents[Math.floor(Math.random() * mockAgents.length)];
  const types = ['buy', 'sell', 'transfer', 'revenue'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = (Math.random() * 100 + 1).toFixed(2);
  
  return {
    id: `tx-${i + 1}`,
    userId: 'user-1',
    agentId: agent.id,
    agent,
    type,
    amount,
    price: agent.currentPrice,
    totalValue: (parseFloat(amount) * parseFloat(agent.currentPrice)).toFixed(2),
    transactionHash: `0x${Math.random().toString(16).slice(2, 66)}`,
    status: 'completed',
    network: 'base',
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  };
});

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Build Your First Agent',
    description: 'Create and deploy your first AI agent to the marketplace',
    type: 'build',
    rewards: { type: 'badge', value: 'First Builder' },
    deadline: new Date('2025-01-15'),
    participants: ['user-1', 'user-3', 'user-5'],
    status: 'active',
  },
  {
    id: 'challenge-2',
    title: 'Collaboration Sprint',
    description: 'Partner with 3+ campers on a shared project this month',
    type: 'collaborate',
    rewards: { type: 'rank-boost', value: '+10 Collab Score' },
    deadline: new Date('2024-12-31'),
    participants: ['user-1', 'user-2', 'user-4'],
    status: 'active',
  },
];

// Mock Collaborations
export const mockCollaborations: Collaboration[] = [
  {
    id: 'collab-1',
    campers: ['user-1', 'user-2'],
    projectName: 'Multi-Chain Arbitrage',
    description: 'Cross-chain trading system',
    startedAt: new Date('2024-11-20'),
    status: 'active',
  },
  {
    id: 'collab-2',
    campers: ['user-2', 'user-4'],
    projectName: 'DeFi Safety Protocol',
    description: 'Automated security monitoring',
    startedAt: new Date('2024-11-15'),
    status: 'active',
  },
];

// Mock Events
export const mockEvents: CampEvent[] = [
  {
    id: 'event-1',
    title: 'AI Agent Hackathon',
    description: '48-hour build sprint with $10k in prizes',
    type: 'hackathon',
    date: new Date('2025-01-10'),
    participants: [],
    hostId: 'user-2',
  },
  {
    id: 'event-2',
    title: 'Smart Contract Security Workshop',
    description: 'Learn to audit contracts with Sam',
    type: 'workshop',
    date: new Date('2024-12-20'),
    participants: ['user-1', 'user-3'],
    hostId: 'user-4',
  },
];

// Chains and Bridge Routes
export const chains = [
  { id: 'base' as const, name: 'Base', icon: 'B', rpcUrl: 'https://mainnet.base.org', explorerUrl: 'https://basescan.org' },
  { id: 'ethereum' as const, name: 'Ethereum', icon: 'E', rpcUrl: 'https://eth.llamarpc.com', explorerUrl: 'https://etherscan.io' },
  { id: 'polygon' as const, name: 'Polygon', icon: 'P', rpcUrl: 'https://polygon-rpc.com', explorerUrl: 'https://polygonscan.com' },
  { id: 'solana' as const, name: 'Solana', icon: 'S', rpcUrl: 'https://api.mainnet-beta.solana.com', explorerUrl: 'https://solscan.io' },
];

export const bridgeRoutes = [
  { fromChain: 'base' as const, toChain: 'ethereum' as const, estimatedTime: '~15 min', fee: '0.001 ETH', available: true },
  { fromChain: 'base' as const, toChain: 'polygon' as const, estimatedTime: '~10 min', fee: '0.5 MATIC', available: true },
  { fromChain: 'ethereum' as const, toChain: 'base' as const, estimatedTime: '~15 min', fee: '0.001 ETH', available: true },
  { fromChain: 'polygon' as const, toChain: 'base' as const, estimatedTime: '~10 min', fee: '0.5 MATIC', available: true },
];

// Helper functions
export const getTrendingAgents = () => {
  return [...mockAgents]
    .sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h))
    .slice(0, 8);
};

export const getTopPerformers = (sortBy: 'marketCap' | 'holders' | 'volume' = 'marketCap') => {
  return [...mockAgents]
    .sort((a, b) => {
      if (sortBy === 'marketCap') return parseFloat(b.marketCap) - parseFloat(a.marketCap);
      if (sortBy === 'holders') return b.holdersCount - a.holdersCount;
      return parseFloat(b.volume24h) - parseFloat(a.volume24h);
    })
    .slice(0, 8);
};

export const getSpotlightAgent = () => {
  return mockAgents.find(a => a.isSpotlight) || mockAgents[0];
};
