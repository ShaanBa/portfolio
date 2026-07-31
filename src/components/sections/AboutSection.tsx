export function AboutSection() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-header-row">
          <span className="section-badge">I</span>
          <h2 className="section-header">TENETS</h2>
        </div>

        <hr className="gold-rule" />

        <div className="tenets-grid">
          <div>
            <p className="field-label" style={{ marginBottom: 12 }}>
              CORRECTNESS BY DESIGN
            </p>
            <p className="body-text drop-cap">
              I gravitate toward backend systems — the places where two
              databases have to stay in sync, where a transaction either fully
              completes or doesn't happen at all. At Rock City Motel I built a
              booking engine where Postgres EXCLUDE constraints make
              double-bookings structurally impossible, not just unlikely.
            </p>
          </div>
          <div>
            <p className="field-label" style={{ marginBottom: 12 }}>
              RIGOR OVER NOISE
            </p>
            <p className="body-text">
              I'd rather get the foundation right than chase what's trendy —
              end-to-end TypeScript to catch errors before they hit runtime,
              and integrations like routing motel payments straight through
              Stripe instead of a third-party OTA, built on plumbing that holds
              up under real use.
            </p>
          </div>
        </div>

        <hr className="gold-rule" />
      </div>
    </section>
  );
}

export default AboutSection;
