import { Agent } from '../../types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import CampRankBadge from '../Badges/CampRankBadge';

interface AgentCardCompactProps {
  agent: Agent;
  onClick?: () => void;
  index?: number;
}

export default function AgentCardCompact({ agent, onClick, index }: AgentCardCompactProps) {
  const isPositive = agent.priceChange24h >= 0;

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toFixed(2);
  };

  return (
    <button
      onClick={onClick}
      className="w-full card card-hover p-4 flex items-center gap-3 text-left group"
    >
      {/* Rank Number */}
      {index !== undefined && (
        <div className="text-mono-md text-text-muted font-semibold w-6">
          {index + 1}
        </div>
      )}

      {/* Avatar with Badge on SIDE */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <img
          src={agent.imageUrl || agent.creator?.avatar || `https://i.pravatar.cc/150?u=${agent.id}`}
          alt={agent.creatorName}
          className="w-10 h-10 rounded-full border-2 border-bg-elevated"
        />
        {agent.creator && (
          <CampRankBadge rank={agent.creator.campRank} size="sm" showLabel={false} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-body-sm font-semibold text-text-primary truncate">
            {agent.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-mono-sm text-text-muted">
            ${agent.symbol}
          </span>
          {agent.creator && (
            <span className="text-caption text-text-muted truncate">
              {agent.creator.fullName}
            </span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="text-right flex-shrink-0">
        <div className="font-mono text-mono-sm text-text-primary">
          ${parseFloat(agent.currentPrice).toFixed(2)}
        </div>
        <div className={`flex items-center justify-end gap-1 mt-0.5 ${
          isPositive ? 'text-semantic-success' : 'text-semantic-error'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="font-mono text-mono-sm">
            {isPositive ? '+' : ''}{agent.priceChange24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </button>
  );
}
