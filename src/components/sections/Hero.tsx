import React from 'react';
import resumeUrl from '../../content/Shaan Bawa Master Resume.pdf?url';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero noise-overlay"
    >
      <div className="wrap hero-frame ornamental-corners">
        {/* Display title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            lineHeight: 1,
            color: 'var(--text-primary)',
            margin: '0 0 24px 0',
          }}
        >
          Shaan Bawa
        </h1>

        {/* Subtitle */}
        <p
          className="body-text"
          style={{
            maxWidth: '600px',
            marginBottom: '24px',
            color: 'var(--text-secondary)',
            fontSize: '18px',
            lineHeight: 1.7,
          }}
        >
          Full-stack engineer and backend systems thinker. I build reliable
          infrastructure where correctness is designed in—not patched on.
        </p>

        {/* Status badge */}
        <p
          className="field-label"
          style={{
            color: 'var(--accent-verdant)',
            marginBottom: '40px',
          }}
        >
          Available for Hire · 2026
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <a href="#projects" className="btn-primary">
            View Campaigns →
          </a>
          <a
            href="https://github.com/ShaanBa"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={resumeUrl} className="btn-secondary" download>
            Résumé
          </a>
        </div>

        {/* Gold rule divider */}
        <hr className="gold-rule" />
      </div>
    </section>
  );
};

export { Hero };
export default Hero;
