import { BarChart3, TrendingUp, DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../store';

export function Analytics() {
  const { agents, isAuthenticated, setActiveTab } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <BarChart3 size={64} className="text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-slate-400 mb-6">Login to view detailed marketplace analytics</p>
        <button
          onClick={() => setActiveTab('login')}
          className="px-6 py-3 bg-electric rounded-lg text-white font-medium hover:bg-electric-700 transition-all"
        >
          Login
        </button>
      </div>
    );
  }

  const topGainers = [...agents].sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 5);
  const topVolume = [...agents].sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h)).slice(0, 5);

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-slate-400">Marketplace insights and performance metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: BarChart3, label: 'Total Agents', value: agents.length.toString(), change: '+12%', positive: true },
          { icon: DollarSign, label: 'Total Market Cap', value: '$24.5M', change: '+8.3%', positive: true },
          { icon: Activity, label: '24h Volume', value: '$2.4M', change: '-3.2%', positive: false },
          { icon: Users, label: 'Active Traders', value: '12,543', change: '+15%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <stat.icon className="text-electric" size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50 flex items-center gap-2">
            <TrendingUp className="text-green-400" size={20} />
            <h2 className="text-lg font-semibold text-white">Top Gainers (24h)</h2>
          </div>
          <div className="divide-y divide-slate-700/50">
            {topGainers.map((agent, i) => (
              <div key={agent.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-sm w-5">{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold text-xs">
                    {agent.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{agent.name}</p>
                    <p className="text-slate-400 text-xs">${agent.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">${parseFloat(agent.currentPrice).toFixed(4)}</p>
                  <p className="text-green-400 text-sm">+{agent.priceChange24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Volume */}
        <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50 flex items-center gap-2">
            <Activity className="text-electric" size={20} />
            <h2 className="text-lg font-semibold text-white">Top Volume (24h)</h2>
          </div>
          <div className="divide-y divide-slate-700/50">
            {topVolume.map((agent, i) => (
              <div key={agent.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-sm w-5">{i + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold text-xs">
                    {agent.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{agent.name}</p>
                    <p className="text-slate-400 text-xs">${agent.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{formatNumber(agent.volume24h)}</p>
                  <p className="text-slate-400 text-sm">{agent.transactionsCount} txns</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Agents by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Finance', 'Trading', 'Healthcare', 'Logistics', 'Legal', 'Creative'].map((category) => {
            const count = agents.filter(a => a.category === category).length;
            const percent = agents.length > 0 ? (count / agents.length) * 100 : 0;
            
            return (
              <div key={category} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#334155" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28" fill="none"
                      stroke="#2563EB"
                      strokeWidth="4"
                      strokeDasharray={`${percent * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                    {count}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{category}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network Stats */}
      <div className="bg-navy-50/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Network Distribution</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Base', percent: 65, color: 'bg-blue-500' },
            { name: 'Ethereum', percent: 20, color: 'bg-purple-500' },
            { name: 'Polygon', percent: 10, color: 'bg-violet-500' },
            { name: 'Solana', percent: 5, color: 'bg-green-500' },
          ].map((network) => (
            <div key={network.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{network.name}</span>
                <span className="text-slate-400 text-sm">{network.percent}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${network.color} rounded-full transition-all`}
                  style={{ width: `${network.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
