/* ==========================================================================
   XV AÑOS FÁTIMA - JAVASCRIPT CONTROLLER (HIGH INTENSITY PARTICLES & DRESS CODE)
   - High Density Animated Background Canvas (Glowing Sparkles & Falling Rose Petals)
   - Virtual Envelope Unseal & Audio Playback
   - Real-time Countdown Timer (Target: Nov 21, 2026 18:00 hrs)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. HIGH DENSITY BACKGROUND CANVAS ANIMATION
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
      this.size = Math.random() * 3.5 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = -Math.random() * 0.8 - 0.3; // Gentle upward breeze
      this.opacity = Math.random() * 0.7 + 0.3;
      this.isPetal = Math.random() > 0.55; // 45% Rose Petals, 55% Glowing Sparkles
      this.petalAngle = Math.random() * Math.PI * 2;
      this.petalSpeed = Math.random() * 0.025 + 0.01;
      
      // Rich Romantic Color Palette: Gold, Rose Gold, Dusty Pink, Champagne
      const colors = ['#f7e6a1', '#d4af37', '#e8a5b8', '#ffc6d9', '#ffffff', '#f5e49b'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX + Math.sin(this.petalAngle) * 0.4;
      this.y += this.speedY;
      this.petalAngle += this.petalSpeed;

      // Dynamic Twinkle
      this.opacity += (Math.random() - 0.5) * 0.03;
      if (this.opacity < 0.25) this.opacity = 0.25;
      if (this.opacity > 0.95) this.opacity = 0.95;

      // Wrap around screen edges
      if (this.y < -15) this.y = height + 15;
      if (this.x < -15) this.x = width + 15;
      if (this.x > width + 15) this.x = -15;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.isPetal) {
        // Floating Rose Petal Shape
        ctx.translate(this.x, this.y);
        ctx.rotate(this.petalAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 2.2, this.size * 4, Math.PI / 4, 0, Math.PI * 2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#e8a5b8';
        ctx.fill();
      } else {
        // Glowing Golden Sparkle Particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Increased density for vibrant mobile background!
  const particlesCount = Math.min(Math.floor(window.innerWidth / 5), 90);
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
     2. VIRTUAL ENVELOPE UNSEAL & AUDIO PLAYBACK
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
        console.log("Autoplay deferred until explicit user click:", err);
      });
    }
  }

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('open');

    // Start video audio playback on envelope unseal
    playAudioFromVideo();

    setTimeout(() => {
      envelopeScreen.classList.add('hide');
      invitationCard.classList.add('visible');
    }, 1200);
  }

  waxSeal.addEventListener('click', openEnvelope);
  envelope.addEventListener('click', openEnvelope);

  // Floating music button toggle
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
