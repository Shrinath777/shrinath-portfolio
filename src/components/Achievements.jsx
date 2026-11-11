import React from 'react';
import { FiTrendingUp, FiFileText, FiStar, FiSun, FiAward, FiCode } from 'react-icons/fi';

const achievements = [
  {
    icon: FiTrendingUp,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.2)',
    badge: '🏆 FINALIST',
    title: 'Smart India Hackathon 2025',
    org: 'Ministry of Education, India',
    year: '2025',
    description: 'Reached the national finals among 1000+ teams with the Heritage Sentinel IoT monitoring project.',
    size: 'large',
  },
  {
    icon: FiCode,
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.2)',
    badge: '🥇 1ST PLACE',
    title: 'Solar Tracker – Eco-Dirt Club',
    org: 'RMK College of Engineering & Technology',
    year: '2023',
    description: 'Won 1st Place in the IDEA contest (Solar Tracker theme) by the Eco-Dirt Club.',
    size: 'normal',
  },
  {
    icon: FiAward,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
    badge: '🥇 1ST PLACE',
    title: 'Workspace – Coding Club',
    org: 'RMK College of Engineering & Technology',
    year: '2023',
    description: 'Secured 1st Place in Intradepartmental Coding Club Competition with the Workspace platform.',
    size: 'normal',
  },
  {
    icon: FiStar,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.08)',
    border: 'rgba(236, 72, 153, 0.2)',
    badge: '⚡ PARTICIPANT',
    title: 'Google Buildathon',
    org: 'Google',
    year: '2024',
    description: 'Participated in Google Buildathon — a 24-hour intensive web development challenge.',
    size: 'normal',
  },
  {
    icon: FiFileText,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.2)',
    badge: '✅ SELECTED',
    title: 'Altruisty Skill Hunt Challenge',
    org: 'Altruisty',
    year: '2024',
    description: 'Selected participant in the Design Division of Altruisty Skill Hunt Challenge.',
    size: 'normal',
  },
  {
    icon: FiSun,
    color: '#0ea5e9',
    bg: 'rgba(14, 165, 233, 0.08)',
    border: 'rgba(14, 165, 233, 0.2)',
    badge: '🔬 EXHIBITOR',
    title: 'National Science Day Exhibition',
    org: 'RMK College of Engineering & Technology',
    year: '2023',
    description: 'Exhibited Dual-Axis Solar Tracker at National Science Day 2023 organised by Science Club.',
    size: 'normal',
  },
  {
    icon: FiAward,
    color: '#ff6b6b',
    bg: 'rgba(255, 107, 107, 0.08)',
    border: 'rgba(255, 107, 107, 0.2)',
    badge: '🎖 APPRECIATION',
    title: "REVIL'23 – National Technical Symposium",
    org: 'Chennai Institute of Technology',
    year: '2023',
    description: "Certificate of Appreciation for Paper Presentation at National Level Technical Symposium REVIL'23.",
    size: 'large',
  },
];

function Achievements() {
  return (
    <section id="achievements" className="section achievements-section">
      <h2 className="section-title animate-on-scroll">
        <span className="pixel-accent">HALL OF FAME</span>
        Achievements
      </h2>
      <p className="section-subtitle animate-on-scroll">
        Milestones earned through competition, creativity, and code.
      </p>

      <div className="ach-grid animate-on-scroll">
        {achievements.map((ach, i) => {
          const Icon = ach.icon;
          return (
            <div
              key={ach.title}
              className={`ach-item${ach.size === 'large' ? ' ach-item--large' : ''} stagger-${(i % 4) + 1}`}
              style={{
                '--ach-color': ach.color,
                '--ach-bg': ach.bg,
                '--ach-border': ach.border,
              }}
            >
              <div className="ach-item-top">
                <div className="ach-item-icon">
                  <Icon />
                </div>
                <div className="ach-item-meta">
                  <span className="ach-item-badge">{ach.badge}</span>
                  <span className="ach-item-year">{ach.year}</span>
                </div>
              </div>
              <h3 className="ach-item-title">{ach.title}</h3>
              <p className="ach-item-org">{ach.org}</p>
              <p className="ach-item-desc">{ach.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Achievements;
