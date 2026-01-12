import { Layers, Zap, Target, DollarSign, Globe, Cpu, Shield, Sparkles, ArrowRight, ExternalLink, Users, TrendingUp, Check } from 'lucide-react';
import UrbanBackground from '../components/Layout/UrbanBackground';
import { useSponsorModal } from '../contexts/SponsorModalContext';

export default function CampIDLPage() {
  const { openModal } = useSponsorModal();
  
  return (
    <div className="min-h-screen relative">
      <UrbanBackground />

      <div className="relative container-main py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-semantic-warning/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-semantic-warning" />
            <span className="text-body-sm text-semantic-warning font-semibold">ETH-Inscription Distribution Layer</span>
          </div>
          
          <h1 className="text-display-lg text-text-primary font-bold mb-6 max-w-4xl mx-auto leading-tight">
            <span className="bg-gradient-to-r from-accent-primary to-cyan-400 bg-clip-text text-transparent">
              IDL: New Age of trustless Digital Distribution.
            </span>
          </h1>
          
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            CAMP IDL is an ETH-Inscription Distribution Layer and network marketing system for multichain campaign promotions. 
            The CAMP Marketplace connects companies who launch campaigns with marketers who participate using AI agents for omnichain promotions.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={openModal}
              className="btn-primary px-8 py-4 text-body-lg shadow-glow-accent flex items-center gap-2"
            >
              <span>Become an IDL Sponsor</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://docs.camp.xyz/idl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-8 py-4 text-body-lg border border-white/[0.1] flex items-center gap-2"
            >
              <span>Read Whitepaper</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Why Invest Early */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-display-md text-text-primary font-bold mb-4">
              Why Invest Early?
            </h2>
            <p className="text-body-lg text-text-secondary">
              Early sponsors gain asymmetric upside in the autonomous economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Automated Growth */}
            <div className="card p-8 hover:border-accent-primary/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-primary to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-heading-lg text-text-primary font-semibold mb-3">
                Automated Growth
              </h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                AI Agent Swarm handles lead-generation, sentiment tracking, trading, and cross-chain liquidity routing - all autonomous, 24/7.
              </p>
            </div>

            {/* Milestone-Powered Upside */}
            <div className="card p-8 hover:border-purple-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-heading-lg text-text-primary font-semibold mb-3">
                Milestone-Powered Upside
              </h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Projects hitting on-chain metrics unlock investment from the CoachAI Dev Fund. Performance-based capital allocation.
              </p>
            </div>

            {/* Revenue & Ecosystem */}
            <div className="card p-8 hover:border-semantic-success/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-semantic-success to-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-heading-lg text-text-primary font-semibold mb-3">
                Revenue & Ecosystem
              </h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Multiple revenue streams: subscriptions, 0.5% swap fee + 10% arbitrage profits, white-label licensing for agencies.
              </p>
            </div>
          </div>
        </section>

        {/* Core Technology Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-display-md text-text-primary font-bold mb-4">
              Core Technology Stack
            </h2>
            <p className="text-body-lg text-text-secondary">
              Built on battle-tested infrastructure with cutting-edge AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LayerZero OFT */}
            <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6 flex gap-5">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-heading-md text-text-primary font-semibold mb-2">LayerZero OFT</h4>
                <p className="text-body-sm text-text-secondary">
                  Cross-chain messaging with unified token supply. Deploy once, trade anywhere.
                </p>
              </div>
            </div>

            {/* Bonding Curve V2 */}
            <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6 flex gap-5">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-heading-md text-text-primary font-semibold mb-2">Bonding Curve V2</h4>
                <p className="text-body-sm text-text-secondary">
                  Anti-rug pricing with Milestone Boosts. Liquidity guaranteed from day one.
                </p>
              </div>
            </div>

            {/* IDL Agent Swarm */}
            <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6 flex gap-5">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-heading-md text-text-primary font-semibold mb-2">IDL Agent Swarm</h4>
                <p className="text-body-sm text-text-secondary">
                  Specialized AI Agents: LeadGen, TradingExecution, SocialListening - working in concert.
                </p>
              </div>
            </div>

            {/* x402 Protocol */}
            <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6 flex gap-5">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-heading-md text-text-primary font-semibold mb-2">x402 Protocol</h4>
                <p className="text-body-sm text-text-secondary">
                  HTTP 402 + EIP-3009 micropayments. Frictionless value exchange at internet scale.
                </p>
              </div>
            </div>

            {/* ETH Inscriptions */}
            <div className="bg-bg-surface/50 border border-white/[0.06] rounded-xl p-6 flex gap-5 lg:col-span-2">
              <div className="w-12 h-12 bg-semantic-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-semantic-warning" />
              </div>
              <div>
                <h4 className="text-heading-md text-text-primary font-semibold mb-2">ETH Inscriptions</h4>
                <p className="text-body-sm text-text-secondary">
                  On-chain PRD and agent identity verification. Immutable proof of creation, ownership, and provenance stored directly on Ethereum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsor Benefits Section */}
        <section id="sponsor-tiers" className="mb-20">
          <div className="bg-gradient-to-br from-bg-spotlight to-bg-surface border border-white/[0.08] rounded-2xl p-10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary-muted rounded-full mb-6">
                <Layers className="w-4 h-4 text-accent-primary" />
                <span className="text-body-sm text-accent-primary font-semibold">Limited Sponsorship Slots</span>
              </div>
              
              <h2 className="text-display-md text-text-primary font-bold mb-8">
                Early Sponsors unlock:
              </h2>

              {/* Benefits Box */}
              <div className="bg-bg-primary/60 border border-accent-primary/30 rounded-xl p-8 mb-10">
                <ul className="space-y-4 text-left max-w-md mx-auto">
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent-primary" />
                    </div>
                    <span className="text-body-lg text-text-primary">Lifetime founder rates</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent-primary" />
                    </div>
                    <span className="text-body-lg text-text-primary">Governance rights</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent-primary" />
                    </div>
                    <span className="text-body-lg text-text-primary">Completion Guarantee</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-semantic-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-semantic-success" />
                    </div>
                    <span className="text-body-lg text-text-primary">+ 9% growth bi-annually, via CAMP DeFi Treasury management</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={openModal}
                className="btn-primary px-12 py-4 text-body-lg shadow-glow-accent inline-flex items-center gap-2"
              >
                <span>SPONSOR NOW</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
