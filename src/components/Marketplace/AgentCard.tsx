import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react';
import { Agent } from '../../types';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const isPositive = agent.priceChange24h >= 0;
  
  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Finance: 'bg-green-500/20 text-green-400 border-green-500/30',
      Trading: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Healthcare: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      Logistics: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      Legal: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Creative: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div
      onClick={onClick}
      className="group bg-navy-50/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 cursor-pointer hover:border-electric/50 hover:bg-navy-50/80 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-white font-bold text-lg">
            {agent.symbol.slice(0, 2)}
          </div>
          <div>
            <h3 className="text-white font-semibold group-hover:text-electric transition-colors">
              {agent.name}
            </h3>
            <span className="text-slate-400 text-sm">${agent.symbol}</span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryColor(agent.category)}`}>
          {agent.category}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-slate-400 text-xs mb-1">Current Price</p>
          <p className="text-white text-2xl font-bold">
            ${parseFloat(agent.currentPrice).toFixed(4)}
          </p>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="font-medium">{isPositive ? '+' : ''}{agent.priceChange24h.toFixed(2)}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800/50">
            <Users size={14} className="text-slate-400" />
          </div>
          <div>
            <p className="text-slate-400 text-xs">Holders</p>
            <p className="text-white text-sm font-medium">{agent.holdersCount.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800/50">
            <Activity size={14} className="text-slate-400" />
          </div>
          <div>
            <p className="text-slate-400 text-xs">Volume 24h</p>
            <p className="text-white text-sm font-medium">{formatNumber(agent.volume24h)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
