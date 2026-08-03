import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'Tenets' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Arsenal' },
  { href: '#projects', label: 'Campaigns' },
  { href: '#experience', label: 'Lineage' },
  { href: '#contact', label: 'Summons' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('resize', closeMenu);
    window.addEventListener('keydown', closeOnEscape);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-25% 0px -60%', threshold: [0, 0.1, 0.5] },
    );

    links.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('resize', closeMenu);
      window.removeEventListener('keydown', closeOnEscape);
      observer.disconnect();
    };
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
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'active' : undefined}
              aria-current={activeSection === link.href ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
