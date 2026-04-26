type MotionIconProps = {
  className?: string;
  title?: string;
};

function titleProps(title: string | undefined, id: string) {
  return {
    role: title ? "img" : "presentation",
    "aria-labelledby": title ? id : undefined,
    "aria-hidden": title ? undefined : true,
  } as const;
}

export function WiringMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-wiring-title" : undefined;

  return (
    <svg
      className={`electro-icon-wiring-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-wiring { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-wiring-box { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3; }
        .electro-icon-wiring-line { fill: none; stroke: rgba(255, 210, 26, 0.46); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
        .electro-icon-wiring-flow { fill: none; stroke: var(--electro-fg); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 18 150; stroke-dashoffset: 90; opacity: 0; filter: drop-shadow(0 0 9px rgba(255, 210, 26, 0.8)); animation: electro-icon-wiring-flow 1.35s linear infinite; animation-play-state: paused; }
        .electro-icon-wiring-spark { fill: var(--electro-fg); opacity: 0; transform-box: fill-box; transform-origin: center; animation: electro-icon-wiring-spark 0.9s steps(2, end) infinite; animation-play-state: paused; }
        .electro-icon-wiring-spark--2 { animation-delay: 0.22s; }
        .electro-icon-wiring-spark--3 { animation-delay: 0.44s; }
        .electro-icon-trigger:hover .electro-icon-wiring-flow,
        .electro-icon-trigger:focus-visible .electro-icon-wiring-flow { opacity: 1; animation-play-state: running; }
        .electro-icon-trigger:hover .electro-icon-wiring-spark,
        .electro-icon-trigger:focus-visible .electro-icon-wiring-spark { animation-play-state: running; }
        @keyframes electro-icon-wiring-flow { to { stroke-dashoffset: -120; } }
        @keyframes electro-icon-wiring-spark { 0%, 100% { opacity: 0; transform: scale(0.7) rotate(0deg); } 50% { opacity: 1; transform: scale(1.16) rotate(28deg); } }
      `}</style>
      <g className="electro-icon-wiring">
        <rect className="electro-icon-wiring-box" x="26" y="70" width="42" height="52" rx="4" />
        <rect className="electro-icon-wiring-box" x="152" y="52" width="42" height="42" rx="4" />
        <rect className="electro-icon-wiring-box" x="148" y="124" width="48" height="34" rx="4" />
        <path className="electro-icon-wiring-line" d="M68 96 C98 96 92 70 120 70 C136 70 139 73 152 73" />
        <path className="electro-icon-wiring-line" d="M68 96 C104 96 104 142 148 142" />
        <path className="electro-icon-wiring-flow" d="M68 96 C98 96 92 70 120 70 C136 70 139 73 152 73" />
        <path className="electro-icon-wiring-flow" d="M68 96 C104 96 104 142 148 142" />
        <circle cx="48" cy="88" r="4" fill="#FFD21A" />
        <circle cx="48" cy="106" r="4" fill="#FFD21A" />
        <path className="electro-icon-wiring-spark" d="M118 52 L124 66 L139 62 L128 74 L134 89 L121 80 L108 91 L113 74 L100 64 L116 65 Z" />
        <path className="electro-icon-wiring-spark electro-icon-wiring-spark--2" d="M184 102 L188 112 L199 109 L191 118 L195 128 L185 122 L176 130 L179 118 L170 111 L182 112 Z" />
        <path className="electro-icon-wiring-spark electro-icon-wiring-spark--3" d="M86 132 L90 142 L101 139 L93 148 L97 158 L87 152 L78 160 L81 148 L72 141 L84 142 Z" />
      </g>
    </svg>
  );
}

