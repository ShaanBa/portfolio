import React from 'react';
import { ProjectSchema, type Project } from '../../content.config';

export interface ProjectLedgerCardProps {
  project: Project;
  index?: number;
}

export const ProjectLedgerCard: React.FC<ProjectLedgerCardProps> = ({ project, index = 1 }) => {
  const validated = ProjectSchema.parse(project);
  const { title, category = "Project Ledger", summary, designChoices = [], techStack = [], url, githubUrl } = validated;
  const displayIndex = String(index).padStart(2, '0');

  return (
    <article className="project-ledger-card panel">
      <header className="card-strip">
        <span className="strip-label font-mono">{displayIndex}&nbsp;&nbsp;{category}</span>
      </header>

      <div className="card-main">
        <div className="card-title-row">
          <h3 className="project-title">{title}</h3>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="visit-link" aria-label={`Visit ${title}`}>
              &#8599;
            </a>
          )}
        </div>

        <div className="summary-field">
          <p className="project-summary">{summary}</p>
        </div>

        {designChoices && designChoices.length > 0 && (
          <div className="bullet-ledger">
            {designChoices.map((item: string, bIdx: number) => (
              <div key={bIdx} className="rationale-item font-sans">
                <span className="item-index font-mono">0{bIdx + 1}</span>
                <span className="item-text">{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="tech-stack-row">
          {techStack.map((tech: string, tIdx: number) => (
            <span key={tIdx} className="pill font-mono">{tech}</span>
          ))}
        </div>
      </div>

      {(url || githubUrl) && (
        <footer className="card-actions">
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="action-primary">View Project &rarr;</a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="action-secondary">Source Code &rarr;</a>
          )}
        </footer>
      )}
    </article>
  );
};

export default ProjectLedgerCard;
