import type { Experience } from "../../content.config";

interface TimelineSectionProps {
  experiences: Experience[];
}

export function TimelineSection({ experiences }: TimelineSectionProps) {
  return (
    <section id="experience">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header-row">
          <span className="section-badge">IV</span>
          <h2 className="section-header">LINEAGE</h2>
        </div>

        <hr className="gold-rule" />

        {/* Timeline container */}
        <div
          style={{
            position: "relative",
            paddingLeft: 32,
          }}
        >
          {/* Vertical gold line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 16,
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border-brass)",
            }}
          />

          {/* Experience entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ position: "relative" }}>
                {/* Shield marker — diamond rotated 45deg on the timeline line */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: -32 + 16 - 5, // center on the line: -paddingLeft + lineLeft - half-size
                    top: 4,
                    width: 10,
                    height: 10,
                    background: "var(--accent-brass)",
                    transform: "rotate(45deg)",
                  }}
                />

                {/* Grid: date column | content column */}
                <div className="timeline-entry-grid">
                  {/* Date column */}
                  <div
                    className="field-label"
                    style={{
                      color: "var(--accent-brass)",
                      paddingTop: 2,
                    }}
                  >
                    {exp.period}
                  </div>

                  {/* Content column */}
                  <div>
                    {/* Role title */}
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: 17,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {exp.role}
                    </div>

                    {/* Company name */}
                    <div
                      className="field-label"
                      style={{ marginTop: 4, marginBottom: 12 }}
                    >
                      {exp.company} · {exp.location}
                    </div>

                    {/* Highlights */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {exp.highlights.map((hl, i) => (
                        <li
                          key={i}
                          className="body-text"
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: 14,
                            lineHeight: 1.7,
                            paddingLeft: 16,
                            position: "relative",
                            marginBottom: i < exp.highlights.length - 1 ? 6 : 0,
                          }}
                        >
                          {/* Bullet mark */}
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.55em",
                              width: 4,
                              height: 4,
                              background: "var(--accent-brass-dim)",
                              transform: "rotate(45deg)",
                            }}
                          />
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline responsive styles */}
        <style>{`
          .timeline-entry-grid {
            display: grid;
            grid-template-columns: 140px 1fr;
            gap: 0 24px;
          }
          @media (max-width: 768px) {
            .timeline-entry-grid {
              grid-template-columns: 1fr;
              gap: 4px 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export default TimelineSection;
