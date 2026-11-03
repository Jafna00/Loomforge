const links = [
  { label: 'Platform', href: '#platform' },
  { label: 'Process', href: '#process' },
  { label: 'Manufacturers', href: '#manufacturers' },
  { label: 'AI', href: '#ai' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference text-paper">
      <a href="#top" className="font-display text-xl tracking-tightest">
        LOOMFORGE
      </a>

      <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="/login"
        className="font-mono text-[11px] uppercase tracking-widest2 opacity-80 hover:opacity-100 transition-opacity"
      >
        Login
      </a>
    </header>
  );
}