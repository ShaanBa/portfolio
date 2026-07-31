import React from 'react';
import { SkillTreeSchema, type SkillTree, type SkillCategory } from '../../content.config';

export interface SkillsBlockProps {
  skills: SkillTree;
}

export const SkillsBlock: React.FC<SkillsBlockProps> = ({ skills }) => {
  const validated = SkillTreeSchema.parse(skills);

  // Chunk into pairs of 2 for grid-2 rows
  const rows: SkillTree[] = [];
  for (let i = 0; i < validated.length; i += 2) {
    rows.push(validated.slice(i, i + 2));
  }

  return (
    <div className="skills-wrapper panel">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="grid-2">
          {row.map((cat: SkillCategory, cIdx: number) => (
            <div key={cat.category || cIdx} className="skill-cell">
              <div className="field-label font-mono">{cat.category}</div>
              <div className="pill-row font-mono">
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

export default SkillsBlock;
