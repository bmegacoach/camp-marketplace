import { useParams, useNavigate } from 'react-router-dom';
import { qualifiedCampers } from '../data/mockData';
import UrbanBackground from '../components/Layout/UrbanBackground';
import { ArrowLeft, Target, Heart, BookOpen, Star, Briefcase, GraduationCap, Flag, Award } from 'lucide-react';
import { useSponsorModal } from '../contexts/SponsorModalContext';

export default function CamperProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useSponsorModal();
  
  const camper = qualifiedCampers.find(c => c.id === id);

  if (!camper) {
    return (
      <div className="relative min-h-screen">
        <UrbanBackground />
        <div className="relative container-main py-8">
          <div className="text-center py-20">
            <h1 className="text-display-sm text-text-primary mb-4">Camper Not Found</h1>
            <button onClick={() => navigate(-1)} className="btn-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <UrbanBackground />
      <div className="relative container-main py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </button>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-bg-spotlight to-bg-base border border-white/[0.08] rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Large Avatar */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={camper.avatar}
                alt={camper.name}
                className="w-32 h-32 rounded-full border-4 border-accent-primary/40 shadow-glow-accent object-cover"
              />
              {camper.heroProgram && (
                <span className="px-3 py-1 bg-semantic-warning/20 text-semantic-warning rounded-full text-body-sm font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Hero Program
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-display-md text-text-primary font-bold">
                  {camper.name}
                </h1>
                <span className="text-heading-md text-text-muted">
                  Age {camper.age}
                </span>
              </div>

              {/* Impact Areas */}
              <div className="flex flex-wrap gap-2 mb-4">
                {camper.impactAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-primary/10 text-accent-primary rounded-full text-body-sm font-medium"
                  >
                    <Target className="w-3.5 h-3.5" />
                    {area}
                  </span>
                ))}
              </div>

              <p className="text-body-lg text-text-secondary leading-relaxed">
                {camper.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume */}
          <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-accent-primary" />
              <h2 className="text-heading-md text-text-primary font-semibold">Resume</h2>
            </div>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {camper.fullResume}
            </p>
          </div>

          {/* Dreams & Aspirations */}
          <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-semantic-warning" />
              <h2 className="text-heading-md text-text-primary font-semibold">Dreams & Aspirations</h2>
            </div>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {camper.dreams}
            </p>
          </div>

          {/* Motivations */}
          <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-semantic-error" />
              <h2 className="text-heading-md text-text-primary font-semibold">Motivations</h2>
            </div>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {camper.motivations}
            </p>
          </div>

          {/* Ultimate Goal */}
          <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-semantic-success" />
              <h2 className="text-heading-md text-text-primary font-semibold">Ultimate Goal at CAMP</h2>
            </div>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {camper.ultimateGoal}
            </p>
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="mt-8 bg-gradient-to-r from-accent-primary/20 to-purple-500/20 border border-accent-primary/30 rounded-xl p-8 text-center">
          <GraduationCap className="w-12 h-12 text-accent-primary mx-auto mb-4" />
          <h3 className="text-heading-lg text-text-primary font-bold mb-2">
            Support {camper.name}&apos;s Journey
          </h3>
          <p className="text-body-md text-text-secondary mb-6 max-w-2xl mx-auto">
            Become a sponsor and help this qualified camper achieve their dreams through the CAMP Tech Camp Scholarship program.
          </p>
          <button onClick={openModal} className="btn-primary px-8 py-3 text-body-lg">
            Become a Sponsor
          </button>
        </div>
      </div>
    </div>
  );
}
