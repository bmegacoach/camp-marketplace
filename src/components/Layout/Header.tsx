import { Bell, Search, Wallet, User } from 'lucide-react';
import { useStore } from '../../store';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, sidebarOpen, setActiveTab } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-navy-50/80 backdrop-blur-md border-b border-slate-700/50 z-30 transition-all ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search agents, tokens, or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Network Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-slate-300">Base</span>
          </div>

          {/* Wallet */}
          <button className="flex items-center gap-2 px-4 py-2 bg-electric/20 border border-electric/50 rounded-lg text-electric hover:bg-electric/30 transition-all">
            <Wallet size={18} />
            <span className="text-sm font-medium">
              {isAuthenticated && user?.walletAddress
                ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`
                : 'Connect Wallet'}
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-electric rounded-full" />
          </button>

          {/* Profile */}
          {isAuthenticated ? (
            <button
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-electric/50 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-white text-sm font-medium">{user?.username}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="flex items-center gap-2 px-4 py-2 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
            >
              <User size={18} />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
