import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a href="https://github.com/Shrinath777" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/shrinath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:shrinathsureshbabu@gmail.com" aria-label="Email">
            <FiMail />
          </a>
        </div>
        <p className="footer-text">
          Built with <FiHeart className="footer-heart" /> by Shrinath S · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
