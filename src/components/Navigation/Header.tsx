import { useState, useRef, useEffect } from 'react';
import { Search, Wallet, ChevronDown, ExternalLink, BookOpen, Users, Zap, FileText, Layers, Flame, Trophy, GraduationCap, Building, Cpu, Filter } from 'lucide-react';
import { analytics } from '../../services/analytics';
import { SUPPORTED_CHAINS } from '../../services/wallet';
import CampCommunityModal from '../Modals/CampCommunityModal';

type TabType = 'marketplace' | 'campers' | 'build' | 'camp-life' | 'camp-idl';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onConnectWallet?: () => void;
  walletConnected?: boolean;
  walletAddress?: string;
  walletBalance?: string;
  chainId?: number;
}

const ecosystemLinks = [
  { id: 'alpha', label: 'CAMP Alpha', description: 'Design Suite', url: 'https://camp-alpha.helpmecoach.ai', icon: Zap, isExternal: true },
  { id: 'defi', label: 'CAMP DeFi', description: 'Treasury Management', url: 'https://campdefi.app', icon: Layers, isExternal: true },
  { id: 'rwa', label: 'CAMP RWA Tokenization', description: 'Real World Assets', url: 'https://rwa.camp.xyz', icon: FileText, isExternal: true },
  { id: 'community', label: 'Camp Community', description: 'Join the Hub', url: '#', icon: Users, isModal: 'community' },
  { id: 'docs', label: 'Camp Docs', description: 'User Manual Coming Soon', url: 'https://docs.camp.xyz/marketplace', icon: BookOpen, isExternal: true, comingSoon: true },
];

const searchCategories = [
  { id: 'all', label: 'All Agents', icon: Search },
  { id: 'trending', label: 'Trending Agents', icon: Flame },
  { id: 'campers', label: 'Qualified Campers', icon: GraduationCap },
  { id: 'rwa', label: 'RWA Properties', icon: Building },
  { id: 'service', label: 'Service Agents', icon: Cpu },
];

const serviceSubcategories = [
  'Audits', 'Security', 'AI Receptionists', 'Marketing', 'Sales',
  'Customer Support', 'Health and Wellness Coach', 'Personal Finance Coach'
];

