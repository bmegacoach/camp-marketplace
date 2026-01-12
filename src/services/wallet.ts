// Wallet Connection Service with ethers.js
// Supports MetaMask and other EIP-1193 compatible wallets
import { ethers } from 'ethers';

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  provider: ethers.providers.Web3Provider | null;
}

export interface WalletService {
  connect: () => Promise<WalletState>;
  disconnect: () => void;
  getState: () => WalletState;
  switchChain: (chainId: number) => Promise<void>;
  onAccountChange: (callback: (accounts: string[]) => void) => void;
  onChainChange: (callback: (chainId: number) => void) => void;
}

// Chain configurations
export const SUPPORTED_CHAINS = {
  1: { name: 'Ethereum', symbol: 'ETH', rpcUrl: 'https://eth.llamarpc.com', blockExplorer: 'https://etherscan.io' },
  8453: { name: 'Base', symbol: 'ETH', rpcUrl: 'https://mainnet.base.org', blockExplorer: 'https://basescan.org' },
  137: { name: 'Polygon', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.com', blockExplorer: 'https://polygonscan.com' },
  84532: { name: 'Base Sepolia', symbol: 'ETH', rpcUrl: 'https://sepolia.base.org', blockExplorer: 'https://sepolia.basescan.org' },
};

class WalletConnectionService implements WalletService {
  private state: WalletState = {
    connected: false,
    address: null,
    chainId: null,
    balance: null,
    provider: null,
  };
  
  private accountChangeCallbacks: ((accounts: string[]) => void)[] = [];
  private chainChangeCallbacks: ((chainId: number) => void)[] = [];

  constructor() {
    // Auto-reconnect if previously connected
    if (typeof window !== 'undefined') {
      this.checkExistingConnection();
    }
  }

  private async checkExistingConnection() {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider, 'any');
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          await this.updateState(provider, accounts[0]);
        }
      } catch (error) {
        console.log('No existing wallet connection');
      }
      
      // Setup listeners
      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider, 'any');
          await this.updateState(provider, accounts[0]);
        }
        this.accountChangeCallbacks.forEach(cb => cb(accounts));
      });

      window.ethereum.on('chainChanged', async (chainIdHex: string) => {
        const chainId = parseInt(chainIdHex, 16);
        this.state.chainId = chainId;
        
        // Refresh balance on chain change
        if (this.state.address && this.state.provider) {
          try {
            const balance = await this.state.provider.getBalance(this.state.address);
            this.state.balance = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
          } catch (e) {
            console.error('Error fetching balance on chain change:', e);
          }
        }
        
        this.chainChangeCallbacks.forEach(cb => cb(chainId));
      });

      window.ethereum.on('disconnect', () => {
        this.disconnect();
      });
    }
  }

  private async updateState(provider: ethers.providers.Web3Provider, address: string) {
    this.state.address = address;
    this.state.connected = true;
    this.state.provider = provider;
    
    try {
      // Get network/chain info
      const network = await provider.getNetwork();
      this.state.chainId = network.chainId;
      
      // Get balance using ethers
      const balance = await provider.getBalance(address);
      this.state.balance = parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
    } catch (error) {
      console.error('Error updating wallet state:', error);
    }
  }

  async connect(): Promise<WalletState> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.');
    }

    try {
      // Create ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider, 'any');
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        await this.updateState(provider, accounts[0]);
        this.setupEventListeners();
      }
      
      return this.state;
    } catch (error: unknown) {
      const err = error as { code?: number; message?: string };
      if (err.code === 4001) {
        throw new Error('User rejected the connection request');
      }
      throw new Error(err.message || 'Failed to connect wallet');
    }
  }

  disconnect(): void {
    this.state = {
      connected: false,
      address: null,
      chainId: null,
      balance: null,
      provider: null,
    };
  }

  getState(): WalletState {
    return { ...this.state };
  }

  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('No wallet detected');
    }

    const chainIdHex = `0x${chainId.toString(16)}`;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: unknown) {
      const err = error as { code?: number };
      // Chain not added, try to add it
      if (err.code === 4902) {
        const chainConfig = SUPPORTED_CHAINS[chainId as keyof typeof SUPPORTED_CHAINS];
        if (chainConfig) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: chainConfig.name,
              nativeCurrency: {
                name: chainConfig.symbol,
                symbol: chainConfig.symbol,
                decimals: 18,
              },
              rpcUrls: [chainConfig.rpcUrl],
              blockExplorerUrls: [chainConfig.blockExplorer],
            }],
          });
        }
      } else {
        throw error;
      }
    }
  }

  onAccountChange(callback: (accounts: string[]) => void): void {
    this.accountChangeCallbacks.push(callback);
  }

  onChainChange(callback: (chainId: number) => void): void {
    this.chainChangeCallbacks.push(callback);
  }

  // Helper to get ENS name if available
  async getENSName(address: string): Promise<string | null> {
    if (!this.state.provider) return null;
    try {
      return await this.state.provider.lookupAddress(address);
    } catch {
      return null;
    }
  }

  // Helper to sign messages (for future authentication)
  async signMessage(message: string): Promise<string> {
    if (!this.state.provider || !this.state.address) {
      throw new Error('Wallet not connected');
    }
    const signer = this.state.provider.getSigner();
    return await signer.signMessage(message);
  }
}

// Export singleton
export const walletService = new WalletConnectionService();

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}
