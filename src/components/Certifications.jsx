import React from 'react';
import { FiExternalLink, FiCalendar, FiStar, FiCheckCircle, FiImage } from 'react-icons/fi';

const certifications = [
  {
    id: 1,
    name: 'Introduction to Internet of Things',
    issuer: 'NPTEL – IIT Kharagpur',
    instructor: 'Prof. Haimanti Banerji',
    score: '83%',
    grade: 'Elite',
    period: 'Jul – Oct 2024',
    color: '#8b5cf6',
    gradientFrom: '#8b5cf6',
    gradientTo: '#a78bfa',
    icon: '📡',
    file: '/assets/certs/nptel-iot.pdf',
    fileType: 'pdf',
    tags: ['IoT', 'NPTEL'],
    isElite: true,
  },
  {
    id: 2,
    name: 'Programming in Java',
    issuer: 'NPTEL – IIT Kharagpur',
    instructor: 'Prof. Debasis Samanta',
    score: '55%',
    grade: 'Certified',
    period: 'Jan – Apr 2024',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#fbbf24',
    icon: '☕',
    file: '/assets/certs/nptel-java.pdf',
    fileType: 'pdf',
    tags: ['Java', 'NPTEL'],
    isElite: false,
  },
  {
    id: 3,
    name: 'Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    instructor: 'Dr. Angela Yu',
    score: null,
    grade: '61.5 hrs',
    period: 'Feb 2025',
    color: '#06b6d4',
    gradientFrom: '#0891b2',
    gradientTo: '#06b6d4',
    icon: '🌐',
    file: '/assets/certs/web-dev.pdf',
    fileType: 'pdf',
    tags: ['Full-Stack', 'PERN Stack'],
    isElite: false,
  },
  {
    id: 4,
    name: 'VLSI Design & Industrial Applications',
    issuer: 'NSIC – Govt. of India',
    instructor: 'NSIC Technical Services Centre, Guindy, Chennai',
    score: null,
    grade: 'Internship',
    period: '25 Jul – 02 Aug 2023',
    color: '#10b981',
    gradientFrom: '#059669',
    gradientTo: '#10b981',
    icon: '⚡',
    file: '/assets/certs/vlsi-nsic.jpg',
    fileType: 'image',
    tags: ['VLSI', 'Hardware'],
    isElite: false,
  },
  {
    id: 5,
    name: 'Tamil Nadu Smart Manufacturing Centre',
    issuer: 'TIDCO / TANSAM × SIEMENS',
    instructor: 'Digital Technologies Division',
    score: null,
    grade: 'Industrial Visit',
    period: 'Jul 2025',
    color: '#0ea5e9',
    gradientFrom: '#0284c7',
    gradientTo: '#0ea5e9',
    icon: '🏭',
    file: null,
    fileType: null,
    tags: ['Industry 4.0', 'SIEMENS'],
    isElite: false,
  },
  {
    id: 6,
    name: 'AICTE Idea Lab – Skill Development',
    issuer: 'RMK College of Engineering & Technology',
    instructor: 'Experimental & Collaborative Learning',
    score: null,
    grade: 'Participation',
    period: 'Jun 2023',
    color: '#ec4899',
    gradientFrom: '#db2777',
    gradientTo: '#ec4899',
    icon: '💡',
    file: null,
    fileType: null,
    tags: ['AICTE', 'Innovation'],
    isElite: false,
  },
];

function ScoreRing({ score }) {
  const pct = parseInt(score);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="cert-score-ring">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke="white" strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="cert-score-text">{score}</div>
    </div>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section certifications-section">
      <h2 className="section-title animate-on-scroll">
        <span className="pixel-accent">BADGE VAULT</span>
        Certifications
      </h2>
      <p className="section-subtitle animate-on-scroll">
        Credentials earned from NPTEL, Udemy, and industry programmes.
      </p>

      <div className="certs-cards-grid animate-on-scroll">
        {certifications.map((cert, i) => (
          <div
            key={cert.id}
            className={`cert-card-new stagger-${(i % 4) + 1}`}
            style={{
              '--cc-color': cert.color,
              '--cc-from': cert.gradientFrom,
              '--cc-to': cert.gradientTo,
            }}
          >
            {/* Gradient header */}
            <div className="cert-card-header">
              <div className="cert-card-circle cert-card-circle--1" />
              <div className="cert-card-circle cert-card-circle--2" />

              <div className="cert-card-top-row">
                <span className="cert-card-num">0{i + 1}</span>
                {cert.isElite && (
                  <span className="cert-elite-badge">
                    <FiStar size={10} /> ELITE
                  </span>
                )}
              </div>

              <div className="cert-card-emoji">{cert.icon}</div>

              {cert.score ? (
                <ScoreRing score={cert.score} />
              ) : (
                <div className="cert-grade-pill">
                  <FiCheckCircle size={12} />
                  {cert.grade}
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="cert-card-body">
              <div className="cert-card-tags">
                {cert.tags.map(t => (
                  <span key={t} className="cert-card-tag">{t}</span>
                ))}
              </div>

              <h3 className="cert-card-name">{cert.name}</h3>
              <p className="cert-card-issuer">{cert.issuer}</p>
              <p className="cert-card-instructor">by {cert.instructor}</p>

              <div className="cert-card-divider" />

              <div className="cert-card-footer">
                <div className="cert-card-period">
                  <FiCalendar size={12} />
                  {cert.period}
                </div>
                {cert.file && (
                  cert.fileType === 'image' ? (
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card-link"
                    >
                      <FiImage size={13} />
                      View
                    </a>
                  ) : (
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card-link"
                    >
                      <FiExternalLink size={13} />
                      View
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
