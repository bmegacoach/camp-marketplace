export default function UrbanBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - urban night sky */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#1a0a2e] to-[#0a1628]" />
      
      {/* Spray paint glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-pink-500/15 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-cyan-400/15 via-cyan-400/5 to-transparent rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-radial from-yellow-400/10 via-yellow-400/3 to-transparent rounded-full blur-3xl" style={{ animation: 'pulse 5s ease-in-out infinite', animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-gradient-radial from-purple-500/12 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse" />
      
      {/* Graffiti Tag SVGs - "CAMP" style letters */}
      <svg className="absolute top-16 right-16 w-48 h-32 opacity-[0.08]" viewBox="0 0 200 100" style={{ animation: 'float 8s ease-in-out infinite' }}>
        <text x="10" y="70" fontFamily="Impact, sans-serif" fontSize="60" fill="url(#gradient1)" stroke="#ff00ff" strokeWidth="2" transform="skewX(-8)">
          CAMP
        </text>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#feca57" />
            <stop offset="100%" stopColor="#48dbfb" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Graffiti crown - street art classic */}
      <svg className="absolute top-32 left-20 w-20 h-16 text-yellow-400/15" viewBox="0 0 100 80" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.5s' }}>
        <path d="M10 70 L10 30 L30 50 L50 20 L70 50 L90 30 L90 70 Z" fill="currentColor" />
        <circle cx="10" cy="25" r="5" fill="currentColor" />
        <circle cx="50" cy="15" r="5" fill="currentColor" />
        <circle cx="90" cy="25" r="5" fill="currentColor" />
      </svg>
      
      {/* Spray drips */}
      <svg className="absolute top-40 right-40 w-8 h-40 text-pink-500/10" viewBox="0 0 20 100">
        <path d="M10 0 L10 60 Q10 80 10 90 Q8 100 10 100 Q12 100 10 90" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="100" r="6" fill="currentColor" />
      </svg>
      
      <svg className="absolute top-20 left-1/3 w-6 h-32 text-cyan-400/10" viewBox="0 0 20 100" style={{ animationDelay: '1s' }}>
        <path d="M10 0 L10 50 Q10 70 10 85" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="90" r="5" fill="currentColor" />
      </svg>
      
      {/* Bubble letters - "VIBE" */}
      <svg className="absolute bottom-32 left-16 w-36 h-24 opacity-[0.06]" viewBox="0 0 180 80" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}>
        <text x="5" y="60" fontFamily="Arial Black, sans-serif" fontSize="50" fill="none" stroke="#00ffff" strokeWidth="3" strokeLinejoin="round">
          VIBE
        </text>
      </svg>
      
      {/* Graffiti arrow */}
      <svg className="absolute top-1/2 right-24 w-24 h-12 text-orange-400/12 transform -rotate-12" viewBox="0 0 100 40" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1.5s' }}>
        <path d="M0 20 L70 20 L55 5 M70 20 L55 35" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
      {/* Star burst - classic graffiti element */}
      <svg className="absolute bottom-48 right-32 w-16 h-16 text-yellow-300/10" viewBox="0 0 100 100" style={{ animation: 'spin 20s linear infinite' }}>
        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor" />
      </svg>
      
      {/* Abstract wildstyle elements */}
      <svg className="absolute top-1/4 left-1/2 w-32 h-32 opacity-[0.05]" viewBox="0 0 100 100" style={{ animation: 'float 9s ease-in-out infinite', animationDelay: '3s' }}>
        <path d="M20 80 Q30 20 50 50 T80 20" stroke="#ff6b6b" strokeWidth="4" fill="none" />
        <path d="M10 60 Q40 30 60 60 T90 40" stroke="#48dbfb" strokeWidth="3" fill="none" />
        <circle cx="30" cy="30" r="8" fill="#feca57" fillOpacity="0.5" />
        <circle cx="70" cy="70" r="6" fill="#ff6b6b" fillOpacity="0.5" />
      </svg>
      
      {/* Brick wall texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          linear-gradient(90deg, transparent 0%, transparent 48%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.1) 52%, transparent 52%),
          linear-gradient(0deg, transparent 0%, transparent 90%, rgba(255,255,255,0.05) 90%)
        `,
        backgroundSize: '60px 30px'
      }} />
      
      {/* Spray splatter dots */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 5)}px`,
              height: `${3 + (i % 5)}px`,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              backgroundColor: ['#ff6b6b', '#48dbfb', '#feca57', '#ff9ff3', '#00d2d3'][i % 5],
              opacity: 0.04 + (i % 3) * 0.02,
            }}
          />
        ))}
      </div>
      
      {/* Graffiti "throw up" style circle */}
      <svg className="absolute bottom-20 right-1/4 w-24 h-24 opacity-[0.06]" viewBox="0 0 100 100" style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '4s' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ff00ff" strokeWidth="8" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#00ffff" strokeWidth="4" />
      </svg>

      {/* Animation keyframes are in index.css */}
    </div>
  );
}
