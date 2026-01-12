import { CampRank } from '../../types';
import { Award } from 'lucide-react';

interface CampRankBadgeProps {
  rank: CampRank;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const rankColors: Record<CampRank, string> = {
  bronze: 'rank-bronze',
  silver: 'rank-silver',
  gold: 'rank-gold',
  platinum: 'rank-platinum',
  diamond: 'rank-diamond',
};

const rankLabels: Record<CampRank, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  diamond: 'Diamond',
};

const sizeClasses = {
  sm: { icon: 'w-4 h-4', text: 'text-caption', padding: 'px-2 py-0.5' },
  md: { icon: 'w-5 h-5', text: 'text-body-sm', padding: 'px-2.5 py-1' },
  lg: { icon: 'w-6 h-6', text: 'text-body-md', padding: 'px-3 py-1.5' },
};

export default function CampRankBadge({ rank, size = 'md', showLabel = true }: CampRankBadgeProps) {
  const sizeClass = sizeClasses[size];
  const colorClass = rankColors[rank];
  
  return (
    <div 
      className={`badge badge-rank inline-flex items-center gap-1.5 border-${colorClass}/50 bg-${colorClass}/10 ${sizeClass.padding}`}
      style={{
        borderColor: `var(--${colorClass})`,
        backgroundColor: `color-mix(in srgb, var(--${colorClass}) 10%, transparent)`,
      }}
    >
      <Award 
        className={sizeClass.icon}
        style={{ color: `var(--${colorClass})` }}
      />
      {showLabel && (
        <span 
          className={`${sizeClass.text} font-semibold`}
          style={{ color: `var(--${colorClass})` }}
        >
          {rankLabels[rank]}
        </span>
      )}
    </div>
  );
}
