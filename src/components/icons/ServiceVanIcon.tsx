type ServiceVanIconProps = {
  className?: string;
  title?: string;
};

export function ServiceVanIcon({ className, title }: ServiceVanIconProps) {
  const titleId = title ? "electro-icon-van-title" : undefined;

  return (
    <svg
      className={`electro-icon-van-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      role={title ? "img" : "presentation"}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title id={titleId}>{title}</title> : null}

      <style>{`
        .electro-icon-van { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-van-body { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3.2; stroke-linejoin: round; }
        .electro-icon-van-window { fill: var(--electro-fg); stroke: var(--electro-fg); stroke-width: 1.6; stroke-linejoin: round; opacity: 0.9; }
        .electro-icon-van-stroke { stroke: var(--electro-fg); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
        .electro-icon-van-bolt { fill: var(--electro-fg); stroke: var(--electro-bg); stroke-width: 1.4; stroke-linejoin: round; }

        .electro-icon-van-rig {
          transform-origin: 110px 130px;
          animation: electro-icon-van-bob 2.2s ease-in-out infinite;
          animation-play-state: paused;
        }
        .electro-icon-trigger:hover .electro-icon-van-rig,
        .electro-icon-van-svg:hover .electro-icon-van-rig {
          animation-play-state: running;
        }
        @keyframes electro-icon-van-bob {
          0%, 100% { transform: translateX(-2px); }
          50%      { transform: translateX(3px); }
        }

        .electro-icon-van-wheel {
          transform-box: fill-box;
          transform-origin: center;
          animation: electro-icon-van-wheel-spin 0.9s linear infinite;
          animation-play-state: paused;
        }
        .electro-icon-trigger:hover .electro-icon-van-wheel,
        .electro-icon-van-svg:hover .electro-icon-van-wheel {
          animation-play-state: running;
        }
        @keyframes electro-icon-van-wheel-spin {
          to { transform: rotate(360deg); }
        }

        .electro-icon-van-beacon-glow {
          fill: var(--electro-fg);
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0.18;
          animation: electro-icon-van-beacon-pulse 0.9s ease-in-out infinite;
          animation-play-state: paused;
        }
        .electro-icon-trigger:hover .electro-icon-van-beacon-glow,
        .electro-icon-van-svg:hover .electro-icon-van-beacon-glow {
          animation-play-state: running;
        }
        @keyframes electro-icon-van-beacon-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.25); }
        }

        .electro-icon-van-beacon-core {
          fill: var(--electro-fg);
          animation: electro-icon-van-beacon-core 0.9s ease-in-out infinite;
          animation-play-state: paused;
        }

        .electro-icon-van-beacon-ray {
          fill: rgba(255, 210, 26, 0.16);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: 148px 66px;
          animation: electro-icon-van-beacon-ray 0.9s ease-in-out infinite;
          animation-play-state: paused;
        }
        .electro-icon-trigger:hover .electro-icon-van-beacon-core,
        .electro-icon-van-svg:hover .electro-icon-van-beacon-core,
        .electro-icon-trigger:focus-visible .electro-icon-van-beacon-core,
        .electro-icon-trigger:hover .electro-icon-van-beacon-ray,
        .electro-icon-van-svg:hover .electro-icon-van-beacon-ray,
        .electro-icon-trigger:focus-visible .electro-icon-van-beacon-ray {
          animation-play-state: running;
        }
        @keyframes electro-icon-van-beacon-core {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes electro-icon-van-beacon-ray {
          0%, 100% { opacity: 0.08; transform: rotate(-12deg) scaleX(0.86); }
          50%      { opacity: 0.48; transform: rotate(12deg) scaleX(1.08); }
        }

        .electro-icon-van-speed {
          stroke: var(--electro-fg);
          stroke-width: 3;
          stroke-linecap: round;
          fill: none;
          opacity: 0;
          animation: electro-icon-van-speed-run 0.7s linear infinite;
          animation-play-state: paused;
        }
        .electro-icon-trigger:hover .electro-icon-van-speed,
        .electro-icon-van-svg:hover .electro-icon-van-speed,
        .electro-icon-trigger:focus-visible .electro-icon-van-speed {
          animation-play-state: running;
        }
        .electro-icon-van-speed--1 { animation-delay: 0s; }
        .electro-icon-van-speed--2 { animation-delay: 0.18s; }
        .electro-icon-van-speed--3 { animation-delay: 0.34s; }

        @keyframes electro-icon-van-speed-run {
          0%   { transform: translateX(20px); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateX(-30px); opacity: 0; }
        }
      `}</style>

      <g className="electro-icon-van">
        {/* Speed lines (behind the van) */}
        <g>
          <line className="electro-icon-van-speed electro-icon-van-speed--1" x1="40" y1="110" x2="14" y2="110" />
          <line className="electro-icon-van-speed electro-icon-van-speed--2" x1="44" y1="128" x2="10" y2="128" />
          <line className="electro-icon-van-speed electro-icon-van-speed--3" x1="40" y1="146" x2="18" y2="146" />
        </g>

        <g className="electro-icon-van-rig">
          {/* Beacon glow */}
          <ellipse className="electro-icon-van-beacon-glow" cx="148" cy="64" rx="14" ry="6" />
          <path className="electro-icon-van-beacon-ray" d="M148 66 L104 36 L192 36 Z" />

          {/* Beacon */}
          <rect x="142" y="62" width="14" height="8" rx="1.6" fill="#FFD21A" stroke="#05070A" strokeWidth="1.4" />
          <rect className="electro-icon-van-beacon-core" x="144" y="64" width="10" height="4" rx="1" />

          {/* Cab */}
          <path
            className="electro-icon-van-body"
            d="M58 96 L58 144 L196 144 L196 110 L172 110 L160 88 L78 88 Q58 88 58 96 Z"
          />

          {/* Cargo divider */}
          <line className="electro-icon-van-stroke" x1="160" y1="88" x2="160" y2="144" />

          {/* Windshield */}
          <path
            className="electro-icon-van-window"
            d="M164 94 L172 110 L194 110 L194 94 Z"
          />

          {/* Side window */}
          <rect className="electro-icon-van-window" x="68" y="96" width="34" height="20" rx="2" />

          {/* Lightning bolt on the side */}
          <path
            className="electro-icon-van-bolt"
            d="M124 100 L114 124 L124 124 L118 140 L138 116 L128 116 L134 100 Z"
          />

          {/* Door seam */}
          <line className="electro-icon-van-stroke" x1="110" y1="118" x2="110" y2="144" />

          {/* Headlight */}
          <circle cx="192" cy="136" r="3" fill="#FFD21A" />

          {/* Wheels */}
          <g>
            <circle cx="84" cy="148" r="14" fill="#05070A" stroke="#FFD21A" strokeWidth="3.2" />
            <g className="electro-icon-van-wheel">
              <circle cx="84" cy="148" r="14" fill="none" />
              <line x1="84" y1="136" x2="84" y2="160" stroke="#FFD21A" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="72" y1="148" x2="96" y2="148" stroke="#FFD21A" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="76" y1="140" x2="92" y2="156" stroke="#FFD21A" strokeWidth="2" strokeLinecap="round" />
              <line x1="76" y1="156" x2="92" y2="140" stroke="#FFD21A" strokeWidth="2" strokeLinecap="round" />
              <circle cx="84" cy="148" r="3.4" fill="#FFD21A" />
            </g>
          </g>

          <g>
            <circle cx="174" cy="148" r="14" fill="#05070A" stroke="#FFD21A" strokeWidth="3.2" />
            <g className="electro-icon-van-wheel">
              <circle cx="174" cy="148" r="14" fill="none" />
              <line x1="174" y1="136" x2="174" y2="160" stroke="#FFD21A" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="162" y1="148" x2="186" y2="148" stroke="#FFD21A" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="166" y1="140" x2="182" y2="156" stroke="#FFD21A" strokeWidth="2" strokeLinecap="round" />
              <line x1="166" y1="156" x2="182" y2="140" stroke="#FFD21A" strokeWidth="2" strokeLinecap="round" />
              <circle cx="174" cy="148" r="3.4" fill="#FFD21A" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
