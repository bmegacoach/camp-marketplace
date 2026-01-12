import { Agent } from '../../types';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ExternalLink, Zap, Share2, Heart, BarChart3 } from 'lucide-react';
import CampRankBadge from '../Badges/CampRankBadge';
import TechBadge from '../Badges/TechBadge';
import { analytics } from '../../services/analytics';

interface SpotlightAgentCardProps {
  agent: Agent;
  onTrade?: () => void;
}

export default function SpotlightAgentCard({ agent, onTrade }: SpotlightAgentCardProps) {
  const isPositive = agent.priceChange24h >= 0;

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toFixed(2);
  };

  const handleShare = () => {
    analytics.trackSpotlightInteraction('share', agent.id);
    if (navigator.share) {
      navigator.share({
        title: `${agent.name} - CAMP Marketplace`,
        text: agent.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavorite = () => {
    analytics.trackSpotlightInteraction('favorite', agent.id);
  };

  const handleAnalytics = () => {
    analytics.trackSpotlightInteraction('view', agent.id);
  };

  const handleExternalLink = (url: string, label: string) => {
    analytics.trackExternalLink(url, label);
  };

  return (
    <div className="w-full bg-gradient-to-br from-bg-spotlight to-bg-base border border-white/[0.08] rounded-xl p-8 lg:p-10 shadow-modal relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 relative">
        <div className="flex items-start gap-6">
          {/* Large Avatar with Badge BELOW */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-accent-primary/40 shadow-glow-accent overflow-hidden">
              <img
                src={agent.imageUrl || agent.creator?.avatar || `https://i.pravatar.cc/150?u=${agent.id}`}
                alt={agent.creatorName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge positioned BELOW the profile picture */}
            {agent.creator && (
              <CampRankBadge rank={agent.creator.campRank} size="lg" />
            )}
          </div>

          {/* Name & Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-display-md text-text-primary font-bold">
                {agent.name}
              </h1>
              <span className="px-3 py-1 bg-semantic-success/20 text-semantic-success rounded-full text-body-sm font-semibold">
                LIVE
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="font-mono text-heading-md text-accent-primary">
                ${agent.symbol}
              </span>
              {agent.creator && (
                <>
                  <span className="text-text-muted">|</span>
                  <span className="text-body-lg text-text-secondary">
                    Built by {agent.creator.fullName}
                  </span>
                </>
              )}
            </div>

            <p className="text-body-lg text-text-secondary leading-relaxed max-w-2xl">
              {agent.description}
            </p>

            {/* Tech Badges */}
            {agent.creator && agent.creator.techBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {agent.creator.techBadges.slice(0, 4).map((tech) => (
                  <TechBadge key={tech} tech={tech} size="md" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 lg:flex-shrink-0">
          <button 
            onClick={handleFavorite}
            className="w-10 h-10 bg-bg-surface/50 border border-white/[0.06] rounded-lg flex items-center justify-center hover:bg-bg-elevated transition-colors group"
          >
            <Heart className="w-4 h-4 text-text-muted group-hover:text-semantic-error transition-colors" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-bg-surface/50 border border-white/[0.06] rounded-lg flex items-center justify-center hover:bg-bg-elevated transition-colors group"
          >
            <Share2 className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
          </button>
          <button 
            onClick={handleAnalytics}
            className="w-10 h-10 bg-bg-surface/50 border border-white/[0.06] rounded-lg flex items-center justify-center hover:bg-bg-elevated transition-colors group"
          >
            <BarChart3 className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-surface/50 rounded-lg p-4 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-text-muted" />
            <span className="text-caption text-text-muted uppercase tracking-wider">Price</span>
          </div>
          <div className="font-mono text-mono-lg text-text-primary">
            ${parseFloat(agent.currentPrice).toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 mt-1 ${
            isPositive ? 'text-semantic-success' : 'text-semantic-error'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="font-mono text-mono-sm">
              {isPositive ? '+' : ''}{agent.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-bg-surface/50 rounded-lg p-4 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-text-muted" />
            <span className="text-caption text-text-muted uppercase tracking-wider">Market Cap</span>
          </div>
          <div className="font-mono text-mono-lg text-text-primary">
            ${formatNumber(agent.marketCap)}
          </div>
        </div>

        <div className="bg-bg-surface/50 rounded-lg p-4 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-text-muted" />
            <span className="text-caption text-text-muted uppercase tracking-wider">24h Volume</span>
          </div>
          <div className="font-mono text-mono-lg text-text-primary">
            ${formatNumber(agent.volume24h)}
          </div>
        </div>

        <div className="bg-bg-surface/50 rounded-lg p-4 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-text-muted" />
            <span className="text-caption text-text-muted uppercase tracking-wider">Holders</span>
          </div>
          <div className="font-mono text-mono-lg text-text-primary">
            {formatNumber(agent.holdersCount)}
          </div>
        </div>
      </div>

      {/* Day in the Life */}
      {agent.dayInTheLife && (
        <div className="bg-bg-surface/30 rounded-lg p-6 border border-white/[0.06] mb-8">
          <h3 className="text-heading-md text-text-primary font-semibold mb-3 flex items-center gap-2">
            Currently Building
            {agent.dayInTheLife.collaborators && agent.dayInTheLife.collaborators.length > 0 && (
              <span className="px-2 py-0.5 bg-accent-primary-muted text-accent-primary rounded-full text-caption">
                Collaboration
              </span>
            )}
          </h3>
          <h4 className="text-body-lg text-text-primary font-semibold mb-2">
            {agent.dayInTheLife.currentProject}
          </h4>
          <p className="text-body-md text-text-secondary leading-relaxed">
            {agent.dayInTheLife.projectDescription}
          </p>
        </div>
      )}

      {/* CTA Buttons - Updated Links */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://campdefi.app"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleExternalLink('https://campdefi.app', 'Trade Alpha')}
          className="btn-primary flex-1 h-14 text-body-lg shadow-glow-accent hover:shadow-glow-accent transition-all flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          Trade Alpha
        </a>
        <a
          href="https://camp-alpha.helpmecoach.ai"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleExternalLink('https://camp-alpha.helpmecoach.ai', 'Launch in CAMP Alpha')}
          className="btn-secondary flex items-center justify-center gap-2 h-14 text-body-md hover:border-accent-primary/50 transition-colors"
        >
          <Zap className="w-5 h-5 text-accent-primary" />
          <span>Launch in CAMP Alpha</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Powered by CAMP */}
      <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-2">
        <div className="w-5 h-5 bg-gradient-to-br from-accent-primary to-accent-primary-hover rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">C</span>
        </div>
        <span className="text-caption text-text-muted">Powered by CAMP Ecosystem</span>
      </div>
    </div>
  );
}
