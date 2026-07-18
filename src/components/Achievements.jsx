import React from 'react';
import { FiTrendingUp, FiFileText, FiStar, FiSun } from 'react-icons/fi';

const achievements = [
  {
    icon: FiTrendingUp,
    title: 'Smart India Hackathon 2025 — Finalist',
    description: 'Reached the national finals of SIH 2025 with the Heritage Sentinel project.',
  },
  {
    icon: FiFileText,
    title: 'IEEE Research Paper',
    description: 'Published a research paper in IEEE on IoT-based environmental monitoring systems.',
  },
  {
    icon: FiStar,
    title: 'Google Buildathon Participant',
    description: 'Participated in Google Buildathon, building innovative solutions with cutting-edge tools.',
  },
  {
    icon: FiSun,
    title: 'Science Day Exhibition',
    description: 'Showcased the Dual Axis Solar Tracker project at the college Science Day Exhibition.',
  },
];

function Achievements() {
  return (
    <section id="achievements" className="section achievements-section">
      <h2 className="section-title animate-on-scroll">Achievements</h2>

      <div className="achievements-grid">
        {achievements.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div key={item.title} className={`achievement-card glass-card animate-on-scroll stagger-${i + 1}`}>
              <IconComponent className="achievement-icon" />
              <h3 className="achievement-title">{item.title}</h3>
              <p className="achievement-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Achievements;
