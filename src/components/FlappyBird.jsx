import React, { useRef, useEffect, useState, useCallback } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────
const CANVAS_W = 400;
const CANVAS_H = 500;
const GRAVITY = 0.45;
const FLAP_STRENGTH = -7.5;
const PIPE_WIDTH = 52;
const PIPE_GAP = 140;
const PIPE_SPEED = 2.8;
const PIPE_SPAWN_INTERVAL = 100; // frames
const GROUND_H = 40;
const BIRD_W = 28;
const BIRD_H = 22;
const BIRD_X = 70;

const COLORS = {
  bg: '#71c5cf',
  bgGrad1: '#71c5cf',
  bgGrad2: '#71c5cf',
  bird: '#f4b41a', // orange/yellow bird
  birdDark: '#e37719', // darker orange
  birdEye: '#ffffff',
  birdPupil: '#000000',
  birdBeak: '#ff6600',
  pipe: '#73bf2e', // green pipe
  pipeDark: '#558022', 
  pipeLight: '#9ce659',
  pipeCap: '#73bf2e',
  pipeCapDark: '#558022',
  ground: '#ded895', // sandy color
  groundLine: '#d3c97e',
  groundDot: '#d3c97e',
  text: '#ffffff',
  textShadow: '#543847',
  score: '#ffffff',
  white: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
  star: 'transparent',
};

const GAME_STATE = { IDLE: 0, PLAYING: 1, GAME_OVER: 2 };

// ── Pixel font renderer (blocky 5×7 bitmap digits + letters) ─────────────────
const DIGIT_MAP = {
  '0': [0x7c, 0xc6, 0xce, 0xd6, 0xe6, 0xc6, 0x7c],
  '1': [0x30, 0x70, 0x30, 0x30, 0x30, 0x30, 0xfc],
  '2': [0x78, 0xcc, 0x0c, 0x38, 0x60, 0xc0, 0xfc],
  '3': [0x78, 0xcc, 0x0c, 0x38, 0x0c, 0xcc, 0x78],
  '4': [0x1c, 0x3c, 0x6c, 0xcc, 0xfe, 0x0c, 0x0c],
  '5': [0xfc, 0xc0, 0xf8, 0x0c, 0x0c, 0xcc, 0x78],
  '6': [0x38, 0x60, 0xc0, 0xf8, 0xcc, 0xcc, 0x78],
  '7': [0xfc, 0x0c, 0x18, 0x30, 0x60, 0x60, 0x60],
  '8': [0x78, 0xcc, 0xcc, 0x78, 0xcc, 0xcc, 0x78],
  '9': [0x78, 0xcc, 0xcc, 0x7c, 0x0c, 0x18, 0x70],
};

