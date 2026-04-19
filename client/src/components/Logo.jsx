const Logo = ({ size = 40, showText = true }) => {
  return (
    <svg
      width={showText ? size * 4 : size}
      height={size}
      viewBox={showText ? "0 0 400 100" : "0 0 100 100"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* back page */}
      <rect x="28" y="8" width="56" height="72" rx="5" fill="#b45309" />

      {/* mid page */}
      <rect x="20" y="16" width="56" height="72" rx="5" fill="#d97706" />

      {/* front page */}
      <rect x="12" y="24" width="56" height="72" rx="5" fill="#f59e0b" />

      {/* code lines */}
      <line
        x1="22"
        y1="37"
        x2="56"
        y2="37"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="48"
        x2="48"
        y2="48"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="59"
        x2="54"
        y2="59"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="70"
        x2="46"
        y2="70"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* brackets */}
      <path
        d="M22 79 L16 85 L22 91"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M54 79 L60 85 L54 91"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* conditional text */}
      {showText && (
        <text
          x="100"
          y="65"
          fontSize="44"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
          fill="#fafaf9"
        >
          Code<tspan fill="#f59e0b">Vault</tspan>
        </text>
      )}
    </svg>
  );
};

export default Logo;
