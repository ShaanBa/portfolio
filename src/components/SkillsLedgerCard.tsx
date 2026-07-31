import React from 'react';
import { SkillTreeSchema, type SkillTree, type SkillCategory } from '../content.config';

export interface SkillsLedgerCardProps {
  skills: SkillTree;
}

export const SkillsLedgerCard: React.FC<SkillsLedgerCardProps> = ({ skills }) => {
  const validated = SkillTreeSchema.parse(skills);

  const rows: SkillTree[] = [];
  for (let i = 0; i < validated.length; i += 2) {
    rows.push(validated.slice(i, i + 2));
  }

  return (
    <div className="skills-wrapper">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="grid-2">
          {row.map((cat: SkillCategory, cIdx: number) => (
            <div key={cat.category || cIdx} className="skill-cell">
              <div className="field-label font-mono">{cat.category}</div>
              <div className="pill-row">
                {cat.skills.map((skill: string, sIdx: number) => (
                  <div key={sIdx} className="pill on">{skill}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillsLedgerCard;
