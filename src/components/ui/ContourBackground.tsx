/**
 * The signature motif: low-opacity topographic contour lines + a faint
 * compass rose. Pure inline SVG, no canvas. Optional 30s glacial drift
 * (off under reduced-motion via the .contour-drift CSS). Decorative.
 */
export function ContourBackground({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="contour-drift absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Topographic contour lines (ink @ ~7%) */}
        <g stroke="rgba(15, 42, 63, 0.07)" strokeWidth="1.25" fill="none">
          <path d="M-50 120 C 200 60, 420 180, 640 110 S 1050 40, 1260 140" />
          <path d="M-50 180 C 210 120, 430 240, 650 170 S 1060 100, 1260 200" />
          <path d="M-50 250 C 230 180, 450 300, 660 230 S 1070 160, 1260 260" />
          <path d="M-50 330 C 240 260, 470 380, 680 310 S 1080 240, 1260 340" />
          <path d="M-50 420 C 250 350, 480 470, 700 400 S 1090 330, 1260 430" />
          <path d="M-50 510 C 260 440, 500 560, 720 490 S 1100 420, 1260 520" />
        </g>
        {/* A few amber route marks (amber @ ~18%) */}
        <g fill="rgba(224, 161, 0, 0.18)">
          <circle cx="420" cy="180" r="3" />
          <circle cx="660" cy="230" r="3" />
          <circle cx="900" cy="300" r="3" />
        </g>
        {/* Faint compass rose anchored right */}
        <g transform="translate(1010 150)" opacity="0.9">
          <circle r="62" stroke="rgba(15, 42, 63, 0.08)" strokeWidth="1.25" fill="none" />
          <circle r="44" stroke="rgba(15, 42, 63, 0.06)" strokeWidth="1" fill="none" />
          {/* N needle in amber, others ink */}
          <path d="M0 -56 L 9 0 L 0 8 L -9 0 Z" fill="rgba(224, 161, 0, 0.22)" />
          <path d="M0 56 L 9 0 L 0 -8 L -9 0 Z" fill="rgba(15, 42, 63, 0.08)" />
          <path d="M-56 0 L 0 -9 L 8 0 L 0 9 Z" fill="rgba(15, 42, 63, 0.06)" />
          <path d="M56 0 L 0 -9 L -8 0 L 0 9 Z" fill="rgba(15, 42, 63, 0.06)" />
        </g>
      </svg>
    </div>
  );
}
