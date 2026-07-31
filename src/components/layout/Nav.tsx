import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'Tenets' },
  { href: '#skills', label: 'Arsenal' },
  { href: '#projects', label: 'Campaigns' },
  { href: '#experience', label: 'Lineage' },
  { href: '#contact', label: 'Summons' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  return (
    <nav aria-label="Primary navigation">
      <div className="nav-inner">
        <a className="mark" href="#hero" aria-label="Shaan Bawa, home">
          SB <span className="nav-mark-rule" aria-hidden="true" /> Chronicle
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Index'}
        </button>
        <div id="primary-links" className={`links${open ? ' is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
