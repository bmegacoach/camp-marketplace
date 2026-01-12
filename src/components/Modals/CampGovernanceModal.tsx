import { X, Map, Rocket, GraduationCap, MapPin, Building2, TrendingUp, Cpu, CheckCircle2, Clock, Circle } from 'lucide-react';

interface CampGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roadmapItems = [
  {
    id: 1,
    title: 'CAMP IDL Development',
    subtitle: 'ETH Inscription Distribution Layer',
    description: 'Autonomous AI agent-powered distribution layer for token projects. Omnichain architecture with LayerZero integration.',
    status: 'in-progress',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'CAMP DeFi Scholarships',
    subtitle: 'Education & Opportunity',
    description: 'Funding next-gen builders through community-backed scholarships. Learn Vibe Coding with mentorship from top campers.',
    status: 'upcoming',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'CAMP Location Options',
    subtitle: 'Physical Vibe Houses',
    description: 'Strategic locations for in-person collaboration. Only 12 spots per Vibe House. First-come-first-served allocation.',
    status: 'upcoming',
    icon: MapPin,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'Commercial vs Residential Plans',
    subtitle: 'Choose Your Path',
    description: 'Flexible membership tiers: Build from home or join a physical hub. Commercial licenses for agency operators.',
    status: 'planning',
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Price Increase Timeline',
    subtitle: 'Early Adopter Advantage',
    description: 'Tiered pricing with scheduled increases. Current sponsors lock in founding rates. Scarcity drives value.',
    status: 'planning',
    icon: TrendingUp,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'ETH Inscription Tech Options',
    subtitle: 'On-Chain Identity',
    description: 'PRD and agent identity verification via ETH inscriptions. Immutable proof of creation and ownership.',
    status: 'research',
    icon: Rocket,
    color: 'from-indigo-500 to-purple-500',
  },
];

const statusConfig = {
  'completed': { label: 'Completed', icon: CheckCircle2, color: 'text-semantic-success', bg: 'bg-semantic-success/20' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'text-accent-primary', bg: 'bg-accent-primary/20' },
  'upcoming': { label: 'Upcoming', icon: Circle, color: 'text-semantic-warning', bg: 'bg-semantic-warning/20' },
  'planning': { label: 'Planning', icon: Circle, color: 'text-text-muted', bg: 'bg-bg-surface' },
  'research': { label: 'Research', icon: Circle, color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

export default function CampGovernanceModal({ isOpen, onClose }: CampGovernanceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto py-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-bg-elevated border border-white/[0.1] rounded-xl overflow-hidden animate-scale-in">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 bg-bg-elevated/95 backdrop-blur-sm border-b border-white/[0.06] p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-purple-600 rounded-xl flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-heading-lg text-text-primary font-bold">
                  CAMP Governance Roadmap
                </h2>
                <p className="text-body-sm text-text-secondary">
                  Building the future of autonomous agent marketplaces
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-bg-surface/50 rounded-full flex items-center justify-center hover:bg-bg-spotlight transition-colors"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          {/* Roadmap Timeline */}
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-purple-500 to-bg-surface" />

              {/* Roadmap items */}
              <div className="space-y-6">
                {roadmapItems.map((item, index) => {
                  const status = statusConfig[item.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={item.id} className="relative pl-16">
                      {/* Timeline dot */}
                      <div className={`absolute left-4 top-4 w-5 h-5 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center ring-4 ring-bg-elevated`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>

                      {/* Card */}
                      <div className="bg-bg-surface/50 border border-white/[0.06] rounded-lg p-5 hover:border-white/[0.12] transition-colors group">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-heading-md text-text-primary font-semibold">
                                {item.title}
                              </h3>
                              <p className="text-body-sm text-text-muted">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 ${status.bg} rounded-full`}>
                            <StatusIcon className={`w-3 h-3 ${status.color}`} />
                            <span className={`text-caption font-medium ${status.color}`}>
                              {status.label}
                            </span>
                          </span>
                        </div>
                        <p className="text-body-sm text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-accent-primary/10 to-purple-500/10 border border-accent-primary/20 rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-heading-md text-text-primary font-semibold mb-1">
                    Shape the Future
                  </h4>
                  <p className="text-body-sm text-text-secondary">
                    Join governance discussions and vote on proposals
                  </p>
                </div>
                <a
                  href="https://governance.camp.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6"
                >
                  View Proposals
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
