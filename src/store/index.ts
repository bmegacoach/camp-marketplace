import { create } from 'zustand';
import { Agent, User, Portfolio, Transaction, PortfolioHolding } from '../types';
import { mockAgents, mockTransactions } from '../data/mockData';

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Agents
  agents: Agent[];
  selectedAgent: Agent | null;
  agentsLoading: boolean;
  
  // Portfolio
  portfolio: Portfolio | null;
  portfolioLoading: boolean;
  
  // Transactions
  transactions: Transaction[];
  transactionsLoading: boolean;
  
  // UI
  sidebarOpen: boolean;
  activeTab: string;
  
  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setAgents: (agents: Agent[]) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  setPortfolio: (portfolio: Portfolio | null) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  
  // Async Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchAgents: () => Promise<void>;
  fetchPortfolio: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  createAgent: (data: Partial<Agent>) => Promise<Agent>;
  buyAgent: (agentId: string, amount: string) => Promise<Transaction>;
  sellAgent: (agentId: string, amount: string) => Promise<Transaction>;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  agents: [],
  selectedAgent: null,
  agentsLoading: false,
  portfolio: null,
  portfolioLoading: false,
  transactions: [],
  transactionsLoading: false,
  sidebarOpen: true,
  activeTab: 'marketplace',
  
  // Setters
  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setAgents: (agents) => set({ agents }),
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setPortfolio: (portfolio) => set({ portfolio }),
  setTransactions: (transactions) => set({ transactions }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Async Actions
  login: async (email, password) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user-1',
      email,
      username: email.split('@')[0],
      fullName: email.split('@')[0],
      avatar: 'https://i.pravatar.cc/150?u=user-1',
      campRole: 'trader',
      campRank: 'silver',
      collaborationMetrics: {
        score: 65,
        projectsCompleted: 3,
        partnersCount: 2,
        activeCols: 1,
      },
      projectsBuilt: 4,
      techBadges: ['react', 'blockchain'],
      achievements: [],
      walletAddress: '0x1234...5678',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set({ user: mockUser, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, portfolio: null, transactions: [] });
  },
  
  fetchAgents: async () => {
    set({ agentsLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ agents: mockAgents, agentsLoading: false });
  },
  
  fetchPortfolio: async () => {
    set({ portfolioLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const holdings: PortfolioHolding[] = mockAgents.slice(0, 3).map(agent => ({
      agentId: agent.id,
      agent,
      tokenAmount: (Math.random() * 1000).toFixed(2),
      averageBuyPrice: (parseFloat(agent.currentPrice) * 0.8).toFixed(4),
      totalInvested: (Math.random() * 5000).toFixed(2),
      currentValue: (Math.random() * 7000).toFixed(2),
      unrealizedPnl: (Math.random() * 2000 - 500).toFixed(2),
      unrealizedPnlPercent: Math.random() * 40 - 10,
    }));
    
    const totalValue = holdings.reduce((sum, h) => sum + parseFloat(h.currentValue), 0);
    const totalInvested = holdings.reduce((sum, h) => sum + parseFloat(h.totalInvested), 0);
    
    set({
      portfolio: {
        userId: get().user?.id || '',
        holdings,
        totalValue: totalValue.toFixed(2),
        totalInvested: totalInvested.toFixed(2),
        totalPnl: (totalValue - totalInvested).toFixed(2),
        totalPnlPercent: ((totalValue - totalInvested) / totalInvested) * 100,
        lastUpdated: new Date(),
      },
      portfolioLoading: false,
    });
  },
  
  fetchTransactions: async () => {
    set({ transactionsLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ transactions: mockTransactions, transactionsLoading: false });
  },
  
  createAgent: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: data.name || 'New Agent',
      symbol: data.symbol || 'NEW',
      description: data.description || '',
      category: data.category || 'Finance',
      status: 'active',
      creatorId: get().user?.id || '',
      currentPrice: '1.00',
      priceChange24h: 0,
      marketCap: data.totalSupply || '1000000',
      volume24h: '0',
      totalRevenue: '0',
      holdersCount: 1,
      transactionsCount: 0,
      revenueSplit: {
        creator: 40,
        holders: 30,
        treasury: 20,
        ecosystem: 10,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set({ agents: [...get().agents, newAgent] });
    return newAgent;
  },
  
  buyAgent: async (agentId, amount) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const agent = get().agents.find(a => a.id === agentId);
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      userId: get().user?.id || '',
      agentId,
      agent,
      type: 'buy',
      amount,
      price: agent?.currentPrice || '1.00',
      totalValue: (parseFloat(amount) * parseFloat(agent?.currentPrice || '1')).toFixed(2),
      status: 'completed',
      network: 'base',
      timestamp: new Date(),
    };
    
    set({ transactions: [transaction, ...get().transactions] });
    return transaction;
  },
  
  sellAgent: async (agentId, amount) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const agent = get().agents.find(a => a.id === agentId);
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      userId: get().user?.id || '',
      agentId,
      agent,
      type: 'sell',
      amount,
      price: agent?.currentPrice || '1.00',
      totalValue: (parseFloat(amount) * parseFloat(agent?.currentPrice || '1')).toFixed(2),
      status: 'completed',
      network: 'base',
      timestamp: new Date(),
    };
    
    set({ transactions: [transaction, ...get().transactions] });
    return transaction;
  },
}));
