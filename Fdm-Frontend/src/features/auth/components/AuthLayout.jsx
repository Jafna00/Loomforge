import Seal from '../../../components/common/Seal.jsx';

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-paper">
      {/* Form side */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-16 relative">
        <a
          href="/"
          className="absolute top-8 left-8 font-display text-lg tracking-tightest text-ink"
        >
          LOOMFORGE
        </a>

        <div className="max-w-sm mx-auto w-full">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-oxblood mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display uppercase text-4xl md:text-5xl tracking-tightest leading-[0.9] text-ink">
            {title}
          </h1>
          <p className="font-serif italic text-stone2 mt-4">{subtitle}</p>

          <div className="mt-10">{children}</div>
        </div>
      </div>

      {/* Image / brand side */}
      <div className="hidden md:flex items-center justify-center bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/src/assets/images/gallery/auth.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-10">
          <Seal className="mx-auto text-paper w-32 h-32" />
          <p className="font-serif italic text-paper text-xl mt-8 max-w-xs mx-auto">
          Bridging creative minds
with production expertise.
          </p>
        </div>
      </div>
    </div>
  );
}