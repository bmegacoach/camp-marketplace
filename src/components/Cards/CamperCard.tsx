import { QualifiedCamper } from '../../data/mockData';
import { ArrowRight, MapPin, Target } from 'lucide-react';

interface CamperCardProps {
  camper: QualifiedCamper;
  onClick?: () => void;
}

export default function CamperCard({ camper, onClick }: CamperCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full card card-hover p-5 text-left group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={camper.avatar}
            alt={camper.name}
            className="w-16 h-16 rounded-full border-2 border-accent-primary/30 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-body-lg font-semibold text-text-primary truncate">
              {camper.name}
            </h3>
            <span className="text-body-sm text-text-muted">
              {camper.age}
            </span>
          </div>
          
          {/* Impact Area Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-caption font-medium">
              <Target className="w-3 h-3" />
              {camper.impactArea}
            </span>
            {camper.heroProgram && (
              <span className="px-2 py-1 bg-semantic-warning/20 text-semantic-warning rounded-full text-caption font-medium">
                Hero Program
              </span>
            )}
          </div>
          
          {/* Bio */}
          <p className="text-body-sm text-text-secondary line-clamp-2 mb-3">
            {camper.bio}
          </p>

          {/* View Profile Link */}
          <div className="flex items-center gap-1 text-accent-primary text-body-sm font-medium group-hover:underline">
            View Full Profile
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </button>
  );
}
