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
              BUSINESS CONTEXT
            </p>
            <p className="body-text drop-cap">
              Working at my family&rsquo;s motel gave me direct experience with
              the decisions behind a small business. I handled reservations,
              payments, guest requests, and the daily operational tradeoffs
              that software is supposed to support. It taught me to understand
              the business problem before deciding what to build.
            </p>
          </div>
          <div>
            <p className="field-label" style={{ marginBottom: 12 }}>
              TECHNICAL EXECUTION
            </p>
            <p className="body-text">
              This summer, I turned that operational knowledge into an
              end-to-end direct-booking platform and property management
              system. Because I also worked on site, I could translate real
              workflows into technical decisions, ship changes around staff
              and guest needs, and evaluate the result in a live business. That
              combination of business judgment and backend engineering is what
              I bring to a team.
            </p>
          </div>
        </div>

        <hr className="gold-rule" />
      </div>
    </section>
  );
}

export default AboutSection;
