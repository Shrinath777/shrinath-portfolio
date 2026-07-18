import React from 'react';
import { FiBook, FiCpu, FiTarget, FiZap } from 'react-icons/fi';

function About() {
  return (
    <section id="about" className="section about-section">
      <h2 className="section-title animate-on-scroll">About Me</h2>

      <div className="about-container glass-card animate-on-scroll stagger-1">
        <div className="about-text">
          <p className="about-intro">
            I'm an Electronics and Communication Engineering student passionate about IoT, Embedded Systems, and Web Development. I enjoy building practical solutions that integrate hardware and software.
          </p>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-header">
                <FiBook className="about-icon" />
                <h3>Education</h3>
              </div>
              <p>Final-year Electronics and Communication Engineering student at RMK College of Engineering and Technology (2022–2026).</p>
            </div>

            <div className="about-card">
              <div className="about-card-header">
                <FiCpu className="about-icon" />
                <h3>Interests</h3>
              </div>
              <p>Designing PCBs, experimenting with ESP32 sensors, and building foundational Node.js backends that tie everything together.</p>
            </div>

            <div className="about-card">
              <div className="about-card-header">
                <FiTarget className="about-icon" />
                <h3>Career Goals</h3>
              </div>
              <p>Seeking roles where I can connect the physical world to the digital, utilizing my full-stack and hardware skills to build impactful products.</p>
            </div>

            <div className="about-card">
              <div className="about-card-header">
                <FiZap className="about-icon" />
                <h3>Strengths</h3>
              </div>
              <p>Hands-on hardware prototyping, full-loop development from sensor to dashboard, and rapid learning through competitive hackathons (SIH 2025 Finalist).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
