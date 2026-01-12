import { ServiceAgent } from '../../data/mockData';
import { 
  Shield, Server, Building, Lock, Database, Headphones, 
  Megaphone, TrendingUp, MessageCircle, Heart, BarChart, 
  Calculator, Target, Share2, FileText, Coins, Star,
  Activity, Palette, BookOpen, Clock, Wallet, Home, Briefcase, Rocket
} from 'lucide-react';

interface ServiceAgentCardProps {
  agent: ServiceAgent;
  onClick?: () => void;
}

const iconMap: Record<string, any> = {
  Shield, Server, Building, Lock, Database, Headphones,
  Megaphone, TrendingUp, MessageCircle, Heart, BarChart,
  Calculator, Target, Share2, FileText, Coins, Star,
  Activity, Palette, BookOpen, Clock, Wallet, Home, Briefcase, Rocket
};

export default function ServiceAgentCard({ agent, onClick }: ServiceAgentCardProps) {
  const Icon = iconMap[agent.icon] || Shield;
  
  return (
    <button
      onClick={onClick}
      className="w-full card card-hover p-4 text-left group"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-accent-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-accent-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-body-md font-semibold text-text-primary truncate">
              {agent.name}
            </h3>
            {agent.status === 'coming-soon' && (
              <span className="px-1.5 py-0.5 bg-semantic-warning/20 text-semantic-warning text-[10px] font-bold rounded">
                SOON
              </span>
            )}
          </div>
          
          <p className="text-body-sm text-text-secondary line-clamp-2 mb-2">
            {agent.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">
              {agent.category}
            </span>
            {agent.price && (
              <span className="text-body-sm font-semibold text-semantic-success">
                {agent.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
