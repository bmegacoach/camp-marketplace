// Firebase Configuration and Service Layer
// This service layer is designed for easy integration with Firebase
// Currently uses local mock data with Firebase-compatible structure

import { Agent, User } from '../types';
import { mockAgents, mockUsers } from '../data/mockData';

// Firebase config placeholder - replace with real credentials when available
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase is configured
const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Simulated Firestore-like data store with real-time updates
class FirebaseService {
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();
  private agentsCache: Agent[] = [...mockAgents];
  private usersCache: User[] = [...mockUsers];

  constructor() {
    // Simulate real-time price updates every 10 seconds
    if (typeof window !== 'undefined') {
      setInterval(() => this.simulatePriceUpdates(), 10000);
    }
  }

  // Simulate price fluctuations for demo
  private simulatePriceUpdates() {
    this.agentsCache = this.agentsCache.map(agent => {
      const priceChange = (Math.random() - 0.5) * 2; // -1% to +1%
      const currentPrice = parseFloat(agent.currentPrice);
      const newPrice = currentPrice * (1 + priceChange / 100);
      return {
        ...agent,
        currentPrice: newPrice.toFixed(4),
        priceChange24h: agent.priceChange24h + priceChange * 0.1,
      };
    });
    
    // Notify listeners
    this.notifyListeners('agents', this.agentsCache);
  }

  private notifyListeners(collection: string, data: unknown) {
    const collectionListeners = this.listeners.get(collection);
    if (collectionListeners) {
      collectionListeners.forEach(callback => callback(data));
    }
  }

  // Subscribe to real-time updates (Firestore onSnapshot equivalent)
  subscribe(collection: string, callback: (data: unknown) => void): () => void {
    if (!this.listeners.has(collection)) {
      this.listeners.set(collection, new Set());
    }
    this.listeners.get(collection)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(collection)?.delete(callback);
    };
  }

  // Get all agents (with optional sorting)
  async getAgents(options?: { 
    sortBy?: 'marketCap' | 'volume' | 'holders' | 'priceChange';
    limit?: number;
  }): Promise<Agent[]> {
    let agents = [...this.agentsCache];
    
    if (options?.sortBy) {
      agents.sort((a, b) => {
        switch (options.sortBy) {
          case 'marketCap':
            return parseFloat(b.marketCap) - parseFloat(a.marketCap);
          case 'volume':
            return parseFloat(b.volume24h) - parseFloat(a.volume24h);
          case 'holders':
            return b.holdersCount - a.holdersCount;
          case 'priceChange':
            return b.priceChange24h - a.priceChange24h;
          default:
            return 0;
        }
      });
    }
    
    if (options?.limit) {
      agents = agents.slice(0, options.limit);
    }
    
    return agents;
  }

  // Get trending agents (sorted by 24h volume)
  async getTrendingAgents(limit = 8): Promise<Agent[]> {
    return this.getAgents({ sortBy: 'volume', limit });
  }

  // Get top performers
  async getTopPerformers(sortBy: 'marketCap' | 'holders' | 'volume' = 'marketCap', limit = 8): Promise<Agent[]> {
    const sortMap = {
      marketCap: 'marketCap',
      holders: 'holders', 
      volume: 'volume',
    } as const;
    return this.getAgents({ sortBy: sortMap[sortBy], limit });
  }

  // Get spotlight agent
  async getSpotlightAgent(): Promise<Agent> {
    const spotlight = this.agentsCache.find(a => a.isSpotlight);
    return spotlight || this.agentsCache[0];
  }

  // Get agent by ID
  async getAgentById(id: string): Promise<Agent | null> {
    return this.agentsCache.find(a => a.id === id) || null;
  }

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    return this.usersCache.find(u => u.id === id) || null;
  }

  // Get all users/campers
  async getCampers(): Promise<User[]> {
    return [...this.usersCache];
  }

  // Check if Firebase is properly configured
  isConfigured(): boolean {
    return isFirebaseConfigured;
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();

// Export configuration status for UI indicators
export const getFirebaseStatus = () => ({
  configured: isFirebaseConfigured,
  projectId: firebaseConfig.projectId || 'mock-project',
});
