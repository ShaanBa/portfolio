import React from 'react';
import './styles/global.css';
import Hero from './components/Hero';
import ProjectLedgerCard from './components/ProjectLedgerCard';
import ExperienceCard from './components/ExperienceCard';
import SkillsBlock from './components/SkillsBlock';
import { type Project, type Experience, type SkillTree } from './content.config';

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

export const App: React.FC = () => {
  return (
    <div>
      {/* Nav Header */}
      <nav className="panel nav-bar">
        <div className="mark font-sans">Shaan Bawa</div>
        <div className="links font-sans">
          <a href="#hero">Hero</a>
          <span className="sep">&middot;</span>
          <a href="#about">About</a>
          <span className="sep">&middot;</span>
          <a href="#skills">Skills</a>
          <span className="sep">&middot;</span>
          <a href="#work">Projects</a>
          <span className="sep">&middot;</span>
          <a href="#experience">Timeline</a>
          <span className="sep">&middot;</span>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="wrap">
        {/* Hero */}
        <div id="hero">
          <Hero />
        </div>

        {/* Philosophy / About */}
        <div className="ledger-section" id="about">
          <div className="sec-title">
            <span className="idx font-mono">01</span>
            <h2 className="font-sans">Philosophy</h2>
          </div>
          <section className="panel">
            <div className="field-label font-mono">Backend Precision &amp; Operational Rigor</div>
            <div className="body-pad about">
              <div className="about-block">
                <h3 className="about-subtitle font-mono">Concurrency &amp; Architecture</h3>
                <p>
                  I gravitate toward backend systems — the places where two databases have to stay in sync, where a transaction either fully completes or doesn't happen at all. At Rock City Motel I built a booking engine where Postgres EXCLUDE constraints make double-bookings structurally impossible, not just unlikely.
                </p>
              </div>
              <div className="about-block">
                <h3 className="about-subtitle font-mono">Rigor Over Noise</h3>
                <p>
                  I'd rather get the foundation right than chase what's trendy — end-to-end TypeScript to catch errors before they hit runtime, and integrations, like routing motel payments straight through Stripe instead of a third-party OTA, that hold up because the plumbing underneath is solid.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Skills */}
        <div className="ledger-section" id="skills">
          <div className="sec-title">
            <span className="idx font-mono">02</span>
            <h2 className="font-sans">Capabilities</h2>
          </div>
          <div className="field-label font-mono">Stack &amp; Tools</div>
          <SkillsBlock skills={skills} />
        </div>

        {/* Projects */}
        <div className="ledger-section" id="work">
          <div className="sec-title">
            <span className="idx font-mono">03</span>
            <h2 className="font-sans">Selected Work</h2>
          </div>
          <div className="field-label font-mono">Project Ledger</div>
          <div className="projects-list">
            {projects.map((proj, idx) => (
              <ProjectLedgerCard key={proj.id || idx} project={proj} index={idx + 1} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="ledger-section" id="experience">
          <div className="sec-title">
            <span className="idx font-mono">04</span>
            <h2 className="font-sans">Chronology</h2>
          </div>
          <section className="panel">
            <div className="field-label font-mono">Experience</div>
            {experiences.map((exp, idx) => (
              <ExperienceCard key={exp.id || idx} experience={exp} />
            ))}
          </section>
        </div>

        {/* Contact */}
        <div className="ledger-section" id="contact">
          <div className="sec-title">
            <span className="idx font-mono">05</span>
            <h2 className="font-sans">Contact</h2>
          </div>
          <section className="panel contact-band">
            <div className="field-label font-mono">Get in Touch</div>
            <div className="body-pad contact-inner">
              <h2 className="font-sans">Let's Build Something.</h2>
              <p>
                I'm open to backend and full-stack engineering opportunities, and I usually reply within a day.
              </p>
              <div className="row">
                <a className="btn solid font-header" href="mailto:shaanbawa6@gmail.com">Email Me &rarr;</a>
                <a className="btn font-header" href="https://github.com/ShaanBa" target="_blank" rel="noopener noreferrer">View GitHub &rarr;</a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer>
        &copy; 2026 Shaan Bawa
      </footer>
    </div>
  );
};

export default App;
