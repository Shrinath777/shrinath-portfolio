import React from 'react';
import { FiBook, FiCpu, FiTarget, FiZap, FiAward, FiMapPin } from 'react-icons/fi';

const stats = [
  { value: '7.85', label: 'CGPA', icon: '🎓' },
  { value: '2', label: 'Internships', icon: '💼' },
  { value: '6+', label: 'Projects', icon: '🚀' },
  { value: '7', label: 'Achievements', icon: '🏆' },
];

function About() {
  return (
    <section id="about" className="section about-section">
      <h2 className="section-title animate-on-scroll">About Me</h2>

      <div className="about-container animate-on-scroll stagger-1">
        {/* Intro banner */}
        <p className="about-intro">
          Electronics and Communication Engineering undergraduate specializing in IoT systems,
          embedded hardware, and full-stack web development. Experienced in building real-time
          sensor-based systems, REST APIs, and data visualization dashboards — with strong
          hands-on exposure through internships, hackathons, and production-level projects.
        </p>

        {/* Quick stats */}
        <div className="about-stats">
          {stats.map(s => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-icon">{s.icon}</span>
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-header">
              <FiBook className="about-icon" />
              <h3>Education</h3>
            </div>
            <p>
              <strong>B.E. Electronics & Communication (CGPA 7.85)</strong><br />
              RMK College of Engineering &amp; Technology, Chennai<br />
              <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>2022 – 2026</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <strong>HSC – 87.5%</strong><br />
              Elite Matriculation Higher Secondary School<br />
              <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>2021 – 2022</span>
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-header">
              <FiMapPin className="about-icon" />
              <h3>Location &amp; Availability</h3>
            </div>
            <p>Based in <strong>Chennai, Tamil Nadu, India</strong>.</p>
            <p style={{ marginTop: '8px' }}>
              Open to <strong>full-time roles</strong>, internships, freelance
              projects, and research collaborations in IoT, embedded systems,
              or full-stack development.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-header">
              <FiCpu className="about-icon" />
              <h3>Technical Interests</h3>
            </div>
            <p>
              Designing custom PCBs, experimenting with ESP32 sensor networks,
              building Node.js/FastAPI backends, and connecting the physical world
              to cloud dashboards via MQTT and REST APIs.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-header">
              <FiZap className="about-icon" />
              <h3>Strengths</h3>
            </div>
            <p>
              Full-loop development from sensor to dashboard, rapid prototyping,
              competitive problem-solving (SIH 2025 Finalist), and strong
              cross-domain skills bridging hardware and software.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