function drawPixelChar(ctx, char, x, y, pixelSize, color) {
  const bitmap = DIGIT_MAP[char];
  if (!bitmap) return 0;
  ctx.fillStyle = color;
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 8; col++) {
      if (bitmap[row] & (1 << (7 - col))) {
        ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  return 8 * pixelSize + pixelSize;
}

function drawPixelNumber(ctx, num, cx, y, pixelSize, color) {
  const str = String(num);
  const charW = 8 * pixelSize + pixelSize;
  const totalW = str.length * charW - pixelSize;
  let x = cx - totalW / 2;
  for (const ch of str) {
    const w = drawPixelChar(ctx, ch, x, y, pixelSize, color);
    x += w;
  }
}

// ── Component ────────────────────────────────────────────────────────────────
const FlappyBird = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    gameState: GAME_STATE.IDLE,
    bird: { y: CANVAS_H / 2 - BIRD_H / 2, vy: 0, rotation: 0 },
    pipes: [],
    score: 0,
    bestScore: 0,
    frameCount: 0,
    groundOffset: 0,
    stars: [],
    flash: 0,
  });
  const rafRef = useRef(null);
  const [, forceUpdate] = useState(0);

  // Load background image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/flappy-bg.png';
    stateRef.current.bgImg = img;
  }, []);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.bird = { y: CANVAS_H / 2 - BIRD_H / 2, vy: 0, rotation: 0 };
    s.pipes = [];
    s.score = 0;
    s.frameCount = 0;
    s.groundOffset = 0;
    s.flash = 0;
  }, []);

  const flap = useCallback(() => {
    const s = stateRef.current;
    if (s.gameState === GAME_STATE.IDLE) {
      resetGame();
      s.gameState = GAME_STATE.PLAYING;
      s.bird.vy = FLAP_STRENGTH;
    } else if (s.gameState === GAME_STATE.PLAYING) {
      s.bird.vy = FLAP_STRENGTH;
    } else if (s.gameState === GAME_STATE.GAME_OVER) {
      if (s.flash <= 0) {
        resetGame();
        s.gameState = GAME_STATE.PLAYING;
        s.bird.vy = FLAP_STRENGTH;
      }
    }
    forceUpdate((n) => n + 1);
  }, [resetGame]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flap]);

  // ── Draw helpers ─────────────────────────────────────────────────────────
  const drawBird = useCallback((ctx, bird, frame) => {
    const x = BIRD_X;
    const y = bird.y;
    const rot = bird.rotation;

    ctx.save();
    ctx.translate(x + BIRD_W / 2, y + BIRD_H / 2);
    ctx.rotate(rot);
    ctx.translate(-(x + BIRD_W / 2), -(y + BIRD_H / 2));

    // Body shadow
    ctx.fillStyle = COLORS.birdDark;
    ctx.fillRect(x + 2, y + 2, BIRD_W, BIRD_H);

    // Body
    ctx.fillStyle = COLORS.bird;
    ctx.fillRect(x, y, BIRD_W, BIRD_H);

    // Pixel body detail — darker stripe
    ctx.fillStyle = COLORS.birdDark;
    ctx.fillRect(x, y + BIRD_H - 5, BIRD_W, 3);

    // Wing (flap animation)
    const wingOffset = Math.sin(frame * 0.4) > 0 ? -4 : 2;
    ctx.fillStyle = COLORS.birdDark;
    ctx.fillRect(x + 2, y + 6 + wingOffset, 12, 6);
    ctx.fillStyle = COLORS.bird;
    ctx.fillRect(x + 2, y + 6 + wingOffset, 10, 4);

    // Eye
    ctx.fillStyle = COLORS.birdEye;
    ctx.fillRect(x + BIRD_W - 10, y + 3, 7, 7);
    ctx.fillStyle = COLORS.birdPupil;
    ctx.fillRect(x + BIRD_W - 7, y + 5, 3, 3);

    // Beak
    ctx.fillStyle = COLORS.birdBeak;
    ctx.fillRect(x + BIRD_W - 2, y + 10, 8, 5);
    ctx.fillStyle = '#e5c100';
    ctx.fillRect(x + BIRD_W - 2, y + 13, 8, 2);

    ctx.restore();
  }, []);

  const drawPipe = useCallback((ctx, pipe) => {
    const capH = 12;
    const capOverhang = 6;

    // ── Top pipe ──
    // Main body
    ctx.fillStyle = COLORS.pipeDark;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topH);
    // Highlight stripe
    ctx.fillStyle = COLORS.pipe;
    ctx.fillRect(pipe.x + 4, 0, 6, pipe.topH);
    // Dark edge
    ctx.fillStyle = COLORS.pipeCapDark;
    ctx.fillRect(pipe.x + PIPE_WIDTH - 4, 0, 4, pipe.topH);
    // Cap
    ctx.fillStyle = COLORS.pipeCap;
    ctx.fillRect(pipe.x - capOverhang, pipe.topH - capH, PIPE_WIDTH + capOverhang * 2, capH);
    ctx.fillStyle = COLORS.pipeLight;
    ctx.fillRect(pipe.x - capOverhang, pipe.topH - capH, PIPE_WIDTH + capOverhang * 2, 3);
    ctx.fillStyle = COLORS.pipeCapDark;
    ctx.fillRect(pipe.x - capOverhang, pipe.topH - 3, PIPE_WIDTH + capOverhang * 2, 3);

    // ── Bottom pipe ──
    const bottomY = pipe.topH + PIPE_GAP;
    const bottomH = CANVAS_H - bottomY - GROUND_H;
    // Main body
    ctx.fillStyle = COLORS.pipeDark;
    ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, bottomH);
    // Highlight stripe
    ctx.fillStyle = COLORS.pipe;
    ctx.fillRect(pipe.x + 4, bottomY, 6, bottomH);
    // Dark edge
    ctx.fillStyle = COLORS.pipeCapDark;
    ctx.fillRect(pipe.x + PIPE_WIDTH - 4, bottomY, 4, bottomH);
    // Cap
    ctx.fillStyle = COLORS.pipeCap;
    ctx.fillRect(pipe.x - capOverhang, bottomY, PIPE_WIDTH + capOverhang * 2, capH);
    ctx.fillStyle = COLORS.pipeLight;
    ctx.fillRect(pipe.x - capOverhang, bottomY, PIPE_WIDTH + capOverhang * 2, 3);
    ctx.fillStyle = COLORS.pipeCapDark;
    ctx.fillRect(pipe.x - capOverhang, bottomY + capH - 3, PIPE_WIDTH + capOverhang * 2, 3);
  }, []);

  const drawGround = useCallback((ctx, offset) => {
    const groundY = CANVAS_H - GROUND_H;

    // Ground fill
    ctx.fillStyle = COLORS.ground;
    ctx.fillRect(0, groundY, CANVAS_W, GROUND_H);

    // Neon top line
    ctx.fillStyle = COLORS.groundLine;
    ctx.fillRect(0, groundY, CANVAS_W, 3);
    // Glow effect
    ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
    ctx.fillRect(0, groundY + 3, CANVAS_W, 6);

    // Scrolling pixel dots
    ctx.fillStyle = COLORS.groundDot;
    for (let i = -1; i < CANVAS_W / 20 + 1; i++) {
      const dotX = ((i * 20 - offset) % CANVAS_W + CANVAS_W) % CANVAS_W;
      ctx.fillRect(dotX, groundY + 14, 4, 4);
      ctx.fillRect(dotX + 10, groundY + 26, 3, 3);
    }
  }, []);

  const drawStars = useCallback((ctx, stars, frame) => {
    for (const star of stars) {
      const alpha = 0.3 + 0.3 * Math.sin(frame * 0.03 + star.twinkle);
      ctx.fillStyle = `rgba(48, 54, 61, ${alpha + 0.3})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  }, []);

  // ── Game loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const s = stateRef.current;
      s.frameCount++;

      // ── Update ──
      if (s.gameState === GAME_STATE.PLAYING) {
        // Bird physics
        s.bird.vy += GRAVITY;
        s.bird.y += s.bird.vy;
        s.bird.rotation = Math.max(-0.5, Math.min(s.bird.vy * 0.06, 1.2));

        // Ground scroll
        s.groundOffset = (s.groundOffset + PIPE_SPEED) % 20;

        // Pipe spawning
        if (s.frameCount % PIPE_SPAWN_INTERVAL === 0) {
          const minTop = 60;
          const maxTop = CANVAS_H - GROUND_H - PIPE_GAP - 60;
          const topH = minTop + Math.random() * (maxTop - minTop);
          s.pipes.push({ x: CANVAS_W + 10, topH, scored: false });
        }

        // Pipe movement
        for (const pipe of s.pipes) {
          pipe.x -= PIPE_SPEED;

          // Score
          if (!pipe.scored && pipe.x + PIPE_WIDTH < BIRD_X) {
            pipe.scored = true;
            s.score++;
          }
        }

        // Remove off-screen pipes
        s.pipes = s.pipes.filter((p) => p.x + PIPE_WIDTH + 10 > 0);

        // ── Collision detection ──
        const bx = BIRD_X;
        const by = s.bird.y;
        const bw = BIRD_W;
        const bh = BIRD_H;

        // Ground / ceiling
        if (by + bh > CANVAS_H - GROUND_H || by < 0) {
          s.gameState = GAME_STATE.GAME_OVER;
          s.bestScore = Math.max(s.bestScore, s.score);
          s.flash = 12;
        }

        // Pipes
        for (const pipe of s.pipes) {
          const px = pipe.x;
          const pw = PIPE_WIDTH;
          // Shrink hitbox slightly for fairness
          const margin = 3;
          if (
            bx + bw - margin > px &&
            bx + margin < px + pw
          ) {
            if (by + margin < pipe.topH || by + bh - margin > pipe.topH + PIPE_GAP) {
              s.gameState = GAME_STATE.GAME_OVER;
              s.bestScore = Math.max(s.bestScore, s.score);
              s.flash = 12;
            }
          }
        }
      } else if (s.gameState === GAME_STATE.IDLE) {
        // Idle bobbing
        s.bird.y = CANVAS_H / 2 - BIRD_H / 2 + Math.sin(s.frameCount * 0.05) * 12;
        s.bird.rotation = 0;
        s.groundOffset = (s.groundOffset + 1) % 20;
      } else if (s.gameState === GAME_STATE.GAME_OVER) {
        // Let bird fall a bit
        if (s.bird.y + BIRD_H < CANVAS_H - GROUND_H) {
          s.bird.vy += GRAVITY;
          s.bird.y += s.bird.vy;
          s.bird.rotation = Math.min(s.bird.rotation + 0.08, 1.5);
        }
        if (s.flash > 0) s.flash--;
      }

      // ── Render ──
      // Background
      if (s.bgImg && s.bgImg.complete) {
        ctx.drawImage(s.bgImg, 0, 0, CANVAS_W, CANVAS_H);
      } else {
        ctx.fillStyle = '#71c5cf'; // Classic light blue fallback
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      // Pipes
      for (const pipe of s.pipes) {
        drawPipe(ctx, pipe);
      }

      // Ground
      drawGround(ctx, s.groundOffset);

      // Bird
      drawBird(ctx, s.bird, s.frameCount);

      // Score (during play)
      if (s.gameState === GAME_STATE.PLAYING) {
        // Shadow
        drawPixelNumber(ctx, s.score, CANVAS_W / 2 + 2, 32, 4, COLORS.textShadow);
        drawPixelNumber(ctx, s.score, CANVAS_W / 2, 30, 4, COLORS.score);
      }

      // Flash effect on death
      if (s.flash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.flash / 12 * 0.4})`;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }

      // ── Overlays ──
      if (s.gameState === GAME_STATE.IDLE) {
        ctx.fillStyle = COLORS.overlay;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Title
        ctx.fillStyle = COLORS.text;
        ctx.font = 'bold 28px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY BIRD', CANVAS_W / 2, CANVAS_H / 2 - 50);

        // Subtitle with blinking
        if (Math.sin(s.frameCount * 0.06) > -0.3) {
          ctx.fillStyle = COLORS.white;
          ctx.font = 'bold 16px "Courier New", monospace';
          ctx.fillText('CLICK / TAP / SPACE', CANVAS_W / 2, CANVAS_H / 2);
          ctx.fillText('TO START', CANVAS_W / 2, CANVAS_H / 2 + 22);
        }

        // Decorative lines
        ctx.fillStyle = COLORS.pipe;
        ctx.fillRect(CANVAS_W / 2 - 100, CANVAS_H / 2 - 65, 200, 2);
        ctx.fillRect(CANVAS_W / 2 - 100, CANVAS_H / 2 + 38, 200, 2);
      }

      if (s.gameState === GAME_STATE.GAME_OVER) {
        ctx.fillStyle = COLORS.overlay;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Game over box
        const boxW = 240;
        const boxH = 180;
        const boxX = (CANVAS_W - boxW) / 2;
        const boxY = (CANVAS_H - boxH) / 2 - 20;

        // Box background
        ctx.fillStyle = '#161b22';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        // Border
        ctx.strokeStyle = COLORS.pipe;
        ctx.lineWidth = 3;
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        // Inner border
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX + 6, boxY + 6, boxW - 12, boxH - 12);

        // GAME OVER text
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 24px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_W / 2, boxY + 38);

        // Divider
        ctx.fillStyle = COLORS.pipe;
        ctx.fillRect(boxX + 20, boxY + 50, boxW - 40, 2);

        // Score
        ctx.fillStyle = COLORS.white;
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.fillText('SCORE', CANVAS_W / 2, boxY + 78);
        drawPixelNumber(ctx, s.score, CANVAS_W / 2, boxY + 86, 3, COLORS.score);

        // Best
        ctx.fillStyle = COLORS.white;
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.fillText('BEST', CANVAS_W / 2, boxY + 122);
        drawPixelNumber(ctx, s.bestScore, CANVAS_W / 2, boxY + 130, 3, COLORS.bird);

        // Restart prompt
        if (Math.sin(s.frameCount * 0.06) > -0.3) {
          ctx.fillStyle = COLORS.white;
          ctx.font = 'bold 13px "Courier New", monospace';
          ctx.fillText('CLICK TO PLAY AGAIN', CANVAS_W / 2, boxY + boxH + 28);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawBird, drawPipe, drawGround, drawStars]);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const sectionStyle = {
    padding: '60px 20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontFamily: '"Courier New", monospace',
    fontSize: '1.3rem',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '24px',
    letterSpacing: '2px',
  };

  const canvasWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  const canvasStyle = {
    width: '100%',
    maxWidth: `${CANVAS_W}px`,
    height: 'auto',
    maxHeight: `${CANVAS_H}px`,
    border: `2px solid ${COLORS.pipe}`,
    borderRadius: '4px',
    cursor: 'pointer',
    imageRendering: 'pixelated',
    boxShadow: `0 8px 0 rgba(0, 0, 0, 0.2)`,
    display: 'block',
  };

  const hintStyle = {
    fontFamily: '"Courier New", monospace',
    fontSize: '0.75rem',
    color: '#484f58',
    textAlign: 'center',
    marginTop: '12px',
    letterSpacing: '1px',
  };

  return (
    <div className="game-section" id="game" style={sectionStyle}>
      <h2 style={titleStyle}>{'// MINI GAME'}</h2>
      <div style={canvasWrapperStyle}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={canvasStyle}
          onClick={flap}
          onTouchStart={(e) => {
            e.preventDefault();
            flap();
          }}
        />
      </div>
      <p style={hintStyle}>SPACE / CLICK / TAP TO FLAP</p>
    </div>
  );
};

export default FlappyBird;
