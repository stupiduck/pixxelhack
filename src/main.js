import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// ===== PAGE TRANSITION =====
class PageTransition {
  constructor() {
    this.transitionElement = document.getElementById('page-transition');
    this.init();
  }

  init() {
    // Trigger page transition on navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerTransition(() => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    });
  }

  triggerTransition(callback) {
    this.transitionElement.classList.add('active');
    
    setTimeout(() => {
      if (callback) callback();
      
      setTimeout(() => {
        this.transitionElement.classList.remove('active');
      }, 750);
    }, 750);
  }
}

// ===== CURSOR RIPPLE EFFECT (Element 8) =====
class CursorRipple {
  constructor() {
    this.rippleContainer = document.getElementById('cursor-ripple');
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    if (this.isMobile) {
      // Disable ripple effect on mobile
      document.body.style.cursor = 'auto';
      return;
    }

    document.addEventListener('mousemove', (e) => {
      this.createRipple(e.clientX, e.clientY);
    });

    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('a, button, .work-item, .team-member, .service-card');
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.createRipple(e.clientX, e.clientY, true);
      });
    });
  }

  createRipple(x, y, isHover = false) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    if (isHover) {
      ripple.style.background = 'radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, rgba(255, 107, 53, 0.2) 50%, transparent 100%)';
    }

    this.rippleContainer.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 1000);
  }
}

// ===== LOADER (Element 1) =====
class Loader {
  constructor() {
    this.loader = document.getElementById('loader');
    this.counter = document.querySelector('.loader-counter');
    this.progressBar = document.querySelector('.loader-bar');
    this.currentProgress = 0;
    this.init();
  }

  init() {
    // Simulate loading progress with more realistic timing
    const interval = setInterval(() => {
      this.currentProgress += Math.random() * 8 + 2; // More realistic progress
      if (this.currentProgress >= 100) {
        this.currentProgress = 100;
        clearInterval(interval);
        this.hideLoader();
      }
      this.updateProgress();
    }, 80);

    // Hide loader after minimum time
    setTimeout(() => {
      if (this.currentProgress < 100) {
        this.currentProgress = 100;
        this.updateProgress();
        this.hideLoader();
      }
    }, 2500);
  }

  updateProgress() {
    this.counter.textContent = `${Math.floor(this.currentProgress)}%`;
    this.progressBar.style.width = `${this.currentProgress}%`;
  }

