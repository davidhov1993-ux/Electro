type LightBulbIconProps = {
  className?: string;
  title?: string;
};

export function LightBulbIcon({ className, title }: LightBulbIconProps) {
  const titleId = title ? "electro-icon-bulb-title" : undefined;

  return (
    <svg
      className={`electro-icon-bulb-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      role={title ? "img" : "presentation"}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title id={titleId}>{title}</title> : null}

      <style>{`
        .electro-icon-bulb {
          --electro-bg: #05070A;
          --electro-fg: #FFD21A;
          --electro-bulb-fill: transparent;
          --electro-bulb-stroke: rgba(255, 210, 26, 0.55);
          --electro-bulb-filament: rgba(255, 210, 26, 0.32);
          --electro-bulb-halo: 0;
          --electro-bulb-rays: 0;
          transition:
            --electro-bulb-fill 240ms ease,
            --electro-bulb-stroke 240ms ease,
            --electro-bulb-filament 240ms ease;
        }

        .electro-icon-trigger:hover .electro-icon-bulb,
        .electro-icon-bulb-svg:hover .electro-icon-bulb {
          --electro-bulb-fill: rgba(255, 210, 26, 0.22);
          --electro-bulb-stroke: var(--electro-fg);
          --electro-bulb-filament: var(--electro-fg);
          --electro-bulb-halo: 1;
          --electro-bulb-rays: 1;
        }

        .electro-icon-bulb-glass {
          fill: var(--electro-bulb-fill);
          stroke: var(--electro-bulb-stroke);
          stroke-width: 3.4;
          stroke-linejoin: round;
          transition: fill 240ms ease, stroke 240ms ease;
        }
        .electro-icon-bulb-cap {
          fill: var(--electro-bg);
          stroke: var(--electro-bulb-stroke);
          stroke-width: 3;
          stroke-linejoin: round;
          transition: stroke 240ms ease;
        }
        .electro-icon-bulb-cap-line {
          stroke: var(--electro-bulb-stroke);
          stroke-width: 2.4;
          stroke-linecap: round;
          fill: none;
          transition: stroke 240ms ease;
        }
        .electro-icon-bulb-filament {
          stroke: var(--electro-bulb-filament);
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          filter: drop-shadow(0 0 4px rgba(255, 210, 26, calc(var(--electro-bulb-halo) * 0.85)));
          transition: stroke 240ms ease;
        }

        .electro-icon-bulb-halo {
          fill: url(#electro-icon-bulb-grad);
          opacity: var(--electro-bulb-halo);
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 240ms ease;
          animation: electro-icon-bulb-halo-pulse 1.6s ease-in-out infinite;
          animation-play-state: paused;
        }

        .electro-icon-bulb-beam {
          fill: url(#electro-icon-bulb-beam-grad);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: 100px 92px;
          transition: opacity 240ms ease;
          animation: electro-icon-bulb-beam-sweep 1.9s ease-in-out infinite;
          animation-play-state: paused;
        }

        .electro-icon-trigger:hover .electro-icon-bulb-halo,
        .electro-icon-bulb-svg:hover .electro-icon-bulb-halo,
        .electro-icon-trigger:focus-visible .electro-icon-bulb-halo,
        .electro-icon-trigger:hover .electro-icon-bulb-beam,
        .electro-icon-bulb-svg:hover .electro-icon-bulb-beam,
        .electro-icon-trigger:focus-visible .electro-icon-bulb-beam {
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes electro-icon-bulb-halo-pulse {
          0%, 100% { transform: scale(0.92); }
          50%      { transform: scale(1.08); }
        }

        @keyframes electro-icon-bulb-beam-sweep {
          0%, 100% { transform: scaleX(0.92); opacity: 0.4; }
          50%      { transform: scaleX(1.08); opacity: 0.9; }
        }

        .electro-icon-bulb-flicker {
          animation: electro-icon-bulb-flicker 1.4s steps(8, end) infinite;
          animation-play-state: paused;
          opacity: var(--electro-bulb-halo);
        }
        .electro-icon-trigger:hover .electro-icon-bulb-flicker,
        .electro-icon-bulb-svg:hover .electro-icon-bulb-flicker {
          animation-play-state: running;
        }
        @keyframes electro-icon-bulb-flicker {
          0%, 18%, 22%, 100% { opacity: 1; }
          20%, 60%           { opacity: 0.65; }
        }

        .electro-icon-bulb-ray {
          stroke: var(--electro-fg);
          stroke-width: 3;
          stroke-linecap: round;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: 100px 86px;
          transition: opacity 240ms ease;
        }
        .electro-icon-trigger:hover .electro-icon-bulb-ray,
        .electro-icon-bulb-svg:hover .electro-icon-bulb-ray {
          opacity: calc(var(--electro-bulb-rays) * 0.95);
          animation: electro-icon-bulb-ray-grow 1.6s ease-in-out infinite;
        }
        .electro-icon-bulb-ray--1 { animation-delay: 0s; }
        .electro-icon-bulb-ray--2 { animation-delay: 0.1s; }
        .electro-icon-bulb-ray--3 { animation-delay: 0.2s; }
        .electro-icon-bulb-ray--4 { animation-delay: 0.05s; }
        .electro-icon-bulb-ray--5 { animation-delay: 0.15s; }

        @keyframes electro-icon-bulb-ray-grow {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>

      <defs>
        <radialGradient id="electro-icon-bulb-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD21A" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FFD21A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFD21A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="electro-icon-bulb-beam-grad" x1="100" y1="88" x2="100" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD21A" stopOpacity="0.46" />
          <stop offset="58%" stopColor="#FFD21A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FFD21A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="electro-icon-bulb">
        {/* Halo behind the bulb */}
        <circle className="electro-icon-bulb-halo" cx="100" cy="86" r="64" />
        <path className="electro-icon-bulb-beam" d="M58 88 L142 88 L184 190 H16 Z" />

        {/* Rays */}
        <g className="electro-icon-bulb-flicker">
          <line className="electro-icon-bulb-ray electro-icon-bulb-ray--1" x1="100" y1="20" x2="100" y2="6" />
          <line className="electro-icon-bulb-ray electro-icon-bulb-ray--2" x1="44"  y1="44" x2="32"  y2="32" />
          <line className="electro-icon-bulb-ray electro-icon-bulb-ray--3" x1="156" y1="44" x2="168" y2="32" />
          <line className="electro-icon-bulb-ray electro-icon-bulb-ray--4" x1="32"  y1="92" x2="14"  y2="92" />
          <line className="electro-icon-bulb-ray electro-icon-bulb-ray--5" x1="168" y1="92" x2="186" y2="92" />
        </g>

        {/* Bulb glass */}
        <path
          className="electro-icon-bulb-glass"
          d="M100 36
             C 72 36, 56 58, 56 84
             C 56 102, 66 114, 76 124
             C 82 130, 84 134, 84 140
             L 116 140
             C 116 134, 118 130, 124 124
             C 134 114, 144 102, 144 84
             C 144 58, 128 36, 100 36 Z"
        />

        {/* Filament */}
        <g className="electro-icon-bulb-flicker">
          <path
            className="electro-icon-bulb-filament"
            d="M86 110 L86 96 Q86 84, 94 84 Q102 84, 102 96 Q102 84, 110 84 Q118 84, 118 96 L118 110"
          />
          <line className="electro-icon-bulb-filament" x1="86" y1="110" x2="118" y2="110" />
        </g>

        {/* Cap (screw base) */}
        <rect className="electro-icon-bulb-cap" x="84" y="142" width="32" height="8" rx="1.4" />
        <rect className="electro-icon-bulb-cap" x="86" y="152" width="28" height="8" rx="1.4" />
        <line className="electro-icon-bulb-cap-line" x1="86" y1="148" x2="114" y2="148" />
        <path
          className="electro-icon-bulb-cap"
          d="M90 162 L110 162 L106 174 Q100 178, 94 174 Z"
        />
        <line className="electro-icon-bulb-cap-line" x1="98" y1="178" x2="102" y2="178" />
      </g>
    </svg>
  );
}
