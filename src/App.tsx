import './styles/global.css';
import Nav from './components/layout/Nav';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import EducationSection from './components/sections/EducationSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import TimelineSection from './components/sections/TimelineSection';
import ContactSection from './components/sections/ContactSection';
import { type Project, type Experience, type SkillTree } from './content.config';
import { useScrollAnimation } from './hooks/useScrollAnimation';

import betOnMeData from './content/projects/bet-on-me.json';
import rockCityPmsData from './content/projects/rock-city-pms.json';
import sopranosData from './content/projects/sopranos-syndicate-tracker.json';
import uniLeagueData from './content/projects/uni-league.json';

import sweInternData from './content/experience/rock-city-swe-intern.json';
import opsLeadData from './content/experience/rock-city-ops-lead.json';
import opsAssociateData from './content/experience/rock-city-ops-associate.json';

import rawSkillsData from './content/skills/skills.json';

const projects: Project[] = [
  betOnMeData as Project,
  rockCityPmsData as Project,
  sopranosData as Project,
  uniLeagueData as Project,
];

const experiences: Experience[] = [
  sweInternData as Experience,
  opsLeadData as Experience,
  opsAssociateData as Experience,
];

const skills: SkillTree = rawSkillsData as SkillTree;

export const App = () => {
  useScrollAnimation();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <EducationSection />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <TimelineSection experiences={experiences} />
        <ContactSection />
      </main>
      <footer>
        <span>Recorded in 2026 by Shaan Bawa</span>
        <span aria-hidden="true"> · </span>
        <a href="#hero">Return to the sigil ↑</a>
      </footer>
    </>
  );
};

export default App;
