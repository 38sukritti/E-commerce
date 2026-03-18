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
gsap.from('.extra-flip-card', {
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
    // Redirect to frontend contact page with pre-selected plan
    window.location.href = `contact.html?plan=${encodeURIComponent(plan)}`;
  });
});

// Website Modal Functionality
const websiteCard = document.getElementById('website-card');
const websiteModal = document.getElementById('website-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

let isFlipped = false;

// Detect when card is flipped
if (websiteCard) {
  websiteCard.addEventListener('mouseenter', () => {
    setTimeout(() => {
      if (!isFlipped) {
        isFlipped = true;
        // Show modal after flip animation completes
        setTimeout(() => {
          websiteModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }, 700);
      }
    }, 100);
  });
}

// Close modal
function closeModal() {
  websiteModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  isFlipped = false;
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && websiteModal.classList.contains('active')) {
    closeModal();
  }
});

// Website Plan Selection
const selectWebsiteButtons = document.querySelectorAll('.select-website-btn');

selectWebsiteButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const plan = button.getAttribute('data-plan');
    // Redirect to frontend contact page
    window.location.href = `contact.html?plan=${encodeURIComponent(plan)}`;
    closeModal();
  });
});

// Photography Modal Functionality
const photographyCard = document.getElementById('photography-card');
const photographyModal = document.getElementById('photography-modal');
const photoModalOverlay = document.getElementById('photo-modal-overlay');
const photoModalClose = document.getElementById('photo-modal-close');

let isPhotoFlipped = false;

// Detect when photography card is flipped
if (photographyCard) {
  photographyCard.addEventListener('mouseenter', () => {
    setTimeout(() => {
      if (!isPhotoFlipped) {
        isPhotoFlipped = true;
        // Show modal after flip animation completes
        setTimeout(() => {
          photographyModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }, 700);
      }
    }, 100);
  });
}

// Close photography modal
function closePhotoModal() {
  photographyModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  isPhotoFlipped = false;
}

if (photoModalClose) {
  photoModalClose.addEventListener('click', closePhotoModal);
}

if (photoModalOverlay) {
  photoModalOverlay.addEventListener('click', closePhotoModal);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && photographyModal.classList.contains('active')) {
    closePhotoModal();
  }
});

// Photography Package Selection
const selectPhotographyButtons = document.querySelectorAll('.select-photography-btn');

selectPhotographyButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const plan = button.getAttribute('data-plan');
    // Redirect to frontend contact page
    window.location.href = `contact.html?plan=${encodeURIComponent(plan)}`;
    closePhotoModal();
  });
});

// Branding Package Selection
const selectBrandingButtons = document.querySelectorAll('.select-branding-btn');

selectBrandingButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const plan = button.getAttribute('data-plan');
    // Redirect to frontend contact page
    window.location.href = `contact.html?plan=${encodeURIComponent(plan)}`;
  });
});
