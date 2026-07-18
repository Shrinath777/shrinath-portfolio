import React, { useEffect, useState } from 'react';
import { FiDownload, FiArrowRight, FiMail } from 'react-icons/fi';

function useTypewriter(text, speed = 80, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}

function Hero() {
  const name = useTypewriter('Shrinath S', 120, 600);
  const tagline = useTypewriter(
    'I build IoT solutions, embedded systems, and modern web applications.',
    30,
    2200
  );

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <img src="/assets/profile-pixel.png" alt="Shrinath S" className="profile-img" />
        </div>
        <p className="hero-greeting" style={{ opacity: 1 }}>SYSTEM BOOT COMPLETE...</p>
        <h1 className="hero-name" style={{ opacity: 1 }}>
          {name}<span className="hero-cursor" />
        </h1>
        <h2 className="hero-title" style={{ opacity: 1 }}>
          Electronics &amp; Communication Engineer | IoT &amp; Full-Stack Developer
        </h2>
        <p className="hero-tagline" style={{ opacity: 1 }}>{tagline}</p>
        <div className="hero-buttons" style={{ opacity: 1 }}>
          <a href="/assets/resume.pdf" download className="btn btn-primary">
            <FiDownload style={{ marginRight: '8px' }} /> Download Resume
          </a>
          <a href="#projects" className="btn btn-outline" onClick={(e) => scrollTo(e, '#projects')}>
            <FiArrowRight style={{ marginRight: '8px' }} /> View Projects
          </a>
          <a href="#contact" className="btn btn-cyan" onClick={(e) => scrollTo(e, '#contact')}>
            <FiMail style={{ marginRight: '8px' }} /> Contact Me
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

export default Hero;
