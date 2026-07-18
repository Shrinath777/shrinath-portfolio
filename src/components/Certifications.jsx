import React, { useState } from 'react';
import { FiAward, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const certifications = [
  { name: 'Introduction to Internet of Things', issuer: 'NPTEL (IIT Kharagpur)', score: '83%', file: '/assets/certs/nptel-iot.pdf' },
  { name: 'Programming In Java', issuer: 'NPTEL', score: null, file: '/assets/certs/nptel-java.pdf' },
  { name: 'Operating System Fundamentals', issuer: 'NPTEL', score: null, file: '/assets/certs/nptel-os.pdf' },
  { name: 'Web Development', issuer: 'Online Certification', score: null, file: '/assets/certs/web-dev.pdf' },
  { name: 'IoT Internship Certificate', issuer: 'NSIC', score: null, file: '/assets/certs/nsic-internship.pdf' },
  { name: 'Altruisty Certificate', issuer: 'Altruisty', score: null, file: '/assets/certs/altruisty.pdf' },
  { name: 'AMCAT Spoken English', issuer: 'AMCAT', score: null, file: '/assets/certs/amcat-spoken.pdf' },
];

function Certifications() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(certifications.length - 1, c + 1));

  return (
    <section id="certifications" className="section certifications-section">
      <h2 className="section-title animate-on-scroll">Certifications</h2>

      <div className="carousel-container animate-on-scroll stagger-1">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {certifications.map((cert) => (
            <div key={cert.name} className="carousel-slide">
              <div className="cert-card">
                <FiAward className="cert-icon" />
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.score && <span className="cert-score">SCORE: {cert.score}</span>}
                {cert.file && (
                  <a href={cert.file} target="_blank" rel="noopener noreferrer" className="cert-link">
                    <FiExternalLink /> View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prev} disabled={current === 0}>
            <FiChevronLeft /> PREV
          </button>
          <div className="carousel-dots">
            {certifications.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
          <button className="carousel-btn" onClick={next} disabled={current === certifications.length - 1}>
            NEXT <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
