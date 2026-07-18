import React from 'react';
import { FiDownload, FiArrowRight, FiMail } from 'react-icons/fi';

function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content animate-on-scroll">
        <div className="hero-avatar">
          <img src="/assets/profile.jpg" alt="Shrinath Sureshbabu" className="profile-img" />
        </div>
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Shrinath S</h1>
        <h2 className="hero-title">Electronics & Communication Engineer | IoT & Full-Stack Developer</h2>
        <p className="hero-tagline">
          I build IoT solutions, embedded systems, and modern web applications. 
          Bridging the physical world to the digital with precision and performance.
        </p>
        <div className="hero-buttons">
          <a
            href="/assets/resume.pdf"
            download
            className="btn btn-primary"
          >
            <FiDownload style={{ marginRight: '8px' }} /> Download Resume
          </a>
          <a
            href="#projects"
            className="btn btn-outline"
            onClick={(e) => scrollTo(e, '#projects')}
          >
            <FiArrowRight style={{ marginRight: '8px' }} /> View Projects
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={(e) => scrollTo(e, '#contact')}
          >
            <FiMail style={{ marginRight: '8px' }} /> Contact Me
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}

export default Hero;
