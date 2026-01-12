import { mockUsers } from '../data/mockData';
import CampRankBadge from '../components/Badges/CampRankBadge';
import TechBadge from '../components/Badges/TechBadge';
import UrbanBackground from '../components/Layout/UrbanBackground';
import SponsorCTA from '../components/SponsorCTA';
import { Users, Award, Code } from 'lucide-react';

export default function CampersPage() {
  const sortedCampers = [...mockUsers].sort((a, b) => 
    b.collaborationMetrics.score - a.collaborationMetrics.score
  );

  return (
    <div className="relative min-h-screen">
      <UrbanBackground />
      <div className="relative container-main py-8">
      <div className="mb-8">
        <h1 className="text-display-md text-text-primary font-bold mb-2">
          Camp Leaderboard
        </h1>
        <p className="text-body-lg text-text-secondary">
          Top campers ranked by collaboration score and contribution
        </p>
      </div>

      <div className="space-y-4">
        {sortedCampers.map((camper, index) => (
          <div
            key={camper.id}
            className={`card p-6 ${
              index === 0 ? 'border-2 border-rank-gold shadow-glow-success' : ''
            }`}
          >
            <div className="flex items-center gap-6">
              {/* Rank */}
              <div className="text-display-md font-bold text-text-muted w-12 text-center">
                #{index + 1}
              </div>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={camper.avatar}
                  alt={camper.fullName}
                  className="w-16 h-16 rounded-full border-4 border-bg-elevated"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <CampRankBadge rank={camper.campRank} size="sm" showLabel={false} />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-heading-lg font-semibold text-text-primary">
                    {camper.fullName}
                  </h3>
                  <CampRankBadge rank={camper.campRank} size="sm" />
                </div>
                <p className="text-body-sm text-text-secondary mb-3">
                  {camper.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {camper.techBadges.slice(0, 4).map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="font-mono text-mono-lg text-text-primary">
                    {camper.collaborationMetrics.score}
                  </div>
                  <div className="text-caption text-text-muted">Collab Score</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Code className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="font-mono text-mono-lg text-text-primary">
                    {camper.projectsBuilt}
                  </div>
                  <div className="text-caption text-text-muted">Projects Built</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="font-mono text-mono-lg text-text-primary">
                    {camper.collaborationMetrics.partnersCount}
                  </div>
                  <div className="text-caption text-text-muted">Partners</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SPONSOR CTA */}
      <SponsorCTA variant="compact" />
      </div>
    </div>
  );
}
