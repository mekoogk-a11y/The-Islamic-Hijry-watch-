import React from 'react';

interface KitabSunnahLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Authentic Official Emblem Component for "جمعية الكتاب والسنة الخيرية بالسودان"
 * Faithful representation featuring:
 * - Circular Emerald Green & Gold Islamic medallion
 * - Radiant sunbeams of knowledge
 * - Open Holy Quran (المصحف الشريف) on traditional carved wooden rihal stand
 * - Flanking golden wheat / olive laurel branches
 * - Calligraphic crest header "جمعية الكتاب والسنة الخيرية"
 * - Base banner "جمهورية السودان"
 */
export const KitabSunnahLogo: React.FC<KitabSunnahLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
        title="شعار جمعية الكتاب والسنة الخيرية بالسودان"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="greenBgGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="60%" stopColor="#04432b" />
            <stop offset="100%" stopColor="#022417" />
          </radialGradient>

          <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="sunbeamGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="quranPageGradL" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="quranPageGradR" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="woodStandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Text Path for circular arc */}
          <path
            id="textArcTop"
            d="M 28,100 A 72,72 0 1,1 172,100"
            fill="none"
          />
        </defs>

        {/* Outer Golden Border Rings */}
        <circle cx="100" cy="100" r="97" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="4" />
        <circle cx="100" cy="100" r="93" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="100" cy="100" r="90" fill="url(#greenBgGrad)" stroke="url(#goldBorderGrad)" strokeWidth="2" />

        {/* Radiant Sunbeams of Divine Revelation behind Quran */}
        <g opacity="0.65">
          {/* Fan of golden light rays */}
          <polygon points="100,105 75,32 85,30" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 88,27 96,26" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 104,26 112,27" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 115,30 125,32" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 60,42 70,38" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 130,38 140,42" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 48,55 58,49" fill="url(#sunbeamGrad)" />
          <polygon points="100,105 142,49 152,55" fill="url(#sunbeamGrad)" />
        </g>

        {/* Crescent glow over the horizon */}
        <circle cx="100" cy="102" r="32" fill="#fbbf24" opacity="0.15" />

        {/* Flanking Golden Wheat / Laurel Wreaths */}
        {/* Left Branch */}
        <g stroke="#f59e0b" strokeWidth="1.2" fill="#d97706" opacity="0.9">
          <path d="M 28,135 Q 24,105 32,75" fill="none" strokeWidth="1.5" />
          <ellipse cx="27" cy="120" rx="4" ry="2.2" transform="rotate(-30 27 120)" />
          <ellipse cx="25" cy="106" rx="4" ry="2.2" transform="rotate(-15 25 106)" />
          <ellipse cx="26" cy="92" rx="4" ry="2.2" transform="rotate(10 26 92)" />
          <ellipse cx="30" cy="79" rx="4" ry="2.2" transform="rotate(30 30 79)" />
          <ellipse cx="36" cy="68" rx="3.5" ry="2" transform="rotate(45 36 68)" />
        </g>
        {/* Right Branch */}
        <g stroke="#f59e0b" strokeWidth="1.2" fill="#d97706" opacity="0.9">
          <path d="M 172,135 Q 176,105 168,75" fill="none" strokeWidth="1.5" />
          <ellipse cx="173" cy="120" rx="4" ry="2.2" transform="rotate(30 173 120)" />
          <ellipse cx="175" cy="106" rx="4" ry="2.2" transform="rotate(15 175 106)" />
          <ellipse cx="174" cy="92" rx="4" ry="2.2" transform="rotate(-10 174 92)" />
          <ellipse cx="170" cy="79" rx="4" ry="2.2" transform="rotate(-30 170 79)" />
          <ellipse cx="164" cy="68" rx="3.5" ry="2" transform="rotate(-45 164 68)" />
        </g>

        {/* Circular Calligraphy: "جمعية الكتاب والسنة الخيرية" */}
        <text className="font-bold select-none" fill="#fef08a" fontSize="11" letterSpacing="1.2" textAnchor="middle">
          <textPath href="#textArcTop" startOffset="50%">
            جمعية الكتاب والسنة الخيرية
          </textPath>
        </text>

        {/* Carved Wooden Quran Stand (الرحال) */}
        <g id="woodenRihal">
          {/* Back shadow leg */}
          <polygon points="100,128 72,160 84,162 100,135" fill="url(#woodStandGrad)" />
          <polygon points="100,128 128,160 116,162 100,135" fill="url(#woodStandGrad)" />
          {/* Front crossing legs */}
          <polygon points="68,158 100,124 105,127 76,162" fill="#78350f" stroke="#b45309" strokeWidth="0.8" />
          <polygon points="132,158 100,124 95,127 124,162" fill="#92400e" stroke="#f59e0b" strokeWidth="0.8" />
          {/* Stand decorative diamond motif */}
          <polygon points="100,132 105,138 100,144 95,138" fill="#fbbf24" />
        </g>

        {/* The Open Holy Quran (المصحف الشريف) */}
        <g id="holyQuran">
          {/* Quran Green/Gold Binding Underneath */}
          <path
            d="M 52,120 Q 98,126 100,128 Q 102,126 148,120 L 152,124 Q 102,132 100,132 Q 98,132 48,124 Z"
            fill="#064e3b"
            stroke="#fbbf24"
            strokeWidth="1.2"
          />

          {/* Left Page (curved open leaf) */}
          <path
            d="M 100,125 Q 75,120 52,112 Q 51,90 53,78 Q 78,85 100,92 Z"
            fill="url(#quranPageGradL)"
            stroke="#b45309"
            strokeWidth="0.8"
          />
          {/* Right Page (curved open leaf) */}
          <path
            d="M 100,125 Q 125,120 148,112 Q 149,90 147,78 Q 122,85 100,92 Z"
            fill="url(#quranPageGradR)"
            stroke="#b45309"
            strokeWidth="0.8"
          />

          {/* Golden Margin Border Lines inside Pages */}
          <path d="M 97,121 Q 76,116 57,110 Q 56,92 57,83 Q 77,88 97,94 Z" fill="none" stroke="#d97706" strokeWidth="0.7" />
          <path d="M 103,121 Q 124,116 143,110 Q 144,92 143,83 Q 123,88 103,94 Z" fill="none" stroke="#d97706" strokeWidth="0.7" />

          {/* Calligraphic Quranic text lines representation */}
          <g stroke="#334155" strokeWidth="1" strokeLinecap="round" opacity="0.75">
            <line x1="62" y1="89" x2="92" y2="95" />
            <line x1="61" y1="96" x2="92" y2="102" />
            <line x1="61" y1="103" x2="92" y2="109" />
            <line x1="62" y1="110" x2="92" y2="116" />

            <line x1="108" y1="95" x2="138" y2="89" />
            <line x1="108" y1="102" x2="139" y2="96" />
            <line x1="108" y1="109" x2="139" y2="103" />
            <line x1="108" y1="116" x2="138" y2="110" />
          </g>

          {/* Central spine of the Quran */}
          <line x1="100" y1="91" x2="100" y2="127" stroke="#92400e" strokeWidth="1.8" />
          <circle cx="100" cy="92" r="1.5" fill="#f59e0b" />
        </g>

        {/* Lower Emerald Ribbon Banner: "جمهورية السودان" */}
        <g id="bottomBanner">
          {/* Ribbon ends */}
          <polygon points="34,166 48,154 48,174 34,178 40,172" fill="#04432b" stroke="#f59e0b" strokeWidth="0.8" />
          <polygon points="166,166 152,154 152,174 166,178 160,172" fill="#04432b" stroke="#f59e0b" strokeWidth="0.8" />

          {/* Main Ribbon Body */}
          <path
            d="M 44,166 Q 100,154 156,166 L 152,178 Q 100,166 48,178 Z"
            fill="url(#greenBgGrad)"
            stroke="url(#goldBorderGrad)"
            strokeWidth="1.5"
          />

          {/* Text inside banner: السودان */}
          <text
            x="100"
            y="173"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
            className="select-none"
          >
            السودان
          </text>
        </g>

        {/* Top Centered Golden Star & Crescent Accent */}
        <path
          d="M 98,18 Q 103,17 104,22 Q 101,21 99,22 Z"
          fill="#fde047"
        />
        <circle cx="100" cy="18" r="1.6" fill="#fde047" />
      </svg>

      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <span className="font-extrabold text-amber-300 text-xs sm:text-sm font-cairo">
            جمعية الكتاب والسنة الخيرية
          </span>
          <span className="text-[10px] text-emerald-300 font-medium">
            جمهورية السودان
          </span>
        </div>
      )}
    </div>
  );
};
