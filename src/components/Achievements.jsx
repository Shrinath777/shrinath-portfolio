import React, { useState } from 'react';
import { FiTrendingUp, FiFileText, FiStar, FiSun, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const achievements = [
  { icon: FiTrendingUp, title: 'Smart India Hackathon 2025 — Finalist', description: 'Reached the national finals of SIH 2025 with the Heritage Sentinel project.' },
  { icon: FiFileText, title: 'IEEE Research Paper', description: 'Published a research paper in IEEE on IoT-based environmental monitoring systems.' },
  { icon: FiStar, title: 'Google Buildathon Participant', description: 'Participated in Google Buildathon, building innovative solutions with cutting-edge tools.' },
  { icon: FiSun, title: 'Science Day Exhibition', description: 'Showcased the Dual Axis Solar Tracker project at the college Science Day Exhibition.' },
];

function Achievements() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(achievements.length - 1, c + 1));

  const item = achievements[current];
  const IconComponent = item.icon;

  return (
    <section id="achievements" className="section achievements-section">
      <h2 className="section-title animate-on-scroll">Achievements</h2>

      <div className="carousel-container animate-on-scroll stagger-1">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.title} className="carousel-slide">
                <div className="achievement-card">
                  <Icon className="achievement-icon" />
                  <h3 className="achievement-title">{ach.title}</h3>
                  <p className="achievement-desc">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prev} disabled={current === 0}>
            <FiChevronLeft /> PREV
          </button>
          <div className="carousel-dots">
            {achievements.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
          <button className="carousel-btn" onClick={next} disabled={current === achievements.length - 1}>
            NEXT <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
