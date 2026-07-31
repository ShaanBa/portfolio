import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.url(),
    summary: z.string().max(200),
    techStack: z.array(z.string()),
    designChoices: z.array(z.string()),
    githubUrl: z.url().optional(),
    completionDate: z.string().optional(),
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