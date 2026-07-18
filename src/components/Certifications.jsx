import React from 'react';
import { FiAward, FiExternalLink } from 'react-icons/fi';

const certifications = [
  {
    name: 'Introduction to Internet of Things',
    issuer: 'NPTEL (IIT Kharagpur)',
    score: '83%',
    file: '/assets/certs/nptel-iot.pdf',
  },
  {
    name: 'Programming In Java',
    issuer: 'NPTEL',
    score: null,
    file: '/assets/certs/nptel-java.pdf',
  },
  {
    name: 'Operating System Fundamentals',
    issuer: 'NPTEL',
    score: null,
    file: '/assets/certs/nptel-os.pdf',
  },
  {
    name: 'Web Development',
    issuer: 'Online Certification',
    score: null,
    file: '/assets/certs/web-dev.pdf',
  },
  {
    name: 'IoT Internship Certificate',
    issuer: 'NSIC',
    score: null,
    file: '/assets/certs/nsic-internship.pdf',
  },
  {
    name: 'Altruisty Certificate',
    issuer: 'Altruisty',
    score: null,
    file: '/assets/certs/altruisty.pdf',
  },
  {
    name: 'AMCAT Spoken English',
    issuer: 'AMCAT',
    score: null,
    file: '/assets/certs/amcat-spoken.pdf',
  },
];

function Certifications() {
  return (
    <section id="certifications" className="section certifications-section">
      <h2 className="section-title animate-on-scroll">Certifications</h2>

      <div className="certs-grid">
        {certifications.map((cert, i) => (
          <div key={cert.name} className={`cert-card glass-card animate-on-scroll stagger-${(i % 4) + 1}`}>
            <FiAward className="cert-icon" />
            <h3 className="cert-name">{cert.name}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            {cert.score && <span className="cert-score">{cert.score}</span>}
            {cert.file && (
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className="cert-link">
                <FiExternalLink /> View
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
