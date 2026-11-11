import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projectsData = {
  heritage: {
    name: 'Heritage Sentinel',
    tagline: 'Protecting India\'s monuments with real-time IoT environmental monitoring and intelligent alert systems.',
    purpose: 'Heritage sites across India face slow, invisible deterioration from humidity, gas exposure, and temperature fluctuations. Heritage Sentinel was built to give conservators real-time visibility into environmental threats — before damage becomes irreversible. This project was developed as part of the Smart India Hackathon 2025 and reached the national finals.',
    features: [
      'Live environmental dashboard with temperature, humidity, and gas level monitoring',
      'ESP32-powered sensor nodes deployed across the site perimeter',
      'Automated SMS alerts via Twilio when conditions exceed safe thresholds',
      'Historical data visualization with trend analysis charts',
      'Admin panel with user authentication and role-based access',
      'Responsive web interface accessible from any device on-site',
    ],
    tech: ['ESP32', 'Node.js', 'Express', 'MongoDB', 'Twilio SMS', 'React', 'Vite', 'Socket.IO', 'DHT22 Sensor', 'MQ Gas Sensor'],
    liveUrl: 'https://heritage-sentinel-ui.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/heritage-sentinel',
    color: 'var(--violet-deep)',
  },
  tailmate: {
    name: 'TailMate',
    tagline: 'A comprehensive dog care mobile app that helps owners manage their pet\'s health, activities, and daily needs.',
    purpose: 'TailMate is a complete dog care solution designed to simplify pet parenting. Instead of just matchmaking, it helps dog owners track their pet\'s health records, schedule veterinary appointments, log daily walks, and manage nutrition. Owners can also connect with local pet communities for advice and support.',
    features: [
      'Comprehensive health tracking and vaccination reminders',
      'Daily activity logging for walks and exercises',
      'Nutrition and meal scheduling',
      'Community forums to connect with other pet parents',
      'Supabase-powered backend with real-time subscriptions',
      'Cross-platform mobile app built with React Native and Expo',
    ],
    tech: ['React Native', 'Expo', 'Supabase', 'Node.js', 'Express', 'Real-time Chat', 'Image Upload', 'Push Notifications'],
    liveUrl: 'https://tailmate-new1.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/tailmate-app',
    color: 'var(--coral)',
  },
  farmer: {
    name: 'Farmer Services',
    tagline: 'A digital platform connecting rural farmers to essential tools, market prices, and agricultural services.',
    purpose: 'Small-scale farmers often lack access to real-time market prices, government schemes, and modern tools. Farmer Services bridges that gap with a simple, accessible web platform. The interface is designed to be intuitive even for first-time internet users, with large buttons, clear pricing, and a streamlined checkout flow.',
    features: [
      'Product catalog with categorized agricultural supplies',
      'Shopping cart with real-time price calculation',
      'User authentication with sign-up and login',
      'Order tracking and delivery status updates',
      'Responsive design optimized for mobile devices',
      'Express.js backend with RESTful API architecture',
    ],
    tech: ['Node.js', 'Express', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Responsive Design'],
    liveUrl: 'https://farmer-services.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/farmer-services',
    color: 'var(--cyan)',
  },
  rfid: {
    name: 'RFID Dashboard',
    tagline: 'A smart access control system using RFID cards, ESP32 microcontrollers, and a real-time web dashboard.',
    purpose: 'Traditional attendance and access logs are manual and error-prone. This RFID Dashboard automates the process using contactless RFID cards scanned at ESP32 nodes. Every tap is instantly logged and displayed on a live web dashboard with timestamps, user identity, and access status. Built for college labs, offices, and secure zones.',
    features: [
      'Contactless RFID card scanning with instant server logging',
      'Real-time dashboard with live access feed and statistics',
      'Node management — add, configure, and monitor ESP32 units',
      'User management with role-based access controls',
      'Access log history with filtering and search capabilities',
      'JWT-based authentication for admin panel security',
    ],
    tech: ['ESP32', 'RFID RC522', 'Node.js', 'Express', 'MySQL', 'React', 'Vite', 'JWT Auth', 'WebSocket'],
    liveUrl: 'https://rfid-dashboard-ui.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/RFID-dashboard',
    color: 'var(--golden)',
  },
  solar: {
    name: 'Dual Axis Solar Tracker',
    tagline: 'A hardware system that automatically aligns solar panels with sunlight for maximum energy capture throughout the day.',
    purpose: 'Fixed solar panels lose up to 40% efficiency because they cannot follow the sun. This dual-axis tracker uses four LDR sensors to continuously detect the brightest point in the sky and adjusts two servo motors to tilt the panel accordingly. The system was designed from scratch including the PCB layout, housing design, and embedded firmware.',
    features: [
      'Dual-axis tracking using 4 LDR sensors in a cross pattern',
      'Servo motor control for precise horizontal and vertical tilt',
      'Custom PCB design for clean, reliable circuit layout',
      'Proteus simulation for pre-build testing and validation',
      'Low-power design suitable for remote solar installations',
      'No Arduino required — direct microcontroller implementation',
    ],
    tech: ['Embedded C', 'LDR Sensors', 'Servo Motors', 'PCB Design', 'Proteus Simulation', 'Hardware Prototyping'],
    repoUrl: 'https://github.com/Shrinath777/solar-tracker',
    color: 'var(--emerald)',
  },
  curabot: {
    name: 'CuraBot',
    tagline: 'An AI-powered differential diagnosis chatbot that analyzes symptoms and suggests possible medical conditions.',
    purpose: 'Built for the TCS Hackathon, CuraBot tackles the challenge of preliminary medical screening. Users describe their symptoms in natural language, and the AI engine cross-references them against a curated medical database to provide ranked differential diagnoses with confidence scores. It is designed to assist, not replace, medical professionals by providing structured data for faster decision-making.',
    features: [
      'Natural language symptom input with AI-powered parsing',
      'Differential diagnosis engine with confidence scoring',
      'Medical record upload and analysis capabilities',
      'Interactive follow-up questions for refined diagnosis',
      'Comprehensive disease database with gov-sourced data',
      'FastAPI backend with async processing for speed',
    ],
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite', 'AI/ML', 'Supabase', 'LLM Integration', 'Medical NLP'],
    liveUrl: 'https://curabot-ui.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/Curabot',
    color: 'var(--rose)',
  },
  workspace: {
    name: 'Workspace',
    tagline: 'A unified learning platform integrating multiple coding and placement platforms.',
    purpose: 'Students often struggle to track their progress across different coding platforms. Workspace provides a centralized interface to manage and track learning journeys from platforms like LeetCode, HackerRank, and GeeksforGeeks.',
    features: [
      'Centralized dashboard for tracking coding progress',
      'Integration with multiple placement platforms',
      'Responsive frontend design for mobile and desktop',
      'Performance analytics and visualization',
      'User-friendly unified interface',
    ],
    tech: ['React', 'Node.js', 'Express', 'HTML5', 'CSS3', 'REST API'],
    liveUrl: 'https://workspace-platform-xi.vercel.app',
    repoUrl: 'https://github.com/Shrinath777/workspace',
    color: 'var(--sky)',
  },
};

function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-detail">
      <div className="detail-container">
          <Link to="/" className="detail-back">← Back to Portfolio</Link>
          <div className="detail-panel">
            <h1 className="detail-title">Project not found</h1>
            <p className="detail-body">The project you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="detail-container">
        <Link to="/" className="detail-back">← Back to Portfolio</Link>

        <div className="detail-panel">
          <h1 className="detail-title">{project.name}</h1>
          <p className="detail-tagline">{project.tagline}</p>
        </div>

        <div className="detail-panel">
          <h2 className="detail-section-title">
            <span className="section-icon">🎯</span> Purpose
          </h2>
          <div className="detail-body">
            <p>{project.purpose}</p>
          </div>
        </div>

        <div className="detail-panel">
          <h2 className="detail-section-title">
            <span className="section-icon">⚡</span> Key Features
          </h2>
          <ul className="detail-features">
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="detail-panel">
          <h2 className="detail-section-title">
            <span className="section-icon">🛠</span> Tech Stack
          </h2>
          <div className="detail-tech-grid">
            {project.tech.map((t) => (
              <span key={t} className="detail-tech-item">{t}</span>
            ))}
          </div>
        </div>

            <div className="detail-actions">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FiGithub style={{ marginRight: '8px' }} /> View Source
              </a>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-cyan"
                >
                  <FiExternalLink style={{ marginRight: '8px' }} /> Live Demo
                </a>
              )}
            </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
