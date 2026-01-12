import { TechBadge as TechBadgeType } from '../../types';
import { Code2, Database, Cpu, Blocks, Globe, BarChart3, Wallet2, Image } from 'lucide-react';

interface TechBadgeProps {
  tech: TechBadgeType;
  size?: 'sm' | 'md';
}

const techIcons: Record<TechBadgeType, React.ReactNode> = {
  react: <Code2 />,
  python: <Code2 />,
  'ai-ml': <Cpu />,
  blockchain: <Blocks />,
  web3: <Globe />,
  'data-science': <BarChart3 />,
  defi: <Wallet2 />,
  nft: <Image />,
};

const techLabels: Record<TechBadgeType, string> = {
  react: 'React',
  python: 'Python',
  'ai-ml': 'AI/ML',
  blockchain: 'Blockchain',
  web3: 'Web3',
  'data-science': 'Data Science',
  defi: 'DeFi',
  nft: 'NFT',
};

const sizeClasses = {
  sm: { container: 'px-2 py-1', icon: 'w-3 h-3', text: 'text-caption' },
  md: { container: 'px-2.5 py-1', icon: 'w-4 h-4', text: 'text-body-sm' },
};

export default function TechBadge({ tech, size = 'sm' }: TechBadgeProps) {
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`inline-flex items-center gap-1.5 bg-bg-elevated rounded-full ${sizeClass.container}`}>
      <div className={`${sizeClass.icon} text-text-muted`}>
        {techIcons[tech]}
      </div>
      <span className={`${sizeClass.text} text-text-secondary font-medium`}>
        {techLabels[tech]}
      </span>
    </div>
  );
}
