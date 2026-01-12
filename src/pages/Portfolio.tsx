import { useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { useStore } from '../store';

export function Portfolio() {
  const { 
    portfolio, 
    portfolioLoading, 
    fetchPortfolio, 
    transactions, 
    transactionsLoading, 
    fetchTransactions,
    isAuthenticated,
    setActiveTab,
    setSelectedAgent 
  } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolio();
      fetchTransactions();
    }
  }, [isAuthenticated, fetchPortfolio, fetchTransactions]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Wallet size={64} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-slate-400 mb-6">Login to view your portfolio and transaction history</p>
        <button
          onClick={() => setActiveTab('login')}
          className="px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
        >
          Login / Connect Wallet
        </button>
      </div>
    );
  }

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-slate-400">Track your AI agent holdings and performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {portfolioLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5 animate-pulse">
              <div className="h-4 w-20 bg-slate-700 rounded mb-2" />
              <div className="h-8 w-32 bg-slate-700 rounded" />
            </div>
          ))
        ) : (
          <>
            <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5">
              <p className="text-slate-400 text-sm mb-1">Total Value</p>
              <p className="text-3xl font-bold text-white">{formatNumber(portfolio?.totalValue || '0')}</p>
            </div>
            <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5">
              <p className="text-slate-400 text-sm mb-1">Total Invested</p>
              <p className="text-3xl font-bold text-white">{formatNumber(portfolio?.totalInvested || '0')}</p>
            </div>
            <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5">
              <p className="text-slate-400 text-sm mb-1">Total P&L</p>
              <div className="flex items-center gap-2">
                <p className={`text-3xl font-bold ${parseFloat(portfolio?.totalPnl || '0') >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatNumber(portfolio?.totalPnl || '0')}
                </p>
                {parseFloat(portfolio?.totalPnl || '0') >= 0 ? (
                  <TrendingUp className="text-green-400" size={24} />
                ) : (
                  <TrendingDown className="text-red-400" size={24} />
                )}
              </div>
            </div>
            <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5">
              <p className="text-slate-400 text-sm mb-1">Return %</p>
              <p className={`text-3xl font-bold ${(portfolio?.totalPnlPercent || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(portfolio?.totalPnlPercent || 0) >= 0 ? '+' : ''}{(portfolio?.totalPnlPercent || 0).toFixed(2)}%
              </p>
            </div>
          </>
        )}
      </div>

      {/* Holdings */}
      <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Your Holdings</h2>
        </div>
        
        {portfolioLoading ? (
          <div className="p-5 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-slate-700 rounded" />
                  <div className="h-3 w-16 bg-slate-700 rounded" />
                </div>
                <div className="h-6 w-20 bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        ) : portfolio?.holdings.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate-400 mb-4">You don't have any holdings yet</p>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-4 py-2 bg-electric rounded-lg text-white font-medium hover:bg-electric-700"
            >
              Explore Marketplace
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {portfolio?.holdings.map((holding) => (
              <div
                key={holding.agentId}
                onClick={() => {
                  if (holding.agent) {
                    setSelectedAgent(holding.agent);
                    setActiveTab('agent-detail');
                  }
                }}
                className="flex items-center justify-between p-5 hover:bg-slate-800/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold">
                    {holding.agent?.symbol.slice(0, 2) || 'AG'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{holding.agent?.name || 'Unknown Agent'}</p>
                    <p className="text-slate-400 text-sm">{holding.tokenAmount} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{formatNumber(holding.currentValue)}</p>
                  <p className={`text-sm ${holding.unrealizedPnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.unrealizedPnlPercent >= 0 ? '+' : ''}{holding.unrealizedPnlPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
        </div>
        
        {transactionsLoading ? (
          <div className="p-5 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-slate-700 rounded" />
                  <div className="h-3 w-24 bg-slate-700 rounded" />
                </div>
                <div className="h-6 w-20 bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate-400">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {transactions.slice(0, 10).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tx.type === 'buy' ? 'bg-green-500/20' : 
                    tx.type === 'sell' ? 'bg-red-500/20' :
                    tx.type === 'revenue' ? 'bg-purple-500/20' : 'bg-slate-700'
                  }`}>
                    {tx.type === 'buy' ? <ArrowDownRight className="text-green-400" size={20} /> :
                     tx.type === 'sell' ? <ArrowUpRight className="text-red-400" size={20} /> :
                     tx.type === 'revenue' ? <TrendingUp className="text-purple-400" size={20} /> :
                     <Clock className="text-slate-400" size={20} />}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">
                      {tx.type} {tx.agent?.symbol || 'Token'}
                    </p>
                    <p className="text-slate-400 text-sm">{formatDate(tx.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === 'buy' ? 'text-red-400' : 'text-green-400'}`}>
                    {tx.type === 'buy' ? '-' : '+'}{formatNumber(tx.totalValue)}
                  </p>
                  <p className="text-slate-400 text-sm">{tx.amount} tokens</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
