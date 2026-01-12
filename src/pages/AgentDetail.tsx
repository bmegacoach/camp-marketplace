import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Activity, DollarSign, Layers, Globe, Github, Copy, ExternalLink, ShoppingCart, ArrowUpDown } from 'lucide-react';
import { useStore } from '../store';

export function AgentDetail() {
  const { selectedAgent, setActiveTab, isAuthenticated, buyAgent, sellAgent } = useStore();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [isTrading, setIsTrading] = useState(false);

  if (!selectedAgent) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400">No agent selected</p>
        <button onClick={() => setActiveTab('marketplace')} className="mt-4 text-electric hover:underline">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const isPositive = selectedAgent.priceChange24h >= 0;
  const totalValue = amount ? (parseFloat(amount) * parseFloat(selectedAgent.currentPrice)).toFixed(4) : '0.00';

  const handleTrade = async () => {
    if (!amount || !isAuthenticated) return;
    setIsTrading(true);
    try {
      if (tradeType === 'buy') {
        await buyAgent(selectedAgent.id, amount);
      } else {
        await sellAgent(selectedAgent.id, amount);
      }
      setAmount('');
    } finally {
      setIsTrading(false);
    }
  };

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('marketplace')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedAgent.symbol.slice(0, 2)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{selectedAgent.name}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400">${selectedAgent.symbol}</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                      {selectedAgent.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedAgent.websiteUrl && (
                  <a href={selectedAgent.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                    <Globe size={18} />
                  </a>
                )}
                {selectedAgent.githubUrl && (
                  <a href={selectedAgent.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-6 mb-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Current Price</p>
                <p className="text-4xl font-bold text-white">${parseFloat(selectedAgent.currentPrice).toFixed(4)}</p>
              </div>
              <div className={`flex items-center gap-2 pb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="text-lg font-medium">{isPositive ? '+' : ''}{selectedAgent.priceChange24h.toFixed(2)}%</span>
                <span className="text-slate-400 text-sm">24h</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: 'Market Cap', value: formatNumber(selectedAgent.marketCap) },
                { icon: Activity, label: 'Volume 24h', value: formatNumber(selectedAgent.volume24h) },
                { icon: Users, label: 'Holders', value: selectedAgent.holdersCount.toLocaleString() },
                { icon: Layers, label: 'Total Supply', value: selectedAgent.totalSupply || '1M' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <stat.icon size={14} />
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <p className="text-white font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">About {selectedAgent.name}</h2>
            <p className="text-slate-300 leading-relaxed">{selectedAgent.description}</p>
          </div>

          {/* Revenue Split */}
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Revenue Distribution</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Creator', value: selectedAgent.revenueSplit.creator, color: 'bg-electric' },
                { label: 'Holders', value: selectedAgent.revenueSplit.holders, color: 'bg-green-500' },
                { label: 'Treasury', value: selectedAgent.revenueSplit.treasury, color: 'bg-purple-500' },
                { label: 'Ecosystem', value: selectedAgent.revenueSplit.ecosystem, color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="#334155" strokeWidth="6" />
                      <circle
                        cx="40" cy="40" r="35" fill="none"
                        className={item.color.replace('bg-', 'stroke-')}
                        strokeWidth="6"
                        strokeDasharray={`${item.value * 2.2} 220`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                      {item.value}%
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Info */}
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Contract Information</h2>
            <div className="space-y-3">
              {[
                { label: 'Token Address', value: selectedAgent.tokenAddress || 'Pending deployment' },
                { label: 'Contract Address', value: selectedAgent.contractAddress || 'Pending deployment' },
                { label: 'Network', value: 'Base (Chain ID: 8453)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <span className="text-slate-400">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm">
                      {item.value.length > 20 ? `${item.value.slice(0, 10)}...${item.value.slice(-8)}` : item.value}
                    </span>
                    <button className="text-slate-400 hover:text-white">
                      <Copy size={14} />
                    </button>
                    <a href="#" className="text-slate-400 hover:text-white">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Panel */}
        <div className="space-y-6">
          <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">Trade {selectedAgent.symbol}</h2>
            
            {/* Trade Type Toggle */}
            <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  tradeType === 'buy' ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 rounded-md font-medium transition-all ${
                  tradeType === 'sell' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-slate-400 text-sm mb-2">Amount ({selectedAgent.symbol})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-electric"
              />
            </div>

            {/* Price Info */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Price per token</span>
                <span className="text-white">${parseFloat(selectedAgent.currentPrice).toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total {tradeType === 'buy' ? 'cost' : 'receive'}</span>
                <span className="text-white font-semibold">${totalValue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Network</span>
                <span className="text-white">Base</span>
              </div>
            </div>

            {/* Trade Button */}
            {isAuthenticated ? (
              <button
                onClick={handleTrade}
                disabled={!amount || isTrading}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  tradeType === 'buy'
                    ? 'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-500/50'
                    : 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-500/50'
                } disabled:cursor-not-allowed`}
              >
                {isTrading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {tradeType === 'buy' ? <ShoppingCart size={20} /> : <ArrowUpDown size={20} />}
                    {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedAgent.symbol}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-4 rounded-lg font-semibold bg-electric hover:bg-electric-700 text-white transition-all"
              >
                Connect Wallet to Trade
              </button>
            )}

            <p className="text-slate-500 text-xs text-center mt-4">
              Trading requires a connected wallet. Gas fees apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
