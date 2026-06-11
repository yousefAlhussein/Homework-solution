  // ===== ANIMATE SKILL BARS =====
  function animateSkills() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      fill.style.width = '0';
      const target = fill.getAttribute('data-width');
      setTimeout(() => { fill.style.width = target + '%'; }, 1000);
    });
  }

  // Auto animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateSkills(); observer.disconnect(); }
    });
  }, { threshold: 0.3 });

  const skillsEl = document.querySelector('#skills');
  if (skillsEl) observer.observe(skillsEl);