export default function Header({ 
  activeTab, 
  onTabChange, 
  onConnectWallet,
  walletConnected = false,
  walletAddress,
  walletBalance,
  chainId 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('all');
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const ecosystemDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'campers', label: 'Campers' },
    { id: 'build', label: 'Build Agent' },
    { id: 'camp-life', label: 'Camp Life' },
    { id: 'camp-idl', label: 'CAMP IDL' },
  ];

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId: number) => {
    return SUPPORTED_CHAINS[chainId as keyof typeof SUPPORTED_CHAINS]?.name || `Chain ${chainId}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ecosystemDropdownRef.current && !ecosystemDropdownRef.current.contains(event.target as Node)) {
        setEcosystemOpen(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEcosystemLinkClick = (link: typeof ecosystemLinks[0]) => {
    if (link.isModal === 'community') {
      setCommunityModalOpen(true);
      setEcosystemOpen(false);
      return;
    }
    analytics.trackEcosystemLinkClick(link.id, link.url, link.label);
    setEcosystemOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      analytics.trackSearch(searchQuery, 0);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedSearchCategory(categoryId);
    setSearchDropdownOpen(false);
  };

  const selectedCategoryData = searchCategories.find(c => c.id === selectedSearchCategory) || searchCategories[0];
  const SelectedIcon = selectedCategoryData.icon;

  return (
    <>
      <header className="sticky top-0 z-50 h-16 bg-bg-base/80 backdrop-blur-nav border-b border-white/[0.08]">
        <div className="container-main h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-primary-hover rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-heading-lg font-bold text-text-primary">CAMP</span>
            </div>

            {/* Nav Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 text-body-md font-medium transition-all duration-fast relative ${
                    activeTab === tab.id
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'camp-idl' && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-semantic-warning/20 text-semantic-warning text-[10px] font-bold rounded">NEW</span>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
                  )}
                </button>
              ))}
              
              {/* Ecosystem Dropdown */}
              <div className="relative" ref={ecosystemDropdownRef}>
                <button
                  onClick={() => setEcosystemOpen(!ecosystemOpen)}
                  className={`px-4 py-2 text-body-md font-medium transition-all duration-fast flex items-center gap-1 ${
                    ecosystemOpen ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Ecosystem
                  <ChevronDown className={`w-4 h-4 transition-transform ${ecosystemOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {ecosystemOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-bg-elevated border border-white/[0.1] rounded-md shadow-modal overflow-hidden animate-fade-in">
                    <div className="p-2">
                      {ecosystemLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.isModal ? '#' : link.url}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          onClick={(e) => {
                            if (link.isModal) {
                              e.preventDefault();
                            }
                            handleEcosystemLinkClick(link);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-bg-spotlight transition-colors group"
                        >
                          <div className="w-9 h-9 bg-accent-primary-muted rounded-md flex items-center justify-center flex-shrink-0">
                            <link.icon className="w-4 h-4 text-accent-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-body-sm text-text-primary font-medium">{link.label}</span>
                              {link.isExternal && <ExternalLink className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />}
                              {link.comingSoon && (
                                <span className="px-1.5 py-0.5 bg-semantic-warning/20 text-semantic-warning text-[9px] font-bold rounded">SOON</span>
                              )}
                            </div>
                            <span className="text-caption text-text-muted">{link.description}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-bg-surface/50 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-semantic-success rounded-full animate-pulse"></div>
                        <span className="text-caption text-text-muted">Ecosystem Status: All Systems Operational</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Search & Wallet */}
          <div className="flex items-center gap-4">
            {/* Search with Dropdown Filter */}
            <div className="hidden sm:flex relative" ref={searchDropdownRef}>
              <form onSubmit={handleSearch} className="flex items-center bg-bg-surface border border-white/[0.06] rounded-sm focus-within:border-accent-primary transition-colors">
                {/* Category Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 border-r border-white/[0.06] hover:bg-bg-elevated transition-colors"
                >
                  <SelectedIcon className="w-4 h-4 text-accent-primary" />
                  <ChevronDown className={`w-3 h-3 text-text-muted transition-transform ${searchDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Search Input */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <Search className="w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder={`Search ${selectedCategoryData.label.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-44 bg-transparent text-body-sm text-text-primary placeholder-text-muted outline-none"
                  />
                </div>
              </form>

              {/* Search Category Dropdown */}
              {searchDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-bg-elevated border border-white/[0.1] rounded-md shadow-modal overflow-hidden animate-fade-in z-50">
                  <div className="p-2">
                    <div className="text-caption text-text-muted uppercase tracking-wider px-3 py-2">Filter By</div>
                    {searchCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                          selectedSearchCategory === category.id
                            ? 'bg-accent-primary-muted text-accent-primary'
                            : 'hover:bg-bg-spotlight text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="text-body-sm font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Service Agent Sub-categories */}
                  {selectedSearchCategory === 'service' && (
                    <div className="border-t border-white/[0.06] p-2">
                      <div className="text-caption text-text-muted uppercase tracking-wider px-3 py-2">Service Categories</div>
                      <div className="max-h-40 overflow-y-auto">
                        {serviceSubcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setSearchQuery(sub);
                              setSearchDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-body-sm text-text-secondary hover:text-text-primary hover:bg-bg-spotlight rounded-sm transition-colors"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wallet */}
            <button
              onClick={onConnectWallet}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-all ${
                walletConnected 
                  ? 'bg-bg-elevated border border-white/[0.1] hover:bg-bg-spotlight' 
                  : 'btn-primary'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-body-sm font-medium">
                  {walletConnected && walletAddress 
                    ? formatWalletAddress(walletAddress)
                    : 'Connect Wallet'
                  }
                </span>
                {walletConnected && chainId && (
                  <span className="text-caption text-text-muted">
                    {getChainName(chainId)} {walletBalance ? `| ${walletBalance} ETH` : ''}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <CampCommunityModal 
        isOpen={communityModalOpen} 
        onClose={() => setCommunityModalOpen(false)} 
      />
    </>
  );
}
