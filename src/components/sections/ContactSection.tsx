export function ContactSection() {
  return (
    <section id="contact">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header-row">
          <span className="section-badge">V</span>
          <h2 className="section-header">SUMMONS</h2>
        </div>

        <hr className="gold-rule" />

        {/* Centered content */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          {/* Heading */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Let&rsquo;s Build Something.
          </h3>

          {/* Body paragraph */}
          <p
            className="body-text"
            style={{
              color: "var(--text-secondary)",
              marginBottom: 32,
            }}
          >
            I&rsquo;m open to backend and full-stack engineering opportunities,
            and I usually reply within a day.
          </p>

          {/* Button row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:shaanbawa6@gmail.com"
              className="btn-primary"
            >
              Email Me →
            </a>
            <a
              href="https://github.com/ShaanBa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View GitHub →
            </a>
          </div>
        </div>

        <hr className="gold-rule" />
      </div>
    </section>
  );
}

export default ContactSection;
