/* Home Animations - Interactive Hero Particle Canvas & Staggered Scroll Reveals */

document.addEventListener('DOMContentLoaded', () => {
  // Only execute on the homepage (where the canvas element exists)
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const heroSection = canvas.closest('.hero-section') || canvas.parentElement;
  const ctx = canvas.getContext('2d');
  
  let animationFrameId;
  let width = canvas.width = heroSection.offsetWidth;
  let height = canvas.height = heroSection.offsetHeight;
  
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };
  
  // Track mouse coordinates
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  heroSection.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Get colors based on the current active theme
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      particlePrimary: isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(59, 130, 246, 0.22)',
      particleSecondary: isDark ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.22)',
      lineColor: isDark ? 'rgba(96, 165, 250, 0.05)' : 'rgba(59, 130, 246, 0.05)',
      mouseLineColor: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(59, 130, 246, 0.12)'
    };
  }

  let themeColors = getThemeColors();

  // Listen to theme changes to dynamically update colors
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Small timeout to allow documentElement attribute to change first
      setTimeout(() => {
        themeColors = getThemeColors();
        particles.forEach(p => {
          p.color = Math.random() > 0.5 ? themeColors.particlePrimary : themeColors.particleSecondary;
        });
      }, 50);
    });
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2.5 + 1.5;
      this.color = Math.random() > 0.5 ? themeColors.particlePrimary : themeColors.particleSecondary;
      this.originRadius = this.radius;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Boundary collision
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
      
      this.x += this.vx;
      this.y += this.vy;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < mouse.radius) {
          // Attract particles slightly
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 0.8;
          this.y += (dy / dist) * force * 0.8;
          this.radius = this.originRadius + force * 2.5; // Grow on hover
        } else {
          if (this.radius > this.originRadius) {
            this.radius -= 0.1;
          }
        }
      } else {
        if (this.radius > this.originRadius) {
          this.radius -= 0.1;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    // Scale count by width
    const count = Math.min(Math.floor(width / 14), 110);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function handleResize() {
    if (!heroSection) return;
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
    initParticles();
  }

  window.addEventListener('resize', handleResize);

  function connectParticles() {
    const maxDist = 115;
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (maxDist - dist) / maxDist;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = themeColors.lineColor.replace(/[\d\.]+\)$/, `${alpha * 0.12})`);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw line to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = pi.x - mouse.x;
        const dy = pi.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < mouse.radius) {
          const alpha = (mouse.radius - dist) / mouse.radius;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = themeColors.mouseLineColor.replace(/[\d\.]+\)$/, `${alpha * 0.22})`);
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Run Canvas
  initParticles();
  animate();

  // --- SCROLL REVEAL SECTION & CARD ANIMATION ---
  const cards = document.querySelectorAll('.tool-card-item');
  
  if (typeof IntersectionObserver !== 'undefined' && cards.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const grid = entry.target.parentElement;
          const gridItems = Array.from(grid.querySelectorAll('.tool-card-item'));
          
          gridItems.forEach((item, index) => {
            // Check if already revealed to prevent repeat trigger
            if (!item.classList.contains('revealed')) {
              setTimeout(() => {
                item.classList.add('revealed');
              }, index * 85); // elegant staggered fade
            }
          });
          
          // Once the grid is animated, unobserve it
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each grid container instead of individual cards to perform clean staggering
    const grids = document.querySelectorAll('.grid-3');
    grids.forEach(grid => {
      // Find the first item to observe
      const firstItem = grid.querySelector('.tool-card-item');
      if (firstItem) {
        cardObserver.observe(firstItem);
      }
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    cards.forEach(card => card.classList.add('revealed'));
  }

  // Also hook into the search input to handle immediate reveal overrides
  const searchInput = document.getElementById('tool-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query !== '') {
        document.body.classList.add('searching');
        cards.forEach(card => card.classList.add('revealed'));
      } else {
        document.body.classList.remove('searching');
      }
    });
  }
});
