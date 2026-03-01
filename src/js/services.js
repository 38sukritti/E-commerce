import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Navbar Animation
gsap.from('.navbar', {
  y: -100,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// Service Cubes Animation
gsap.from('.service-cube', {
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 70%',
  },
  scale: 0.8,
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: 'back.out(1.7)'
});

// Process Steps Animation
gsap.from('.process-step', {
  scrollTrigger: {
    trigger: '.process-section',
    start: 'top 70%',
  },
  scale: 0.9,
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Section Titles
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});

// CTA Section
gsap.from('.cta-content', {
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top 75%',
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});