  hideLoader() {
    gsap.to(this.loader, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        this.loader.classList.add('hidden');
        this.initPageAnimations();
      }
    });
  }

  initPageAnimations() {
    // Ensure header is immediately visible and properly positioned
    gsap.set('.header', { 
      opacity: 1, 
      visibility: 'visible',
      y: 0,
      clearProps: 'all'
    });
    
    // Animate header with a subtle entrance
    gsap.from('.header', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3
    });

    // Animate hero content with staggered timing
    gsap.from('.hero-content', {
      y: 50,
      opacity: 0,
      duration: 1.5,
      delay: 0.8,
      ease: "power2.out"
    });

    // Add subtle particle animation
    this.initParticles();
  }

  initParticles() {
    // Create floating particles in the hero section
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(0, 212, 255, 0.3);
          border-radius: 50%;
          pointer-events: none;
        `;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animation = 'float 15s infinite linear';
        particlesContainer.appendChild(particle);
      }
    }
  }
}

// ===== NAVIGATION (Element 4) =====
class Navigation {
  constructor() {
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.menu.classList.add('active');
      gsap.fromTo('.nav-link', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to('.nav-link', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => this.menu.classList.remove('active')
      });
    }

    // Animate hamburger with more fluid motion
    const spans = this.toggle.querySelectorAll('span');
    if (this.isOpen) {
      gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.4, ease: "power2.out" });
      gsap.to(spans[1], { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(spans[1], { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.4, ease: "power2.out" });
    }
  }

  closeMenu() {
    if (this.isOpen) {
      this.toggleMenu();
    }
  }
}

// ===== HERO TEXT ANIMATION (Element 9) - IMPROVED =====
class HeroAnimation {
  constructor() {
    this.title = document.querySelector('.hero-title');
    this.subtitle = document.querySelector('.hero-subtitle');
    this.cta = document.querySelector('.hero-cta');
    this.init();
  }

  init() {
    // Split text for animation - use only chars to prevent wrapping issues
    try {
      const splitTitle = new SplitText(this.title, { type: 'chars' });
      const splitSubtitle = new SplitText(this.subtitle, { type: 'chars' });

      // Animate title characters with more dramatic effect
      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        duration: 1.2,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: this.title,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate subtitle with longer stagger
      gsap.from(splitSubtitle.chars, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.015,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: this.subtitle,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    } catch (error) {
      console.warn('SplitText not available, using fallback animation');
      // Fallback animation without SplitText
      gsap.from(this.title, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: this.title,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      gsap.from(this.subtitle, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: this.subtitle,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate CTA buttons with bounce effect
    gsap.from(this.cta.children, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 1,
      stagger: 0.3,
      delay: 1.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: this.cta,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
}

// ===== SERVICES ANIMATION (Element 3) =====
class ServicesAnimation {
  constructor() {
    this.cards = document.querySelectorAll('.service-card');
    this.servicesSection = document.querySelector('.services');
    this.init();
  }

  init() {
    console.log('Initializing ServicesAnimation...');
    console.log('Found service cards:', this.cards.length);
    console.log('Services section:', this.servicesSection);
    
    // Ensure service cards are visible
    if (this.cards.length === 0) {
      console.warn('No service cards found');
      return;
    }

    this.cards.forEach((card, index) => {
      // Make sure cards are visible initially
      gsap.set(card, { opacity: 1, visibility: 'visible' });
      
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Enhanced hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Add subtle glow effect
        gsap.to(card, {
          boxShadow: "0 8px 40px rgba(0, 212, 255, 0.2)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(card, {
          boxShadow: "0 4px 30px rgba(0, 212, 255, 0.15)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Enhanced parallax effect to services section
    if (this.servicesSection) {
      console.log('Setting up parallax for services section');
      
      // Create a separate background element for parallax if it doesn't exist
      let backgroundElement = this.servicesSection.querySelector('.services-background');
      if (!backgroundElement) {
        backgroundElement = document.createElement('div');
        backgroundElement.className = 'services-background';
        backgroundElement.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        `;
        this.servicesSection.appendChild(backgroundElement);
      }

      // Animate the background element for parallax effect
      gsap.to(backgroundElement, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: this.servicesSection,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }
}

// ===== WORK SECTION (Element 2) =====
class WorkSection {
  constructor() {
    this.workItems = document.querySelectorAll('.work-item');
    this.init();
  }

