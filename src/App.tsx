import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Navigation/Header';
import Footer from './components/Layout/Footer';
import BackgroundLogo from './components/Layout/BackgroundLogo';
import MarketplacePage from './pages/MarketplacePage';
import CampersPage from './pages/CampersPage';
import BuildAgentPage from './pages/BuildAgentPage';
import CampLifePage from './pages/CampLifePage';
import CampIDLPage from './pages/CampIDLPage';
import CamperProfilePage from './pages/CamperProfilePage';
import SponsorPaymentModal from './components/Modals/SponsorPaymentModal';
import { SponsorModalProvider } from './contexts/SponsorModalContext';
import { walletService, WalletState } from './services/wallet';
import { analytics } from './services/analytics';
// Initialize Firebase
import { trackPageView } from './lib/firebase';

type TabType = 'marketplace' | 'campers' | 'build' | 'camp-life' | 'camp-idl';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = (): TabType => {
    const path = location.pathname;
    if (path.startsWith('/campers') || path.startsWith('/camper/')) return 'campers';
    if (path.startsWith('/build')) return 'build';
    if (path.startsWith('/camp-life')) return 'camp-life';
    if (path.startsWith('/camp-idl')) return 'camp-idl';
    return 'marketplace';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getActiveTab());
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    chainId: null,
    balance: null,
    provider: null,
  });
  const [walletError, setWalletError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  // Initialize wallet state on mount
  useEffect(() => {
    const initialState = walletService.getState();
    if (initialState.connected) {
      setWalletState(initialState);
      analytics.setUserId(initialState.address);
    }

    // Listen for account changes
    walletService.onAccountChange((accounts) => {
      if (accounts.length === 0) {
        setWalletState({
          connected: false,
          address: null,
          chainId: null,
          balance: null,
          provider: null,
        });
        analytics.setUserId(null);
        analytics.trackWalletDisconnect();
      } else {
        const newState = walletService.getState();
        setWalletState(newState);
        analytics.setUserId(newState.address);
      }
    });

    // Listen for chain changes
    walletService.onChainChange((chainId) => {
      setWalletState(prev => ({ ...prev, chainId }));
    });

    // Track initial page view
    analytics.trackPageView('marketplace');
    trackPageView('marketplace');
  }, []);

  const handleConnectWallet = useCallback(async () => {
    setWalletError(null);
    
    if (walletState.connected) {
      // Disconnect
      walletService.disconnect();
      setWalletState({
        connected: false,
        address: null,
        chainId: null,
        balance: null,
        provider: null,
      });
      analytics.setUserId(null);
      analytics.trackWalletDisconnect();
    } else {
      // Connect
      try {
        const state = await walletService.connect();
        setWalletState(state);
        if (state.address && state.chainId) {
          analytics.setUserId(state.address);
          analytics.trackWalletConnect(state.address, state.chainId);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
        setWalletError(errorMessage);
        console.error('Wallet connection error:', error);
      }
    }
  }, [walletState.connected]);

  const handleTabChange = useCallback((tab: TabType) => {
    const previousTab = activeTab;
    setActiveTab(tab);
    analytics.trackTabChange(tab, previousTab);
    analytics.trackPageView(tab);
    
    // Navigate to the appropriate route
    const routes: Record<TabType, string> = {
      marketplace: '/',
      campers: '/campers',
      build: '/build',
      'camp-life': '/camp-life',
      'camp-idl': '/camp-idl',
    };
    navigate(routes[tab]);
  }, [activeTab, navigate]);

  return (
    <div className="min-h-screen bg-bg-base relative flex flex-col">
      <BackgroundLogo />
      <div className="relative z-10 flex flex-col flex-1">
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onConnectWallet={handleConnectWallet}
          walletConnected={walletState.connected}
          walletAddress={walletState.address || undefined}
          walletBalance={walletState.balance || undefined}
          chainId={walletState.chainId || undefined}
        />
        {walletError && (
          <div className="bg-semantic-error/10 border-b border-semantic-error/20 px-4 py-2 text-center">
            <span className="text-body-sm text-semantic-error">{walletError}</span>
            <button 
              onClick={() => setWalletError(null)}
              className="ml-4 text-body-sm text-text-muted hover:text-text-primary"
            >
              Dismiss
            </button>
          </div>
        )}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MarketplacePage />} />
            <Route path="/campers" element={<CampersPage />} />
            <Route path="/camper/:id" element={<CamperProfilePage />} />
            <Route path="/build" element={<BuildAgentPage />} />
            <Route path="/camp-life" element={<CampLifePage />} />
            <Route path="/camp-idl" element={<CampIDLPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SponsorModalProvider>
        <AppContent />
        <SponsorPaymentModal />
      </SponsorModalProvider>
    </BrowserRouter>
  );
}

export default App;
