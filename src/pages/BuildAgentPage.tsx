import { Rocket, Code, Workflow, Megaphone, Zap, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { analytics } from '../services/analytics';
import UrbanBackground from '../components/Layout/UrbanBackground';
import SponsorCTA from '../components/SponsorCTA';

export default function BuildAgentPage() {
  const handleExternalLink = (url: string, label: string) => {
    analytics.trackExternalLink(url, label);
    analytics.trackBuildAgentClick(label);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <UrbanBackground />

      {/* Content */}
      <div className="relative container-main py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary-muted rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent-primary" />
              <span className="text-body-sm text-accent-primary font-medium">Now Available on CAMP Alpha</span>
            </div>
            <h1 className="text-display-lg text-text-primary font-bold mb-4">
              Build Your AI Agent
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-2">
              Create an autonomous AI agent and launch it to the CAMP marketplace. 
              Design, train, and deploy with our powerful suite of tools.
            </p>
            <p className="text-body-md text-accent-primary font-medium">
              Code &lt; Vibe + Capital
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card p-6 hover:border-accent-primary/30 transition-all backdrop-blur-sm bg-bg-surface/70 relative group hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/30">
                1
              </div>
              <div className="w-12 h-12 bg-accent-primary-muted rounded-lg flex items-center justify-center mb-4 border border-accent-primary/20">
                <Code className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-heading-md text-text-primary font-semibold mb-2">
                Design Suite
              </h3>
              <p className="text-body-sm text-text-secondary">
                Vibe code your full stack application in natural language with streamlined creation process.
              </p>
            </div>

            <div className="card p-6 hover:border-accent-primary/30 transition-all backdrop-blur-sm bg-bg-surface/70 relative group hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/30">
                2
              </div>
              <div className="w-12 h-12 bg-accent-primary-muted rounded-lg flex items-center justify-center mb-4 border border-accent-primary/20">
                <Workflow className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-heading-md text-text-primary font-semibold mb-2">
                Workflow Suite
              </h3>
              <p className="text-body-sm text-text-secondary">
                Customize workflows for any part of your application to create amazing user experiences.
              </p>
            </div>

            <div className="card p-6 hover:border-accent-primary/30 transition-all backdrop-blur-sm bg-bg-surface/70 relative group hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/30">
                3
              </div>
              <div className="w-12 h-12 bg-accent-primary-muted rounded-lg flex items-center justify-center mb-4 border border-accent-primary/20">
                <Megaphone className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-heading-md text-text-primary font-semibold mb-2">
                Camp Flow
              </h3>
              <p className="text-body-sm text-text-secondary">
                Add marketing campaign agents to connect your application to your target audiences and start generating community feedback and potential sales, fast.
              </p>
            </div>

            <div className="card p-6 hover:border-accent-primary/30 transition-all backdrop-blur-sm bg-bg-surface/70 relative group hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-primary/30">
                4
              </div>
              <div className="w-12 h-12 bg-accent-primary-muted rounded-lg flex items-center justify-center mb-4 border border-accent-primary/20">
                <Rocket className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-heading-md text-text-primary font-semibold mb-2">
                Launchpad
              </h3>
              <p className="text-body-sm text-text-secondary">
                Deploy your app on CAMP marketplace for access to our private sponsor and Dev Capital network on an omnichain bond curve launch model.
              </p>
            </div>
          </div>

          {/* CAMP Alpha CTA */}
          <div className="card p-8 relative overflow-hidden backdrop-blur-sm bg-bg-surface/70">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-primary-hover rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-lg text-text-primary font-semibold">
                      CAMP Alpha Design Suite
                    </h2>
                    <p className="text-body-sm text-text-muted">External Platform</p>
                  </div>
                </div>
                <p className="text-body-md text-text-secondary mb-6 max-w-xl">
                  Access our full-featured agent design suite. Create custom AI personalities, 
                  configure tokenomics, set up revenue sharing, and launch directly to the marketplace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="https://alpha.camp.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleExternalLink('https://alpha.camp.xyz', 'Launch in CAMP Alpha')}
                    className="btn-primary flex items-center justify-center gap-2 px-8"
                  >
                    <span>Launch in CAMP Alpha</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://docs.camp.xyz/build"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleExternalLink('https://docs.camp.xyz/build', 'Read Documentation')}
                    className="btn-ghost flex items-center justify-center gap-2 border border-white/[0.1]"
                  >
                    <span>Read Documentation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="hidden lg:block w-px h-32 bg-white/[0.1]"></div>
              <div className="text-center lg:text-left">
                <h4 className="text-body-sm text-text-muted uppercase tracking-wider mb-3">
                  What You Can Build
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-body-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-semantic-success rounded-full"></div>
                    Trading AI Agents
                  </li>
                  <li className="flex items-center gap-2 text-body-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-semantic-success rounded-full"></div>
                    Content Creation Bots
                  </li>
                  <li className="flex items-center gap-2 text-body-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-semantic-success rounded-full"></div>
                    DeFi Strategy Agents
                  </li>
                  <li className="flex items-center gap-2 text-body-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-semantic-success rounded-full"></div>
                    Community Managers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ecosystem Connection */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://skool.com/camp"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalLink('https://skool.com/camp', 'Skool Community')}
              className="card p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors group backdrop-blur-sm bg-bg-surface/70"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-body-sm text-text-primary font-medium">Skool Community</div>
                <div className="text-caption text-text-muted">Connect with builders</div>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://discord.gg/camp"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalLink('https://discord.gg/camp', 'Discord')}
              className="card p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors group backdrop-blur-sm bg-bg-surface/70"
            >
              <div className="w-10 h-10 bg-accent-primary-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-body-sm text-text-primary font-medium">Discord</div>
                <div className="text-caption text-text-muted">Get support</div>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://x.com/camptech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalLink('https://x.com/camptech', 'Twitter')}
              className="card p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors group backdrop-blur-sm bg-bg-surface/70"
            >
              <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center flex-shrink-0 border border-white/[0.1]">
                <svg className="w-5 h-5 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-body-sm text-text-primary font-medium">X (Twitter)</div>
                <div className="text-caption text-text-muted">Follow updates</div>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* SPONSOR CTA */}
          <SponsorCTA variant="compact" />
        </div>
      </div>
    </div>
  );
}
