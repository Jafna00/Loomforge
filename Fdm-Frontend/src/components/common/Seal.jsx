/**
 * The page's signature element: a rotating seal that states the studio's
 * actual differentiator (design + manufacture, in-house) rather than a
 * decorative badge. Pure CSS animation so it costs nothing on the main
 * thread and respects prefers-reduced-motion globally.
 */
export default function Seal({ className = '' }) {
  const text =
  "LOOMFORGE • AI MANUFACTURING PLATFORM • DESIGNERS TO FACTORIES • ";

  return (
    <div className={`relative w-28 h-28 md:w-36 md:h-36 ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
        <defs>
          <path
            id="seal-circle"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text fill="currentColor" className="font-mono" fontSize="9" letterSpacing="1.5">
          <textPath href="#seal-circle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="block w-3 h-3 rounded-full bg-oxblood" />
      </div>
    </div>
  );
}