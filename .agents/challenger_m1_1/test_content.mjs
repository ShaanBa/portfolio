import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string().max(200),
  techStack: z.array(z.string()),
  designChoices: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  completionDate: z.string().optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  period: z.string(),
  highlights: z.array(z.string()),
});

export const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const SkillTreeSchema = z.array(SkillCategorySchema);

console.log("=== Testing Project Collection Files ===");
const projectsDir = '/Users/shaanbawa/portfoliio/src/content/projects';
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));

let projectErrors = 0;
for (const file of projectFiles) {
  const filePath = path.join(projectsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const res = ProjectSchema.safeParse(data);
  if (!res.success) {
    console.error(`FAIL: ${file}:`, res.error.format());
    projectErrors++;
  } else {
    console.log(`PASS: ${file} (id: ${res.data.id}, title: ${res.data.title})`);
  }
}

console.log("\n=== Testing Experience Collection Files ===");
const expDir = '/Users/shaanbawa/portfoliio/src/content/experience';
const expFiles = fs.readdirSync(expDir).filter(f => f.endsWith('.json'));

let expErrors = 0;
for (const file of expFiles) {
  const filePath = path.join(expDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const res = ExperienceSchema.safeParse(data);
  if (!res.success) {
    console.error(`FAIL: ${file}:`, res.error.format());
    expErrors++;
  } else {
    console.log(`PASS: ${file} (id: ${res.data.id})`);
  }
}

console.log("\n=== Testing Skills Collection Files ===");
const skillsDir = '/Users/shaanbawa/portfoliio/src/content/skills';
const skillsFiles = fs.readdirSync(skillsDir).filter(f => f.endsWith('.json'));

let skillsErrors = 0;
for (const file of skillsFiles) {
  const filePath = path.join(skillsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const res = SkillTreeSchema.safeParse(data);
  if (!res.success) {
    console.error(`FAIL: ${file}:`, res.error.format());
    skillsErrors++;
  } else {
    console.log(`PASS: ${file} (${res.data.length} categories)`);
  }
}

console.log("\nSummary of schema verification:");
console.log(`Project Errors: ${projectErrors}`);
console.log(`Experience Errors: ${expErrors}`);
console.log(`Skills Errors: ${skillsErrors}`);
