(function () {
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
      if (i > 0) child.style.transitionDelay = (i * 0.11) + 's';
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
})();
