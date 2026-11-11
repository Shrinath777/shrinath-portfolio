import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const socialLinks = [
  {
    icon: FiGithub,
    href: 'https://github.com/Shrinath777',
    label: 'GitHub',
    color: '#8b5cf6',
  },
  {
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/shrinath-s-2b25ab254/',
    label: 'LinkedIn',
    color: '#0ea5e9',
  },
  {
    icon: FiMail,
    href: 'mailto:shrinathsureshbabu@gmail.com',
    label: 'Email',
    color: '#ec4899',
  },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLink = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand col */}
        <div className="footer-brand-col">
          <div className="footer-brand">SS<span className="footer-cursor">_</span></div>
          <p className="footer-tagline">
            Building bridges between silicon and software.<br />
            ECE undergrad · Chennai, India
          </p>
          <div className="footer-social">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="footer-social-icon"
                style={{ '--s-color': s.color }}
              >
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links col */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-quick-links">
            {quickLinks.map(l => (
              <li key={l.label}>
                <a href={l.href} onClick={(e) => handleLink(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact col */}
        <div className="footer-contact-col">
          <h4 className="footer-col-title">Get In Touch</h4>
          <p className="footer-contact-text">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
          <a
            href="mailto:shrinathsureshbabu@gmail.com"
            className="footer-mail-btn"
          >
            <FiMail /> shrinathsureshbabu@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          Built with <FiHeart className="footer-heart" /> by <strong>Shrinath S</strong> · {new Date().getFullYear()}
        </p>
        <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
