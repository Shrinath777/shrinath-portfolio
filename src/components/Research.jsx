import React from 'react';
import { FiBookOpen, FiExternalLink } from 'react-icons/fi';

function Research() {
  return (
    <section id="research" className="section research-section">
      <h2 className="section-title animate-on-scroll">Research</h2>

      <div className="research-card glass-card animate-on-scroll stagger-1">
        <FiBookOpen className="research-icon" />
        <h3 className="research-title">IoT-Based Environmental Monitoring for Heritage Conservation</h3>
        <p className="research-abstract">
          This paper presents a comprehensive IoT-based environmental monitoring system designed to protect 
          heritage monuments from gradual deterioration caused by humidity, gas exposure, and temperature 
          fluctuations. The system utilizes ESP32 microcontrollers, DHT22 and MQ gas sensors for data 
          collection, with real-time data visualization and automated alert mechanisms.
        </p>
        <div className="research-meta">
          <span className="research-venue">IEEE Conference Publication</span>
        </div>
        <div className="research-actions">
          <a href="https://github.com/Shrinath777/heritage-sentinel" className="btn btn-small btn-primary" target="_blank" rel="noopener noreferrer">
            <FiExternalLink style={{ marginRight: '6px' }} /> View Project & Paper
          </a>
        </div>
      </div>
    </section>
  );
}

export default Research;
