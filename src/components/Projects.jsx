import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Heritage Sentinel',
    slug: 'heritage',
    description: 'Real-time IoT environmental monitoring for heritage sites. ESP32, sensors, Node.js dashboard, and SMS alerts to protect monuments.',
    tech: ['ESP32', 'Node.js', 'Express', 'Sensors', 'Twilio SMS'],
    repoUrl: 'https://github.com/Shrinath777/heritage-sentinel',
    liveUrl: 'https://heritage-sentinel-ui.vercel.app',
  },
  {
    name: 'TailMate',
    slug: 'tailmate',
    description: 'A complete dog care mobile app for health tracking, activity logging, and community support. Built with React Native and Supabase.',
    tech: ['React Native', 'Supabase', 'Node.js', 'Expo'],
    repoUrl: 'https://github.com/Shrinath777/tailmate-app',
    liveUrl: 'https://tailmate-new1.vercel.app', // Deployed frontend
  },
  {
    name: 'Farmer Services',
    slug: 'farmer',
    description: 'A rural workflow platform connecting farmers to tools, market prices, and local services.',
    tech: ['Node.js', 'Express', 'Firebase', 'REST APIs'],
    repoUrl: 'https://github.com/Shrinath777/farmer-services',
    liveUrl: 'https://farmer-services.vercel.app',
  },
  {
    name: 'RFID Dashboard',
    slug: 'rfid',
    description: 'An access control system using RFID cards and ESP32. Tracks entries on a live web dashboard with authentication.',
    tech: ['ESP32', 'Node.js', 'React', 'MySQL'],
    repoUrl: 'https://github.com/Shrinath777/RFID-dashboard',
    liveUrl: 'https://rfid-dashboard-ui.vercel.app',
  },
  {
    name: 'Dual Axis Solar Tracker',
    slug: 'solar',
    description: 'Hardware project that aligns solar panels to sunlight using LDR sensors and servo motors for maximum energy capture.',
    tech: ['Arduino', 'LDR Sensors', 'Servo Motors', 'PCB Design'],
    repoUrl: 'https://github.com/Shrinath777/solar-tracker',
  },
  {
    name: 'Workspace',
    slug: 'workspace',
    description: 'A unified web interface integrating multiple coding and placement platforms with responsive frontend design.',
    tech: ['React', 'Node.js', 'HTML5', 'CSS3'],
    repoUrl: 'https://github.com/Shrinath777/workspace',
    liveUrl: 'https://workspace-platform-xi.vercel.app',
  },
  {
    name: 'CuraBot',
    slug: 'curabot',
    description: 'An AI-powered differential diagnosis chatbot. Analyzes symptoms and suggests possible conditions with confidence scores.',
    tech: ['Python', 'FastAPI', 'React', 'Supabase', 'AI/ML'],
    repoUrl: 'https://github.com/Shrinath777/Curabot',
    liveUrl: 'https://curabot-ui.vercel.app',
  },
];

function Projects() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      if (!track || !section) return;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 100); // 100px padding adjustment
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section id="projects" className="projects-section-horizontal" ref={sectionRef}>
        <div className="projects-header">
        <h2 className="section-title">
          <span className="pixel-accent">LATEST RELEASES</span>
          Projects
        </h2>
        <p className="section-subtitle">Things I've actually built and shipped. (Scroll down)</p>
      </div>

      <div className="projects-horizontal-track" ref={trackRef}>
        {projects.map((project) => (
          <div key={project.slug} className="project-card horizontal-card">
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="tech-pills">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
            <div className="project-actions">
              <Link to={`/project/${project.slug}`} className="btn btn-small btn-primary">
                <FiArrowRight style={{ marginRight: '6px' }} /> Know More
              </Link>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-outline">
                <FiGithub style={{ marginRight: '6px' }} /> GitHub
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-cyan">
                  <FiExternalLink style={{ marginRight: '6px' }} /> Live (Vercel)
                </a>
              )}
              {project.backendUrl && (
                <a href={project.backendUrl} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-outline" style={{ borderColor: '#2563eb', color: '#60a5fa' }}>
                  <FiExternalLink style={{ marginRight: '6px' }} /> API (Render)
                </a>
              )}
              {project.comingSoon && (
                <span className="btn btn-small project-coming-soon">
                  🚀 Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

export default Projects;
