import React from 'react';
import './Background.css';

function Background() {
  return (
    <>
      {/* Pixel star field */}
      <div className="pixel-bg">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="pixel-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="scanline-overlay" />
    </>
  );
}

export default Background;
