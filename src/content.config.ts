import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  urlLabel: z.string().optional(),
  summary: z.string().max(300),
  problem: z.string().optional(),
  approach: z.string().optional(),
  outcome: z.string().optional(),
  techStack: z.array(z.string()),
  designChoices: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  devpostUrl: z.string().url().optional(),
  completionDate: z.string().optional(),
  category: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  period: z.string(),
  highlights: z.array(z.string()),
});

export type Experience = z.infer<typeof ExperienceSchema>;

export const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const SkillTreeSchema = z.array(SkillCategorySchema);

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillTree = z.infer<typeof SkillTreeSchema>;
