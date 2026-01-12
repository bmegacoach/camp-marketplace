import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentCardCompact from '../components/Cards/AgentCardCompact';
import SpotlightAgentCard from '../components/Cards/SpotlightAgentCard';
import CamperCard from '../components/Cards/CamperCard';
import RWACard from '../components/Cards/RWACard';
import ServiceAgentCard from '../components/Cards/ServiceAgentCard';
import UrbanBackground from '../components/Layout/UrbanBackground';
import { firebaseService } from '../services/firebase';
import { analytics } from '../services/analytics';
import { Agent } from '../types';
import { qualifiedCampers, rwaListings, serviceAgents, serviceAgentCategories } from '../data/mockData';
import { 
  Flame, Trophy, Zap, ExternalLink, Users, BookOpen, Loader2, 
  TrendingUp, Shield, BarChart3, GraduationCap, Building, 
  Cpu, ArrowRight, ChevronDown
} from 'lucide-react';
import SponsorCTA from '../components/SponsorCTA';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [topPerformersSort, setTopPerformersSort] = useState<'marketCap' | 'holders' | 'volume'>('marketCap');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [trendingAgents, setTrendingAgents] = useState<Agent[]>([]);
  const [topPerformers, setTopPerformers] = useState<Agent[]>([]);
  const [spotlightAgent, setSpotlightAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | null>(null);

  // Fetch data from Firebase service
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [trending, performers, spotlight] = await Promise.all([
          firebaseService.getTrendingAgents(),
          firebaseService.getTopPerformers(topPerformersSort),
          firebaseService.getSpotlightAgent(),
        ]);
        setTrendingAgents(trending);
        setTopPerformers(performers);
        setSpotlightAgent(spotlight);
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribe = firebaseService.subscribe('agents', () => {
      fetchData();
    });

    return () => unsubscribe();
  }, [topPerformersSort]);

  const handleAgentClick = useCallback((agentId: string, agentName: string) => {
    setSelectedAgentId(agentId);
    analytics.trackAgentView(agentId, agentName, 'marketplace');
  }, []);

  const handleTrade = useCallback(() => {
    if (spotlightAgent) {
      analytics.trackTradeClick(spotlightAgent.id, spotlightAgent.symbol);
      analytics.trackSpotlightInteraction('trade', spotlightAgent.id);
    }
  }, [spotlightAgent]);

  const handleEcosystemLink = useCallback((linkId: string, url: string, label: string) => {
    analytics.trackEcosystemLinkClick(linkId, url, label);
  }, []);

  const handleCamperClick = useCallback((camperId: string) => {
    navigate(`/camper/${camperId}`);
  }, [navigate]);

  const sortTabs = [
    { id: 'marketCap', label: 'By Cap' },
    { id: 'holders', label: 'By Holders' },
    { id: 'volume', label: 'By Volume' },
  ];

  const filteredServiceAgents = selectedServiceCategory
    ? serviceAgents.filter(agent => agent.category === selectedServiceCategory)
    : serviceAgents.slice(0, 8);

  if (loading) {
    return (
      <div className="container-main py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
          <span className="text-body-md text-text-secondary">Loading marketplace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <UrbanBackground />
      <div className="relative container-main py-8">
        {/* 1. SPOTLIGHT AGENT (Full Width Hero) */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 bg-semantic-success rounded-full animate-pulse-glow"></div>
            <span className="text-body-sm text-text-muted uppercase tracking-wider font-medium">
              Spotlight Agent
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.1] to-transparent ml-4"></div>
          </div>
          
          {spotlightAgent && (
            <SpotlightAgentCard
              agent={spotlightAgent}
              onTrade={handleTrade}
            />
          )}
        </section>

        {/* 2. WHY CAMP MARKETPLACE */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-bg-spotlight via-bg-surface to-bg-base border border-white/[0.08] rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="text-center mb-10">
                <h2 className="text-display-md text-text-primary font-bold mb-3">
                  Why CAMP Marketplace?
                </h2>
                <p className="text-heading-md text-accent-primary font-semibold">
                  The NASDAQ for the Streets
                </p>
                <p className="text-body-lg text-text-secondary mt-2 max-w-2xl mx-auto">
                  Invest in camper agents and tokenized properties on a bond curve.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-bg-surface/50 border border-white/[0.06] rounded-lg p-6 text-center hover:border-accent-primary/30 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent-primary to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-md text-text-primary font-semibold mb-3">Real Campers</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    Every agent is built by real people with stories, vetted and committed to our ecosystem.
                  </p>
                </div>

                <div className="bg-bg-surface/50 border border-white/[0.06] rounded-lg p-6 text-center hover:border-purple-500/30 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-md text-text-primary font-semibold mb-3">Gamified Community</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    Earn ranks, badges, and collaboration scores. Rise through Bronze to Diamond.
                  </p>
                </div>

                <div className="bg-bg-surface/50 border border-white/[0.06] rounded-lg p-6 text-center hover:border-semantic-warning/30 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-semantic-warning to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-md text-text-primary font-semibold mb-3">The NASDAQ for the Streets</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    Invest in camper agents and tokenized properties on a bond curve.
                  </p>
                </div>

                <div className="bg-bg-surface/50 border border-white/[0.06] rounded-lg p-6 text-center hover:border-semantic-success/30 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-semantic-success to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-md text-text-primary font-semibold mb-3">Bond Curve Pricing</h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    Liquidity from day one. Trade your position instantly via on-chain pools.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 flex-wrap py-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent-primary" />
                  <span className="text-body-sm text-text-secondary">Bond Curve = Liquidity</span>
                </div>
                <div className="w-1 h-1 bg-text-muted rounded-full hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-semantic-success" />
                  <span className="text-body-sm text-text-secondary">Vetted Builders Only</span>
                </div>
                <div className="w-1 h-1 bg-text-muted rounded-full hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-semantic-warning" />
                  <span className="text-body-sm text-text-secondary">Trade Instantly</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRENDING AGENTS (2 per row) */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-semantic-warning" />
            <h2 className="text-heading-lg font-semibold text-text-primary">Trending Agents</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingAgents.slice(0, 8).map((agent, index) => (
              <AgentCardCompact
                key={agent.id}
                agent={agent}
                index={index}
                onClick={() => handleAgentClick(agent.id, agent.name)}
              />
            ))}
          </div>
        </section>

        {/* 4. TOP PERFORMERS (2 per row) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-rank-gold" />
              <h2 className="text-heading-lg font-semibold text-text-primary">Top Performers</h2>
            </div>
            <div className="flex gap-2">
              {sortTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTopPerformersSort(tab.id as typeof topPerformersSort)}
                  className={`px-3 py-1.5 rounded-sm text-body-sm font-medium transition-all ${
                    topPerformersSort === tab.id
                      ? 'bg-accent-primary-muted text-accent-primary'
                      : 'bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPerformers.slice(0, 8).map((agent, index) => (
              <AgentCardCompact
                key={agent.id}
                agent={agent}
                index={index}
                onClick={() => handleAgentClick(agent.id, agent.name)}
              />
            ))}
          </div>
        </section>

        {/* 5. QUALIFIED CAMPERS (2 per row) - NEW */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-accent-primary" />
            <h2 className="text-heading-lg font-semibold text-text-primary">Qualified Campers</h2>
            <span className="px-2 py-0.5 bg-semantic-success/20 text-semantic-success rounded-full text-caption font-medium ml-2">
              Tech Camp Scholarship
            </span>
          </div>
          <p className="text-body-md text-text-secondary mb-6 max-w-3xl">
            Meet our approved scholarship recipients ready to be matched with sponsors. Support their journey through the tokenized sponsorship process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualifiedCampers.map((camper) => (
              <CamperCard
                key={camper.id}
                camper={camper}
                onClick={() => handleCamperClick(camper.id)}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/campers')}
              className="inline-flex items-center gap-2 text-accent-primary hover:underline text-body-md font-medium"
            >
              See More Campers
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 6. RWA LISTINGS (2 per row) - NEW */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-semantic-warning" />
            <h2 className="text-heading-lg font-semibold text-text-primary">RWA Listings</h2>
            <span className="px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-full text-caption font-medium ml-2">
              Real World Assets
            </span>
          </div>
          <p className="text-body-md text-text-secondary mb-6 max-w-3xl">
            Invest in tokenized Tech Camp properties and units. Real assets, real value, transparent ownership.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rwaListings.map((property) => (
              <RWACard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </section>

        {/* 7. SERVICE AGENTS (2 per row, categorized) - NEW */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-purple-500" />
            <h2 className="text-heading-lg font-semibold text-text-primary">Service Agents</h2>
          </div>
          <p className="text-body-md text-text-secondary mb-6 max-w-3xl">
            AI-powered service agents for every business need. From audits to coaching, find the perfect agent for your goals.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedServiceCategory(null)}
              className={`px-3 py-1.5 rounded-full text-body-sm font-medium transition-all ${
                selectedServiceCategory === null
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              }`}
            >
              All
            </button>
            {['Audits', 'Security', 'Marketing', 'Health and Wellness Coach', 'CAMP IDL Campaign Launch Agent'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedServiceCategory(category)}
                className={`px-3 py-1.5 rounded-full text-body-sm font-medium transition-all ${
                  selectedServiceCategory === category
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServiceAgents.map((agent) => (
              <ServiceAgentCard
                key={agent.id}
                agent={agent}
              />
            ))}
          </div>

          {!selectedServiceCategory && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => setSelectedServiceCategory('Audits')}
                className="inline-flex items-center gap-2 text-accent-primary hover:underline text-body-md font-medium"
              >
                View All Service Categories
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* ECOSYSTEM QUICK LINKS */}
        <section className="mb-8">
          <div className="p-6 bg-bg-surface/50 border border-white/[0.06] rounded-xl">
            <h4 className="text-body-sm text-text-muted uppercase tracking-wider mb-4">
              CAMP Ecosystem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="https://camp-alpha.helpmecoach.ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleEcosystemLink('alpha', 'https://camp-alpha.helpmecoach.ai', 'CAMP Alpha')}
                className="flex items-center justify-between px-4 py-3 bg-bg-elevated rounded-lg hover:bg-bg-spotlight transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-primary" />
                  <span className="text-body-md text-text-primary">CAMP Alpha</span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
              </a>
              <a
                href="https://docs.camp.xyz/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleEcosystemLink('docs', 'https://docs.camp.xyz/marketplace', 'Documentation')}
                className="flex items-center justify-between px-4 py-3 bg-bg-elevated rounded-lg hover:bg-bg-spotlight transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent-primary" />
                  <span className="text-body-md text-text-primary">Documentation</span>
                  <span className="px-1.5 py-0.5 bg-semantic-warning/20 text-semantic-warning text-[9px] font-bold rounded">SOON</span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
              </a>
              <a
                href="https://campdefi.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleEcosystemLink('trade-alpha', 'https://campdefi.app', 'Trade Alpha')}
                className="flex items-center justify-between px-4 py-3 bg-bg-elevated rounded-lg hover:bg-bg-spotlight transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-semantic-success" />
                  <span className="text-body-md text-text-primary">Trade Alpha</span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
              </a>
            </div>
          </div>
        </section>

        {/* SPONSOR CTA */}
        <SponsorCTA />
      </div>
    </div>
  );
}
