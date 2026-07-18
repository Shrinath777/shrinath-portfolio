import React from 'react';
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

function Education() {
  return (
    <section id="education" className="section education-section">
      <h2 className="section-title animate-on-scroll">Education</h2>

      <div className="education-card glass-card animate-on-scroll stagger-1">
        <div className="education-icon-wrap">
          <FiAward className="education-main-icon" />
        </div>
        <div className="education-info">
          <h3 className="education-degree">Bachelor of Engineering</h3>
          <p className="education-branch">Electronics & Communication Engineering</p>
          <p className="education-college">
            <FiMapPin className="education-inline-icon" /> RMK College of Engineering and Technology, Chennai
          </p>
          <p className="education-year">
            <FiCalendar className="education-inline-icon" /> 2022 – 2026
          </p>
        </div>
      </div>
    </section>
  );
}

export default Education;
