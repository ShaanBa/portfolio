import type { SkillTree } from '../../content.config';

interface SkillsSectionProps {
  skills: SkillTree;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-header-row">
          <span className="section-badge">III</span>
          <h2 className="section-header">ARSENAL</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="chronicle-card ornamental-corners"
              style={{ padding: 24 }}
            >
              <p className="field-label" style={{ marginBottom: 16 }}>
                {cat.category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
