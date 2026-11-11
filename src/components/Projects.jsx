import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

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
    liveUrl: 'https://tailmate-new1.vercel.app',
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
  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title animate-on-scroll">
        <span className="pixel-accent">LATEST RELEASES</span>
        Projects
      </h2>
      <p className="section-subtitle animate-on-scroll">Things I've actually built and shipped.</p>

      <div className="projects-grid animate-on-scroll stagger-1">
        {projects.map((project) => (
          <div key={project.slug} className="project-card">
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
                  <FiExternalLink style={{ marginRight: '6px' }} /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
