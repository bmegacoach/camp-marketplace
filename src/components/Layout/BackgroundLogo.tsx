export default function BackgroundLogo() {
  return (
    <div className="fixed bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute bottom-0 right-0 opacity-[0.08]"
        style={{
          width: '70vh',
          height: '70vh',
          transform: 'translate(15%, 25%)',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* CoachAI Logo Silhouette - Four-pointed star/compass shape */}
          {/* Outer star shape */}
          <path
            d="M200 10 L240 160 L390 200 L240 240 L200 390 L160 240 L10 200 L160 160 Z"
            fill="#1a2332"
          />
          {/* Inner diamond for depth */}
          <path
            d="M200 100 L260 200 L200 300 L140 200 Z"
            fill="#1a2332"
            opacity="0.7"
          />
          {/* Center point */}
          <circle
            cx="200"
            cy="200"
            r="15"
            fill="#1a2332"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
}
