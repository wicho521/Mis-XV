/* ==========================================================================
   XV AÑOS FÁTIMA - JAVASCRIPT CONTROLLER (FULLY RESPONSIVE & AUDIO OPTIMIZED)
   - Background Particle Canvas (Sparkles & Floating Petals)
   - Virtual Envelope Unseal Animation
   - Hidden Video Audio Playback & Floating Music Toggle Button
   - Real-time Countdown Timer (Target: Nov 21, 2026 18:00 hrs -> 53 Días)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BACKGROUND CANVAS ANIMATION (Sparkles, Bokeh & Floating Rose Petals)
     ========================================================================== */
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.6 - 0.2; // Float upwards gently
      this.opacity = Math.random() * 0.7 + 0.3;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.isPetal = Math.random() > 0.6;
      this.petalAngle = Math.random() * Math.PI * 2;
      this.petalSpeed = Math.random() * 0.02 + 0.01;
      
      // Color palette: Rose Gold, Soft Pink, Golden Sparkle
      const colors = ['#e8a5b8', '#d4af37', '#f5e49b', '#f7dbe3', '#b76e79'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX + Math.sin(this.petalAngle) * 0.3;
      this.y += this.speedY;
      this.petalAngle += this.petalSpeed;

      // Pulse opacity
      this.opacity += (Math.random() - 0.5) * 0.02;
      if (this.opacity < 0.2) this.opacity = 0.2;
      if (this.opacity > 0.9) this.opacity = 0.9;

      // Wrap around screen
      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.isPetal) {
        // Draw soft romantic floating petal shape
        ctx.translate(this.x, this.y);
        ctx.rotate(this.petalAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 2, this.size * 3.5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw glowing sparkle particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particlesCount = Math.min(Math.floor(window.innerWidth / 12), 65);
  const particles = Array.from({ length: particlesCount }, () => new Particle());

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();

  /* ==========================================================================
     2. VIRTUAL ENVELOPE UNSEAL & HIDDEN VIDEO AUDIO PLAYBACK
     ========================================================================== */
  const waxSeal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelope-screen');
  const invitationCard = document.getElementById('invitation-card');
  const bgVideo = document.getElementById('bg-video');
  const musicFloatingBtn = document.getElementById('music-floating-btn');

  let isOpened = false;

  function playAudioFromVideo() {
    if (bgVideo) {
      bgVideo.play().then(() => {
        musicFloatingBtn.classList.add('playing');
      }).catch(err => {
        console.log("Autoplay deferred until explicit click:", err);
      });
    }
  }

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('open');

    // Start video audio on envelope open gesture
    playAudioFromVideo();

    setTimeout(() => {
      envelopeScreen.classList.add('hide');
      invitationCard.classList.add('visible');
    }, 1200);
  }

  waxSeal.addEventListener('click', openEnvelope);
  envelope.addEventListener('click', openEnvelope);

  // Floating music toggle button
  if (musicFloatingBtn) {
    musicFloatingBtn.addEventListener('click', () => {
      if (!bgVideo) return;
      if (bgVideo.paused) {
        bgVideo.play();
        musicFloatingBtn.classList.add('playing');
      } else {
        bgVideo.pause();
        musicFloatingBtn.classList.remove('playing');
      }
    });
  }

  /* ==========================================================================
     3. REAL-TIME COUNTDOWN TIMER (Target: November 21, 2026, 18:00:00)
     ========================================================================== */
  const eventDate = new Date('2026-11-21T18:00:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

});
