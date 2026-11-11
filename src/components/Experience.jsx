import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'IoT Intern',
    company: 'Embessy Intelligence',
    duration: '6 Months – Present',
    points: [
      'Developing real-time IoT solutions involving sensor integration and embedded system development.',
      'Contributing to intelligent monitoring, data acquisition, and deployment-ready systems.',
    ],
  },
  {
    role: 'Internet of Things Intern',
    company: 'Eazythings Technology Pvt. Ltd.',
    duration: 'June 2024 – July 2024',
    points: [
      'Worked with sensors and actuators for real-time IoT applications and prototyping.',
      'Designed 2-layer PCB layouts and implemented live data visualization using ThingsBoard.',
    ],
  },
];

function Experience() {
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section experience-section">
      <h2 className="section-title animate-on-scroll">Experience</h2>
      <p className="section-subtitle animate-on-scroll">
        Professional experience building real products.
      </p>

      <div className="timeline">
        <div className="timeline-line-bg"></div>
        <div className="timeline-line-animated" ref={lineRef}></div>
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className={`timeline-entry glass-card animate-on-scroll stagger-${i + 1}`}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3 className="timeline-role">{exp.role}</h3>
              <p className="timeline-company">{exp.company}</p>
              <span className="timeline-duration">{exp.duration}</span>
              <ul className="timeline-points">
                {exp.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
