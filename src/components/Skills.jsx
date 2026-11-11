import React from 'react';
import { FiCode, FiCpu, FiDatabase, FiLayers, FiTool } from 'react-icons/fi';

const skillCategories = [
  {
    id: 'languages',
    name: 'Languages',
    icon: FiCode,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.25)',
    skills: ['JavaScript', 'Python', 'C / C++', 'Java', 'HTML5', 'CSS3'],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    icon: FiLayers,
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.25)',
    skills: ['Node.js', 'Express.js', 'React', 'React Native', 'Bootstrap', 'FastAPI'],
  },
  {
    id: 'iot',
    name: 'IoT & Embedded',
    icon: FiCpu,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)',
    skills: ['ESP32', 'Arduino', 'Sensors & Actuators', 'PCB Design (KiCad)', 'VLSI Design', 'ModelSim'],
  },
  {
    id: 'databases',
    name: 'Databases & Cloud',
    icon: FiDatabase,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.25)',
    skills: ['MongoDB Atlas', 'MySQL', 'Supabase', 'Firebase', 'ThingsBoard', 'REST APIs'],
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    icon: FiTool,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.08)',
    border: 'rgba(236, 72, 153, 0.25)',
    skills: ['GitHub', 'VS Code', 'Postman', 'Figma', 'Vercel', 'Socket.IO'],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title animate-on-scroll">Skills &amp; Tools</h2>
      <p className="section-subtitle animate-on-scroll">
        Hover any category to see the full list.
      </p>

      <div className="skills-accordion animate-on-scroll">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="skill-row"
              style={{
                '--sk-color': cat.color,
                '--sk-bg': cat.bg,
                '--sk-border': cat.border,
              }}
            >
              {/* Always-visible heading */}
              <div className="skill-row-header">
                <div className="skill-row-left">
                  <span className="skill-row-num">0{i + 1}</span>
                  <div className="skill-row-icon">
                    <Icon />
                  </div>
                  <h3 className="skill-row-name">{cat.name}</h3>
                </div>
                <div className="skill-row-right">
                  <span className="skill-row-count">{cat.skills.length} skills</span>
                  <span className="skill-row-arrow">→</span>
                </div>
              </div>

              {/* Skills — revealed on hover */}
              <div className="skill-row-pills">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
