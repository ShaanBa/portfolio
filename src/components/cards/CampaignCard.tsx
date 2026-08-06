import type { Project } from '../../content.config';

interface CampaignCardProps {
  project: Project;
  index: number;
}

export function CampaignCard({ project, index }: CampaignCardProps) {
  const hasCaseStudy = project.problem || project.approach || project.outcome;

  return (
    <>
      <div className="chronicle-card ornamental-corners" style={{ padding: '32px' }}>
        <p className="field-label" style={{ marginBottom: '10px' }}>
          Campaign {String(index + 1).padStart(2, '0')}
        </p>
        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {project.title}
        </h3>

        {/* Completion date badge */}
        {project.completionDate && (
          <p
            className="field-label"
            style={{ color: 'var(--accent-brass)', marginTop: '8px' }}
          >
            {project.completionDate}
          </p>
        )}

        {/* Summary */}
        <p
          className="body-text"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            marginTop: '16px',
          }}
        >
          {project.summary}
        </p>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="campaign-shots">
            {project.screenshots.map((shot) => (
              <figure key={shot.src} className="campaign-shot">
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                {shot.caption && (
                  <figcaption className="field-label">{shot.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Case Study Section */}
        {hasCaseStudy && (
          <div style={{ marginTop: '24px' }}>
            {project.problem && (
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-brass)' }}>
                <p className="field-label" style={{ marginBottom: '6px' }}>
                  THE PROBLEM
                </p>
                <p className="body-text" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {project.problem}
                </p>
              </div>
            )}

            {project.approach && (
              <div style={{ paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--border-brass)' }}>
                <p className="field-label" style={{ marginBottom: '6px' }}>
                  THE APPROACH
                </p>
                <p className="body-text" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {project.approach}
                </p>
              </div>
            )}

            {project.outcome && (
              <div style={{ paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--border-brass)' }}>
                <p className="field-label" style={{ marginBottom: '6px' }}>
                  THE OUTCOME
                </p>
                <p className="body-text" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {project.outcome}
                </p>
              </div>
            )}
          </div>
        )}

        {project.designChoices.length > 0 && (
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-brass)' }}>
            <p className="field-label" style={{ marginBottom: '12px' }}>
              KEY DECISIONS
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {project.designChoices.map((choice, choiceIndex) => (
                <li
                  key={choice}
                  className="body-text"
                  style={{
                    position: 'relative',
                    paddingLeft: 18,
                    marginBottom: choiceIndex < project.designChoices.length - 1 ? 10 : 0,
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.55em',
                      width: 4,
                      height: 4,
                      background: 'var(--accent-brass-dim)',
                      transform: 'rotate(45deg)',
                    }}
                  />
                  {choice}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '24px',
            }}
          >
            {project.techStack.map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}
        >
          <a
            className="btn-primary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.urlLabel ?? 'Live Demo'} →
          </a>
          {project.githubUrl && (
            <a
              className="btn-secondary"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code →
            </a>
          )}
          {project.devpostUrl && (
            <a
              className="btn-secondary"
              href={project.devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Devpost →
            </a>
          )}
          {project.demoVideoUrl && (
            <a
              className="btn-secondary"
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo Video →
            </a>
          )}
        </div>
      </div>

      {/* Gold rule divider outside the card */}
      <hr className="gold-rule" />
    </>
  );
}

export default CampaignCard;
