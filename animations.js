(function () {

  // ── Entrance animations ──
  const ANIMATE_SEL = [
    '.section-label', '.section-title', '.section-desc',
    '.platform-card', '.feature-card', '.pipeline-step',
    '.stat-item', '.context-item', '.manifesto-inner',
    '.page-hero-content', '.foundation-inner > div',
    '.contact-info', '.contact-form', '.gdpr-badge',
    '.expertise-list', '.about-content > div'
  ].join(', ');

  const GRID_PARENTS = [
    '.platform-grid', '.features-grid', '.pipeline-inner',
    '.stats-inner', '.context-grid', '.about-content', '.contact-grid'
  ];

  document.querySelectorAll(ANIMATE_SEL).forEach(el => el.classList.add('anim'));

  GRID_PARENTS.forEach(sel => {
    document.querySelectorAll(sel + ' > *').forEach((child, i) => {
      if (i > 0) child.style.transitionDelay = (i * 0.18) + 's';
    });
  });

  const entranceObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.anim').forEach(el => entranceObserver.observe(el));

  // ── Number counter ──
  function animateCounter(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
    if (!match) return;
    const prefix = match[1];
    const target = parseInt(match[2]);
    const suffix = match[3];
    const duration = 1600;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = prefix + Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number, .metric-val').forEach(el => {
    counterObserver.observe(el);
  });

})();
