interface AnimatedBackgroundProps {
  className?: string;
  opacity?: number;
}

export const AnimatedBackground = ({ className = "", opacity = 0.15 }: AnimatedBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={opacity} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={opacity * 0.5} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={opacity} />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <path
          d="M0,200 Q360,100 720,200 T1440,200 L1440,0 L0,0 Z"
          fill="url(#wave-gradient)"
          className="animate-[wave_15s_ease-in-out_infinite]"
          style={{ transformOrigin: 'center' }}
        />
        
        {/* Wave 2 */}
        <path
          d="M0,300 Q360,250 720,300 T1440,300 L1440,0 L0,0 Z"
          fill="url(#wave-gradient)"
          className="animate-[wave_20s_ease-in-out_infinite_reverse]"
          style={{ transformOrigin: 'center', opacity: 0.6 }}
        />
        
        {/* Wave 3 */}
        <path
          d="M0,150 Q360,80 720,150 T1440,150 L1440,0 L0,0 Z"
          fill="url(#wave-gradient)"
          className="animate-[wave_25s_ease-in-out_infinite]"
          style={{ transformOrigin: 'center', opacity: 0.4 }}
        />
        
        {/* Curved lines - subtle overlay */}
        <g stroke="hsl(var(--primary))" fill="none" strokeWidth="1" opacity={opacity * 0.3}>
          <path
            d="M0,400 Q360,350 720,400 T1440,400"
            className="animate-[wave_18s_ease-in-out_infinite]"
            style={{ transformOrigin: 'center' }}
          />
          <path
            d="M0,500 Q360,450 720,500 T1440,500"
            className="animate-[wave_22s_ease-in-out_infinite_reverse]"
            style={{ transformOrigin: 'center' }}
          />
          <path
            d="M0,600 Q360,550 720,600 T1440,600"
            className="animate-[wave_17s_ease-in-out_infinite]"
            style={{ transformOrigin: 'center' }}
          />
        </g>
      </svg>
    </div>
  );
};
