import { mockChallenges, mockCollaborations, mockEvents } from '../data/mockData';
import UrbanBackground from '../components/Layout/UrbanBackground';
import SponsorCTA from '../components/SponsorCTA';
import { Calendar, Trophy, Users, Sparkles } from 'lucide-react';

export default function CampLifePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <UrbanBackground />

      {/* Content */}
      <div className="relative container-main py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-4 border border-pink-500/20">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-body-sm text-pink-400 font-medium">Compete and Earn Rewards.</span>
          </div>
          <h1 className="text-display-md text-text-primary font-bold mb-2">
            Camp Life
          </h1>
          <p className="text-body-lg text-text-secondary">
            Challenges, collaborations, and community events. This is the vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Challenges */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-semantic-warning" />
              <h2 className="text-heading-lg font-semibold text-text-primary">
                Active Challenges
              </h2>
            </div>
            <div className="space-y-4">
              {mockChallenges.map((challenge) => (
                <div key={challenge.id} className="card p-6 backdrop-blur-md bg-bg-surface/80 hover:border-pink-500/30 transition-all border-white/[0.08]">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-heading-md text-text-primary font-semibold">
                      {challenge.title}
                    </h3>
                    <span className="px-2 py-1 bg-semantic-success/20 text-semantic-success rounded-full text-caption font-semibold">
                      {challenge.status}
                    </span>
                  </div>
                  <p className="text-body-sm text-text-secondary mb-4">
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-muted">
                      <Users className="w-4 h-4" />
                      <span className="text-body-sm">
                        {challenge.participants.length} participants
                      </span>
                    </div>
                    <span className="text-body-sm text-text-muted">
                      Ends {challenge.deadline.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Collaborations */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-accent-primary" />
              <h2 className="text-heading-lg font-semibold text-text-primary">
                Recent Collaborations
              </h2>
            </div>
            <div className="space-y-4">
              {mockCollaborations.map((collab) => (
                <div key={collab.id} className="card p-6 backdrop-blur-md bg-bg-surface/80 hover:border-cyan-500/30 transition-all border-white/[0.08]">
                  <h3 className="text-heading-md text-text-primary font-semibold mb-2">
                    {collab.projectName}
                  </h3>
                  <p className="text-body-sm text-text-secondary mb-4">
                    {collab.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-text-muted">
                      {collab.campers.length} campers collaborating
                    </span>
                    <span className={`px-2 py-1 rounded-full text-caption font-semibold ${
                      collab.status === 'active'
                        ? 'bg-semantic-success/20 text-semantic-success'
                        : 'bg-bg-elevated text-text-muted'
                    }`}>
                      {collab.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-accent-primary" />
            <h2 className="text-heading-lg font-semibold text-text-primary">
              Upcoming Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEvents.map((event) => (
              <div key={event.id} className="card p-6 backdrop-blur-md bg-bg-surface/80 hover:border-purple-500/30 transition-all border-white/[0.08]">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-heading-md text-text-primary font-semibold">
                    {event.title}
                  </h3>
                  <span className="px-2 py-1 bg-accent-primary-muted text-accent-primary rounded-full text-caption font-semibold">
                    {event.type}
                  </span>
                </div>
                <p className="text-body-sm text-text-secondary mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar className="w-4 h-4" />
                  <span className="text-body-sm">
                    {event.date.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply for Scholarship CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-accent-primary/20 via-cyan-500/15 to-purple-500/10 border border-accent-primary/30 rounded-xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center">
            <h3 className="text-heading-lg text-text-primary font-bold mb-2">
              Camp Scholarship Program
            </h3>
            <p className="text-body-md text-text-secondary max-w-xl mx-auto mb-6">
              Join a Tech Camp Vibe House. 24 units per Tech Camp, 24 Camper sponsorships per 6 months.
            </p>
            <a
              href="/scholarship"
              className="btn-primary px-10 py-4 text-body-lg shadow-glow-accent inline-flex items-center gap-2"
            >
              <span>Apply for Scholarship</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Vibe House Info */}
        <div className="mt-8 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-pink-500/20 rounded-xl backdrop-blur-md relative overflow-hidden">
          {/* Decorative graffiti element */}
          <svg className="absolute top-2 right-4 w-12 h-10 text-yellow-400/20" viewBox="0 0 100 80">
            <path d="M10 70 L10 30 L30 50 L50 20 L70 50 L90 30 L90 70 Z" fill="currentColor" />
          </svg>
          <div className="relative text-center">
            <h3 className="text-heading-lg text-text-primary font-bold mb-2">
              Tech Camp Vibe Houses
            </h3>
            <p className="text-body-md text-text-secondary max-w-xl mx-auto">
              Join a physical location. Build in-person. Drop with your crew.
              Real campers, real vibes, real value.
            </p>
          </div>
        </div>

        {/* SPONSOR CTA */}
        <SponsorCTA variant="compact" />
      </div>
    </div>
  );
}
