// Gamification Types
export type CampRank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type CamperRole = 'builder' | 'researcher' | 'mentor' | 'trader' | 'community';
export type TechBadge = 'react' | 'python' | 'ai-ml' | 'blockchain' | 'web3' | 'data-science' | 'defi' | 'nft';

export interface Achievement {
  id: string;
  type: 'mentor' | 'collaborator' | 'builder' | 'innovator' | 'first-agent' | 'top-performer';
  name: string;
  description: string;
  iconUrl?: string;
  unlockedAt: Date;
}

export interface CollaborationMetrics {
  score: number; // 0-100
  projectsCompleted: number;
  partnersCount: number;
  activeCols: number;
}

// User Types (Extended with Gamification)
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  walletAddress?: string;
  bio?: string;
  campRole: CamperRole;
  campRank: CampRank;
  collaborationMetrics: CollaborationMetrics;
  projectsBuilt: number;
  techBadges: TechBadge[];
  achievements: Achievement[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Agent Types (Extended with Human Story)
export type AgentCategory = 'Finance' | 'Trading' | 'Healthcare' | 'Logistics' | 'Legal' | 'Creative' | 'Marketing' | 'Service';
export type AgentStatus = 'draft' | 'active' | 'suspended';

export interface DayInTheLife {
  currentProject: string;
  projectDescription: string;
  collaborators?: string[];
  imageUrl?: string;
}

export interface Agent {
  id: string;
  name: string;
  symbol: string;
  description: string;
  category: AgentCategory;
  imageUrl?: string;
  creatorId: string;
  creatorName?: string;
  creator?: User; // Full creator profile
  status: AgentStatus;
  
  // Gamification & Human Story
  dayInTheLife?: DayInTheLife;
  isSpotlight?: boolean;
  
  // Blockchain & Tokenomics
  contractAddress?: string;
  tokenAddress?: string;
  totalSupply?: string;
  currentPrice: string;
  priceChange24h: number;
  priceChange7d?: number;
  marketCap: string;
  volume24h: string;
  totalRevenue: string;
  holdersCount: number;
  transactionsCount: number;
  
  revenueSplit: {
    creator: number;
    holders: number;
    treasury: number;
    ecosystem: number;
  };
  
  // Links
  websiteUrl?: string;
  githubUrl?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio Types
export interface PortfolioHolding {
  agentId: string;
  agent?: Agent;
  tokenAmount: string;
  averageBuyPrice: string;
  totalInvested: string;
  currentValue: string;
  unrealizedPnl: string;
  unrealizedPnlPercent: number;
}

export interface Portfolio {
  userId: string;
  holdings: PortfolioHolding[];
  totalValue: string;
  totalInvested: string;
  totalPnl: string;
  totalPnlPercent: number;
  lastUpdated: Date;
}

// Transaction Types
export type TransactionType = 'buy' | 'sell' | 'transfer' | 'revenue' | 'bridge';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  agentId: string;
  agent?: Agent;
  type: TransactionType;
  amount: string;
  price: string;
  totalValue: string;
  transactionHash?: string;
  status: TransactionStatus;
  network: string;
  gasUsed?: string;
  gasPrice?: string;
  blockNumber?: number;
  timestamp: Date;
}

// Cross-Chain Types
export type ChainId = 'base' | 'ethereum' | 'polygon' | 'solana';

export interface Chain {
  id: ChainId;
  name: string;
  icon: string;
  rpcUrl: string;
  explorerUrl: string;
}

export interface BridgeRoute {
  fromChain: ChainId;
  toChain: ChainId;
  estimatedTime: string;
  fee: string;
  available: boolean;
}

// Revenue Types
export interface RevenueDistribution {
  id: string;
  agentId: string;
  totalRevenue: string;
  splits: {
    creator: { address: string; amount: string };
    holders: { totalAmount: string; perTokenAmount: string };
    treasury: { address: string; amount: string };
    ecosystem: { address: string; amount: string };
  };
  transactionHash: string;
  timestamp: Date;
}

// Camp Life Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'build' | 'trade' | 'collaborate' | 'mentor';
  rewards: {
    type: 'badge' | 'rank-boost' | 'token';
    value: string;
  };
  deadline: Date;
  participants: string[];
  status: 'active' | 'completed' | 'expired';
}

export interface Collaboration {
  id: string;
  campers: string[]; // User IDs
  projectName: string;
  description: string;
  startedAt: Date;
  status: 'active' | 'completed';
}

export interface CampEvent {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'hackathon' | 'demo-day' | 'social';
  date: Date;
  participants: string[];
  hostId: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  scoreChange?: number; // Position change from last period
}

export type LeaderboardPeriod = 'all-time' | 'monthly' | 'weekly';

// Form Types
export interface CreateAgentForm {
  name: string;
  symbol: string;
  description: string;
  category: AgentCategory;
  initialSupply: string;
  imageUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  revenueCreator: number;
  revenueHolders: number;
  revenueTreasury: number;
  revenueEcosystem: number;
  dayInTheLife?: {
    currentProject: string;
    projectDescription: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Filter & Sort Types
export interface MarketplaceFilters {
  category?: AgentCategory;
  campRank?: CampRank;
  priceRange?: { min: number; max: number };
  searchQuery?: string;
}

export type SortOption = 
  | 'trending' 
  | 'market-cap' 
  | 'volume' 
  | 'holders' 
  | 'newest' 
  | 'price-asc' 
  | 'price-desc';
