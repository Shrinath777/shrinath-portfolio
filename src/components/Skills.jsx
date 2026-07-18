import React from 'react';
import { FiCode, FiLayout, FiServer, FiDatabase, FiCpu, FiTool } from 'react-icons/fi';

const skillCategories = [
  {
    name: 'Programming',
    icon: FiCode,
    skills: ['C', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    name: 'Frontend',
    icon: FiLayout,
    skills: ['React', 'Bootstrap', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Backend',
    icon: FiServer,
    skills: ['Node.js', 'Express.js', 'REST API', 'FastAPI'],
  },
  {
    name: 'Database',
    icon: FiDatabase,
    skills: ['MongoDB', 'Firebase', 'Supabase', 'MySQL'],
  },
  {
    name: 'Embedded & IoT',
    icon: FiCpu,
    skills: ['ESP32', 'Arduino', 'Sensors & Actuators', 'PCB Design (KiCad)', 'ThingsBoard'],
  },
  {
    name: 'Tools',
    icon: FiTool,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Wokwi', 'Arduino IDE'],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title animate-on-scroll">Skills &amp; Tools</h2>

      <div className="skills-grid">
        {skillCategories.map((category, i) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.name}
              className={`skill-category glass-card animate-on-scroll stagger-${i + 1}`}
            >
              <div className="skill-category-header">
                <IconComponent className="skill-category-icon" />
                <h3 className="skill-category-name">{category.name}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-item">
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
