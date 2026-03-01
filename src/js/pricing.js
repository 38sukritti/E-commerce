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

// Pricing Cards Animation
gsap.from('.pricing-card', {
  scrollTrigger: {
    trigger: '.pricing-section',
    start: 'top 70%',
  },
  scale: 0.9,
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.15,
  ease: 'back.out(1.4)'
});

// Extra Cards Animation
gsap.from('.extra-card', {
  scrollTrigger: {
    trigger: '.extra-services',
    start: 'top 70%',
  },
  scale: 0.9,
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.1,
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

// Plan Selection
const selectPlanButtons = document.querySelectorAll('.select-plan');

selectPlanButtons.forEach(button => {
  button.addEventListener('click', () => {
    const plan = button.getAttribute('data-plan');
    const price = button.getAttribute('data-price');
    const inquiryId = Math.floor(100000 + Math.random() * 900000);
    
    const message = `Hello Grovix Studio, I selected ${plan} Plan (₹${price}/month). Inquiry ID: #${inquiryId}`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  });
});
