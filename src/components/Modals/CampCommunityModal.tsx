import { X, ExternalLink, Users } from 'lucide-react';

interface CampCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampCommunityModal({ isOpen, onClose }: CampCommunityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-bg-elevated border border-white/[0.1] rounded-xl overflow-hidden animate-scale-in">
        {/* Urban Art Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-800/10 to-cyan-900/20" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl" />
          {/* Graffiti-style decorative elements */}
          <svg className="absolute top-4 right-4 w-16 h-16 text-pink-500/20" viewBox="0 0 100 100">
            <path d="M10 50 Q 25 25, 50 50 T 90 50" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="30" cy="70" r="8" fill="currentColor" />
            <circle cx="70" cy="30" r="5" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-8 left-8 w-12 h-12 text-cyan-500/20" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-bg-surface/50 rounded-full flex items-center justify-center hover:bg-bg-spotlight transition-colors"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-display-md text-text-primary font-bold mb-2">
              Join the Vibe
            </h2>
            <p className="text-body-md text-text-secondary">
              Connect with real campers. Build. Trade. Thrive.
            </p>
          </div>

          {/* Community Options */}
          <div className="space-y-4">
            {/* Skool Community */}
            <a
              href="https://skool.com/camp"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-bg-surface/70 border border-white/[0.08] rounded-lg hover:border-purple-500/50 hover:bg-bg-spotlight transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <div>
                    <h3 className="text-heading-md text-text-primary font-semibold group-hover:text-purple-400 transition-colors">
                      Skool Community
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      Courses, discussions & exclusive content
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-text-muted group-hover:text-purple-400 transition-colors" />
              </div>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/camptech"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-bg-surface/70 border border-white/[0.08] rounded-lg hover:border-cyan-500/50 hover:bg-bg-spotlight transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-white/[0.1]">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-heading-md text-text-primary font-semibold group-hover:text-cyan-400 transition-colors">
                      X (Twitter)
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      Latest drops, alpha & community vibes
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-text-muted group-hover:text-cyan-400 transition-colors" />
              </div>
            </a>
          </div>

          {/* Footer tagline */}
          <div className="mt-8 text-center">
            <p className="text-caption text-text-muted italic">
              "Real Campers. Real Stories. Real Vibes."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
