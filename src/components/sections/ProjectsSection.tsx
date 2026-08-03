import type { Project } from '../../content.config';
import CampaignCard from '../cards/CampaignCard';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row">
          <span className="section-badge">IV</span>
          <h2 className="section-header">CAMPAIGNS</h2>
        </div>

        <hr className="gold-rule" />

        {/* Project Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {projects.map((project, index) => (
            <CampaignCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