  init() {
    this.workItems.forEach((item, index) => {
      // Initial animation with parallax effect
      gsap.from(item, {
        opacity: 0,
        y: 120,
        duration: 1,
        delay: index * 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Enhanced hover effects
      item.addEventListener('mouseenter', () => {
        const image = item.querySelector('img');
        const content = item.querySelector('.work-content');
        
        gsap.to(image, {
          scale: 1.15,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(content, {
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });

        // Add subtle glow to the entire item
        gsap.to(item, {
          boxShadow: "0 10px 50px rgba(0, 212, 255, 0.3)",
          duration: 0.6,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        const image = item.querySelector('img');
        const content = item.querySelector('.work-content');
        
        gsap.to(image, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(content, {
          y: 100,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(item, {
          boxShadow: "0 4px 30px rgba(0, 212, 255, 0.15)",
          duration: 0.6,
          ease: "power2.out"
        });
      });
    });
  }
}

// ===== IMAGE MARQUEE SECTION =====
class ImageMarquee {
  constructor() {
    this.marquee = document.querySelector('.image-marquee');
    this.container = document.querySelector('.image-marquee-container');
    this.init();
  }

  init() {
    // Enhanced pause on hover with smooth transition
    this.container.addEventListener('mouseenter', () => {
      gsap.to(this.marquee, {
        timeScale: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    this.container.addEventListener('mouseleave', () => {
      gsap.to(this.marquee, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Animate marquee items on scroll
    gsap.from('.image-marquee-item', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.image-marquee-section',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
}

// ===== MARQUEE (Element 6) =====
class Marquee {
  constructor() {
    this.marquee = document.querySelector('.marquee');
    this.container = document.querySelector('.marquee-container');
    this.init();
  }

  init() {
    // Enhanced pause on hover with smooth transition
    this.container.addEventListener('mouseenter', () => {
      gsap.to(this.marquee, {
        timeScale: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    this.container.addEventListener('mouseleave', () => {
      gsap.to(this.marquee, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Animate marquee items on scroll with glow effect
    gsap.from('.marquee-item', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.marquee-section',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
}

// ===== TEAM SECTION (Element 7) =====
class TeamSection {
  constructor() {
    this.teamMembers = document.querySelectorAll('.team-member');
    this.teamImage = document.getElementById('team-image');
    this.init();
  }

  init() {
    // Animate team members on scroll with slide effect
    this.teamMembers.forEach((member, index) => {
      gsap.from(member, {
        opacity: 0,
        x: -80,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: member,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Enhanced hover effects
      member.addEventListener('mouseenter', () => {
        const imageSrc = member.getAttribute('data-image');
        this.changeTeamImage(imageSrc);
        
        gsap.to(member, {
          x: 25,
          duration: 0.4,
          ease: "power2.out"
        });

        // Add glow effect
        gsap.to(member, {
          boxShadow: "0 8px 40px rgba(0, 212, 255, 0.2)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      member.addEventListener('mouseleave', () => {
        gsap.to(member, {
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        });

        gsap.to(member, {
          boxShadow: "0 4px 30px rgba(0, 212, 255, 0.15)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Animate team image with scale effect
    gsap.from('.team-image-wrapper', {
      opacity: 0,
      scale: 0.7,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.team-image-wrapper',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  changeTeamImage(imageSrc) {
    gsap.to(this.teamImage, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        this.teamImage.src = imageSrc;
        gsap.to(this.teamImage, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  }
}

// ===== CONTACT FORM =====
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    // Animate form elements with staggered timing
    gsap.from('.contact-form .form-group', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.contact-form',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Form submission with enhanced feedback
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Enhanced input focus effects
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(input, {
          boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(input, {
          boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  handleSubmit() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Enhanced form submission simulation
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      gsap.to(submitBtn, {
        backgroundColor: '#00d4ff',
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        gsap.to(submitBtn, {
          backgroundColor: '',
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        this.form.reset();
      }, 2000);
    }, 1500);
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Animate section titles with more dramatic effect
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Enhanced parallax effect for hero background
    gsap.to('.hero-particles', {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: '.hero',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing components...');
  
  // Initialize all components
  new PageTransition();
  new CursorRipple();
  new Loader();
  new Navigation();
  new HeroAnimation();
  new ServicesAnimation();
  new WorkSection();
  new ImageMarquee();
  new Marquee();
  new TeamSection();
  new ContactForm();
  new ScrollAnimations();

  // Enhanced scroll-triggered header background
  setTimeout(() => {
    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onUpdate: (self) => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (self.progress > 0) {
          gsap.to(header, {
            background: 'rgba(10, 10, 10, 0.98)',
            boxShadow: '0 2px 20px rgba(0, 212, 255, 0.1)',
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(header, {
            background: 'rgba(10, 10, 10, 0.95)',
            boxShadow: 'none',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }, 1000); // Delay to ensure header animation completes first
}); 