export function PanelMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-panel-title" : undefined;

  return (
    <svg
      className={`electro-icon-panel-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-panel { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-panel-case { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3.2; }
        .electro-icon-panel-line { stroke: rgba(255, 210, 26, 0.52); stroke-width: 2.2; stroke-linecap: round; fill: none; }
        .electro-icon-panel-bus { stroke: var(--electro-fg); stroke-width: 3.2; stroke-linecap: round; fill: none; stroke-dasharray: 9 11; animation: electro-icon-panel-bus 1.1s linear infinite; animation-play-state: paused; }
        .electro-icon-panel-led { fill: var(--electro-fg); opacity: 0.22; animation: electro-icon-panel-led 0.8s steps(2, end) infinite; animation-play-state: paused; }
        .electro-icon-panel-switch { transform-box: fill-box; transform-origin: center; animation: electro-icon-panel-switch 1.2s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-trigger:hover .electro-icon-panel-bus,
        .electro-icon-trigger:hover .electro-icon-panel-led,
        .electro-icon-trigger:hover .electro-icon-panel-switch,
        .electro-icon-trigger:focus-visible .electro-icon-panel-bus,
        .electro-icon-trigger:focus-visible .electro-icon-panel-led,
        .electro-icon-trigger:focus-visible .electro-icon-panel-switch { animation-play-state: running; }
        .electro-icon-panel-led--2 { animation-delay: 0.2s; }
        .electro-icon-panel-led--3 { animation-delay: 0.4s; }
        @keyframes electro-icon-panel-bus { to { stroke-dashoffset: -40; } }
        @keyframes electro-icon-panel-led { 0%,49% { opacity: 1; filter: drop-shadow(0 0 7px rgba(255, 210, 26, 0.8)); } 50%,100% { opacity: 0.24; filter: none; } }
        @keyframes electro-icon-panel-switch { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>
      <g className="electro-icon-panel">
        <rect className="electro-icon-panel-case" x="52" y="34" width="116" height="132" rx="8" />
        <line className="electro-icon-panel-bus" x1="72" y1="58" x2="148" y2="58" />
        <line className="electro-icon-panel-line" x1="80" y1="72" x2="80" y2="148" />
        <line className="electro-icon-panel-line" x1="110" y1="72" x2="110" y2="148" />
        <line className="electro-icon-panel-line" x1="140" y1="72" x2="140" y2="148" />
        <g className="electro-icon-panel-switch">
          <rect x="70" y="82" width="20" height="44" rx="3" fill="#05070A" stroke="#FFD21A" strokeWidth="2.6" />
          <rect x="76" y="90" width="8" height="18" rx="2" fill="#FFD21A" />
        </g>
        <g className="electro-icon-panel-switch" style={{ animationDelay: "0.18s" }}>
          <rect x="100" y="82" width="20" height="44" rx="3" fill="#05070A" stroke="#FFD21A" strokeWidth="2.6" />
          <rect x="106" y="100" width="8" height="18" rx="2" fill="#FFD21A" />
        </g>
        <g className="electro-icon-panel-switch" style={{ animationDelay: "0.36s" }}>
          <rect x="130" y="82" width="20" height="44" rx="3" fill="#05070A" stroke="#FFD21A" strokeWidth="2.6" />
          <rect x="136" y="90" width="8" height="18" rx="2" fill="#FFD21A" />
        </g>
        <circle className="electro-icon-panel-led electro-icon-panel-led--1" cx="82" cy="144" r="4" />
        <circle className="electro-icon-panel-led electro-icon-panel-led--2" cx="112" cy="144" r="4" />
        <circle className="electro-icon-panel-led electro-icon-panel-led--3" cx="142" cy="144" r="4" />
      </g>
    </svg>
  );
}

export function CameraMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-camera-title" : undefined;

  return (
    <svg
      className={`electro-icon-camera-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-camera { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-camera-body { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3.2; stroke-linejoin: round; }
        .electro-icon-camera-stroke { fill: none; stroke: var(--electro-fg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .electro-icon-camera-rig { transform-origin: 118px 92px; animation: electro-icon-camera-pan 2s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-camera-cone { fill: rgba(255, 210, 26, 0.12); opacity: 0; transform-origin: 140px 106px; animation: electro-icon-camera-sweep 1.7s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-camera-lens { fill: var(--electro-fg); animation: electro-icon-camera-lens 1s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-trigger:hover .electro-icon-camera-rig,
        .electro-icon-trigger:hover .electro-icon-camera-cone,
        .electro-icon-trigger:hover .electro-icon-camera-lens,
        .electro-icon-trigger:focus-visible .electro-icon-camera-rig,
        .electro-icon-trigger:focus-visible .electro-icon-camera-cone,
        .electro-icon-trigger:focus-visible .electro-icon-camera-lens { animation-play-state: running; }
        @keyframes electro-icon-camera-pan { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(6deg); } }
        @keyframes electro-icon-camera-sweep { 0%,100% { opacity: 0.08; transform: rotate(-5deg); } 50% { opacity: 0.34; transform: rotate(7deg); } }
        @keyframes electro-icon-camera-lens { 0%,100% { opacity: 0.78; filter: none; } 50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(255, 210, 26, 0.9)); } }
      `}</style>
      <g className="electro-icon-camera">
        <path className="electro-icon-camera-cone" d="M135 98 L205 62 L205 158 L135 118 Z" />
        <line className="electro-icon-camera-stroke" x1="68" y1="58" x2="110" y2="58" />
        <line className="electro-icon-camera-stroke" x1="88" y1="58" x2="88" y2="84" />
        <g className="electro-icon-camera-rig">
          <path className="electro-icon-camera-body" d="M70 82 L142 70 L158 116 L88 130 Z" />
          <path className="electro-icon-camera-body" d="M142 78 L174 84 L182 108 L158 114 Z" />
          <circle className="electro-icon-camera-lens" cx="160" cy="98" r="9" />
          <line className="electro-icon-camera-stroke" x1="94" y1="128" x2="84" y2="154" />
          <line className="electro-icon-camera-stroke" x1="74" y1="154" x2="106" y2="154" />
        </g>
      </g>
    </svg>
  );
}

export function AccessMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-access-title" : undefined;

  return (
    <svg
      className={`electro-icon-access-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-access { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-access-body { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3.2; }
        .electro-icon-access-line { fill: none; stroke: var(--electro-fg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .electro-icon-access-shackle { transform-origin: 104px 84px; animation: electro-icon-access-open 1.7s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-access-signal { stroke: var(--electro-fg); fill: none; stroke-width: 2.8; stroke-linecap: round; opacity: 0; animation: electro-icon-access-signal 1.2s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-access-led { fill: var(--electro-fg); opacity: 0.18; animation: electro-icon-access-led 0.9s steps(2, end) infinite; animation-play-state: paused; }
        .electro-icon-trigger:hover .electro-icon-access-shackle,
        .electro-icon-trigger:hover .electro-icon-access-signal,
        .electro-icon-trigger:hover .electro-icon-access-led,
        .electro-icon-trigger:focus-visible .electro-icon-access-shackle,
        .electro-icon-trigger:focus-visible .electro-icon-access-signal,
        .electro-icon-trigger:focus-visible .electro-icon-access-led { animation-play-state: running; }
        .electro-icon-access-signal--2 { animation-delay: 0.22s; }
        @keyframes electro-icon-access-open { 0%,100% { transform: rotate(0deg) translateY(0); } 45%,65% { transform: rotate(-18deg) translate(-5px,-7px); } }
        @keyframes electro-icon-access-signal { 0% { opacity: 0; transform: scale(0.85); } 45% { opacity: 1; } 100% { opacity: 0; transform: scale(1.08); } }
        @keyframes electro-icon-access-led { 0%,49% { opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 210, 26, 0.85)); } 50%,100% { opacity: 0.18; filter: none; } }
      `}</style>
      <g className="electro-icon-access">
        <rect className="electro-icon-access-body" x="126" y="54" width="46" height="92" rx="6" />
        <circle className="electro-icon-access-led" cx="149" cy="78" r="5" />
        <rect x="138" y="98" width="22" height="30" rx="3" fill="#05070A" stroke="#FFD21A" strokeWidth="2.4" />
        <path className="electro-icon-access-signal electro-icon-access-signal--1" d="M120 76 Q104 60 88 76" />
        <path className="electro-icon-access-signal electro-icon-access-signal--2" d="M118 92 Q104 80 90 92" />
        <g>
          <rect className="electro-icon-access-body" x="58" y="92" width="62" height="54" rx="6" />
          <path className="electro-icon-access-line electro-icon-access-shackle" d="M72 94 V76 Q72 52 90 52 Q108 52 108 76 V92" />
          <circle cx="89" cy="118" r="6" fill="#FFD21A" />
          <line className="electro-icon-access-line" x1="89" y1="124" x2="89" y2="136" />
        </g>
      </g>
    </svg>
  );
}

export function SmartHomeMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-smart-title" : undefined;

  return (
    <svg
      className={`electro-icon-smart-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-smart { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-smart-body { fill: var(--electro-bg); stroke: var(--electro-fg); stroke-width: 3; stroke-linejoin: round; }
        .electro-icon-smart-line { fill: none; stroke: rgba(255, 210, 26, 0.5); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
        .electro-icon-smart-flow { fill: none; stroke: var(--electro-fg); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 8 12; opacity: 0; animation: electro-icon-smart-flow 1.2s linear infinite; animation-play-state: paused; }
        .electro-icon-smart-node { fill: var(--electro-fg); opacity: 0.35; animation: electro-icon-smart-node 1.2s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-smart-phone { transform-origin: 156px 106px; animation: electro-icon-smart-phone 1.6s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-trigger:hover .electro-icon-smart-flow,
        .electro-icon-trigger:hover .electro-icon-smart-node,
        .electro-icon-trigger:hover .electro-icon-smart-phone,
        .electro-icon-trigger:focus-visible .electro-icon-smart-flow,
        .electro-icon-trigger:focus-visible .electro-icon-smart-node,
        .electro-icon-trigger:focus-visible .electro-icon-smart-phone { opacity: 1; animation-play-state: running; }
        .electro-icon-smart-node--2 { animation-delay: 0.2s; }
        .electro-icon-smart-node--3 { animation-delay: 0.4s; }
        @keyframes electro-icon-smart-flow { to { stroke-dashoffset: -40; } }
        @keyframes electro-icon-smart-node { 0%,100% { transform: scale(0.86); filter: none; } 50% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(255, 210, 26, 0.8)); } }
        @keyframes electro-icon-smart-phone { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>
      <g className="electro-icon-smart">
        <path className="electro-icon-smart-body" d="M48 104 L100 60 L152 104 V156 H62 V104 Z" />
        <rect className="electro-icon-smart-body" x="140" y="74" width="40" height="86" rx="7" />
        <path className="electro-icon-smart-line" d="M82 128 H118" />
        <path className="electro-icon-smart-line" d="M100 96 V142" />
        <path className="electro-icon-smart-flow" d="M118 116 C132 102 136 102 146 102" />
        <path className="electro-icon-smart-flow" d="M118 136 C134 128 136 132 146 132" />
        <g className="electro-icon-smart-phone">
          <circle className="electro-icon-smart-node electro-icon-smart-node--1" cx="160" cy="100" r="4" />
          <circle className="electro-icon-smart-node electro-icon-smart-node--2" cx="160" cy="116" r="4" />
          <circle className="electro-icon-smart-node electro-icon-smart-node--3" cx="160" cy="132" r="4" />
        </g>
        <circle className="electro-icon-smart-node electro-icon-smart-node--1" cx="82" cy="128" r="5" />
        <circle className="electro-icon-smart-node electro-icon-smart-node--2" cx="118" cy="128" r="5" />
      </g>
    </svg>
  );
}

export function FloorHeatMotionIcon({ className, title }: MotionIconProps) {
  const titleId = title ? "electro-icon-floor-title" : undefined;

  return (
    <svg
      className={`electro-icon-floor-svg ${className ?? ""}`.trim()}
      width="100%"
      height="100%"
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      {...titleProps(title, titleId ?? "")}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <style>{`
        .electro-icon-floor { --electro-bg:#05070A; --electro-fg:#FFD21A; }
        .electro-icon-floor-line { fill: none; stroke: var(--electro-fg); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .electro-icon-floor-tile { fill: var(--electro-bg); stroke: rgba(255, 210, 26, 0.64); stroke-width: 2.4; }
        .electro-icon-floor-cable { fill: none; stroke: var(--electro-fg); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 18 16; animation: electro-icon-floor-cable 1.4s linear infinite; animation-play-state: paused; }
        .electro-icon-floor-heat { fill: none; stroke: var(--electro-fg); stroke-width: 3; stroke-linecap: round; opacity: 0; transform-origin: center; animation: electro-icon-floor-heat 1.6s ease-in-out infinite; animation-play-state: paused; }
        .electro-icon-floor-heat--2 { animation-delay: 0.24s; }
        .electro-icon-floor-heat--3 { animation-delay: 0.48s; }
        .electro-icon-trigger:hover .electro-icon-floor-cable,
        .electro-icon-trigger:hover .electro-icon-floor-heat,
        .electro-icon-trigger:focus-visible .electro-icon-floor-cable,
        .electro-icon-trigger:focus-visible .electro-icon-floor-heat { animation-play-state: running; }
        .electro-icon-trigger:hover .electro-icon-floor-heat,
        .electro-icon-trigger:focus-visible .electro-icon-floor-heat { opacity: 1; }
        @keyframes electro-icon-floor-cable { to { stroke-dashoffset: -68; } }
        @keyframes electro-icon-floor-heat { 0% { opacity: 0; transform: translateY(10px); } 35% { opacity: 1; } 100% { opacity: 0; transform: translateY(-14px); } }
      `}</style>
      <g className="electro-icon-floor">
        <path className="electro-icon-floor-heat electro-icon-floor-heat--1" d="M70 72 C58 56 82 50 70 34" />
        <path className="electro-icon-floor-heat electro-icon-floor-heat--2" d="M110 76 C98 58 122 50 110 30" />
        <path className="electro-icon-floor-heat electro-icon-floor-heat--3" d="M150 72 C138 56 162 50 150 34" />
        <rect className="electro-icon-floor-tile" x="42" y="104" width="44" height="34" />
        <rect className="electro-icon-floor-tile" x="88" y="104" width="44" height="34" />
        <rect className="electro-icon-floor-tile" x="134" y="104" width="44" height="34" />
        <rect className="electro-icon-floor-tile" x="42" y="140" width="44" height="30" />
        <rect className="electro-icon-floor-tile" x="88" y="140" width="44" height="30" />
        <rect className="electro-icon-floor-tile" x="134" y="140" width="44" height="30" />
        <path className="electro-icon-floor-cable" d="M52 122 H78 C94 122 94 154 110 154 C126 154 126 122 142 122 H168" />
      </g>
    </svg>
  );
}
