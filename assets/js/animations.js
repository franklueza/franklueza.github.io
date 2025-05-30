// GSAP Animations
  gsap.from('.hero-text h1', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
  });
  gsap.from('.hero-text p', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      delay: 0.3,
      ease: 'power3.out'
  });
  gsap.from('.hero-image img', {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'elastic.out(1, 0.3)'
  });

  // Scroll-triggered animations
  gsap.utils.toArray('.section, .skills-section, .portfolio-section').forEach(section => {
      gsap.from(section.querySelectorAll('h2, .card, .carousel, .project-list a'), {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
          }
      });
  });

// Asegúrate de tener GSAP y ScrollTrigger incluidos
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.project-showcase').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: i * 0.18,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});


