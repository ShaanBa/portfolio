import React from 'react';
import { ExperienceSchema, type Experience } from '../content.config';

export interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  if (!experience) return null;
  const result = ExperienceSchema.safeParse(experience);
  if (!result.success) return null;

  const { company, role, location, period, highlights } = result.data;

  return (
    <div className="tl-row">
      <div className="when font-mono">
        <div className="period font-mono">{period}</div>
        <div className="loc font-mono">{location}</div>
      </div>
      <div className="tl-content">
        <h3>{role} &middot; <span className="company">{company}</span></h3>
        <div className="highlights font-sans">
          {highlights.map((item: string, idx: number) => (
            <p key={idx} className="highlight-text">&bull; {item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
