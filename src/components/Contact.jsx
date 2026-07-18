import React, { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'shrinathsureshbabu@gmail.com',
    href: 'mailto:shrinathsureshbabu@gmail.com',
    external: false,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/Shrinath777',
    href: 'https://github.com/Shrinath777',
    external: true,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shrinath',
    href: 'https://linkedin.com/in/shrinath',
    external: true,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Chennai, India',
    href: null,
    external: false,
  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open mailto with pre-filled data as fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:shrinathsureshbabu@gmail.com?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title animate-on-scroll">Let's Connect</h2>

      <p className="contact-intro animate-on-scroll">
        I'm always open to discussing new projects, collaboration opportunities, or roles where 
        I can contribute to building impactful products.
      </p>

      <div className="contact-grid">
        {contactLinks.map((link, i) => {
          const IconComponent = link.icon;
          const Tag = link.href ? 'a' : 'div';
          const extraProps = link.href
            ? {
                href: link.href,
                target: link.external ? '_blank' : undefined,
                rel: link.external ? 'noopener noreferrer' : undefined,
              }
            : {};

          return (
            <Tag
              key={link.label}
              className={`contact-card glass-card animate-on-scroll stagger-${i + 1}`}
              {...extraProps}
            >
              <IconComponent className="contact-icon" />
              <span className="contact-label">{link.label}</span>
              <span className="contact-value">{link.value}</span>
            </Tag>
          );
        })}
      </div>

      <div className="contact-form-container glass-card animate-on-scroll stagger-1">
        <h3 className="contact-form-title">
          <FiSend className="contact-form-icon" /> Send a Message
        </h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary contact-submit">
            <FiSend style={{ marginRight: '8px' }} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
