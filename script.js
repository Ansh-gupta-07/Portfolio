/* ═══════════════════════════════════════════════════
   script.js — Ansh Gupta Portfolio
   GSAP animations, 3D card tilt, custom cursor, counters
═══════════════════════════════════════════════════ */

'use strict';

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

// ── Utility: Wait for DOM ──
document.addEventListener('DOMContentLoaded', () => {

  initCursor();
  initNav();
  initHeroAnimation();
  initScrollReveal();
  initProjectTilt();
  initCounters();

});

/* ══════════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Follower lags behind with easing
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  const hoverables = document.querySelectorAll('a, button, [data-magnetic]');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'back.out' });
      gsap.to(follower, { scale: 1.5, opacity: 0.6, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });
}

/* ══════════════════════════════════════════
   2. NAVIGATION — shrink on scroll
══════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -60',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}

/* ══════════════════════════════════════════
   3. HERO ENTRANCE ANIMATION
══════════════════════════════════════════ */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Portrait slides up
  tl.to('.hero-portrait-wrap', {
    opacity: 1,
    y: 0,
    duration: 1.4,
    delay: 0.2,
  })

  // Hero words stagger
  .to('.hero-word', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.12,
  }, '-=1.0')

  // Left elements
  .to('.hero-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.7')

  // Right elements
  .to('.hero-desc', {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.7')

  .to('.hero-cta-wrap', {
    opacity: 1,
    y: 0,
    duration: 0.6,
  }, '-=0.5')

  // Bottom
  .to('.hero-bottom', {
    opacity: 1,
    duration: 0.8,
  }, '-=0.4');

  // Set initial positions for slide-up elements
  gsap.set('.hero-word', { y: 80 });
  gsap.set('.hero-desc', { y: 20 });
  gsap.set('.hero-cta-wrap', { y: 20 });
  gsap.set('.hero-portrait-wrap', { y: 30 });

  // Portrait mouse parallax
  const portrait = document.getElementById('heroPortrait');
  if (portrait) {
    document.addEventListener('mousemove', (e) => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(portrait.querySelector('.hero-portrait-inner'), {
        rotateY: xPercent * 8,
        rotateX: -yPercent * 5,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });
  }

  // Background text parallax on scroll
  gsap.to('.hero-bg-word', {
    y: -160,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // Portrait parallax on scroll
  gsap.to('.hero-portrait-wrap', {
    y: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });
}

/* ══════════════════════════════════════════
   4. SCROLL REVEAL — all [data-reveal] elements
══════════════════════════════════════════ */
function initScrollReveal() {
  // Generic reveal
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Section labels
  gsap.utils.toArray('.section-label').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });

  // Project cards stagger in
  gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
    },
  });

  // Skill blocks
  gsap.from('.skill-block', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 82%',
    },
  });

  // About portrait
  gsap.from('.about-portrait-wrap', {
    opacity: 0,
    x: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-portrait-wrap',
      start: 'top 85%',
    },
  });

  // About bio paragraphs
  gsap.from('.about-bio p', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-bio',
      start: 'top 85%',
    },
  });

  // Stats
  gsap.from('.stat', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 88%',
    },
  });

  // Contact section
  gsap.from('.contact-email-link', {
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.contact-email-link',
      start: 'top 88%',
    },
  });

  gsap.from('.social-link', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-socials',
      start: 'top 88%',
    },
  });
}

/* ══════════════════════════════════════════
   5. 3D CARD TILT (custom mouse-parallax)
══════════════════════════════════════════ */
function initProjectTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    const inner = card.querySelector('.project-card-inner');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 900,
        transformOrigin: 'center center',
      });

      // Slight inner shift for depth
      if (inner) {
        gsap.to(inner, {
          x: (x - centerX) * 0.015,
          y: (y - centerY) * 0.015,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
      });
      if (inner) {
        gsap.to(inner, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  });
}

/* ══════════════════════════════════════════
   6. ANIMATED COUNTERS
══════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val);
          },
        });
      },
    });
  });
}

/* ══════════════════════════════════════════
   7. MAGNETIC BUTTON EFFECT
══════════════════════════════════════════ */
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: 'power2.out',
    });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  });
});
