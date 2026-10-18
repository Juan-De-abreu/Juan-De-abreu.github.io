// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang);

  // Evento botones idioma (desktop + mobile)
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      updateLanguage(currentLang);

      // Cambiar texto de TODOS los botones de idioma
      document.querySelectorAll('.lang-text').forEach(span => {
        span.textContent = translations[currentLang]['lang.' + currentLang];
      });
    });
  });
});


// Cambiar todos los textos
function updateLanguage(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const value = translations[lang][key];
    if (!value) return;

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // si quisieras placeholder: element.placeholder = value;
      element.value = value;
    } else {
      element.textContent = value;
    }
  });

  // Cambiar título página
  document.title = translations[lang].title;

  // Accesibilidad: aria-label / title traducibles
  document.querySelectorAll('[data-translate-aria]').forEach(el => {
    const v = translations[lang][el.getAttribute('data-translate-aria')];
    if (v) { el.setAttribute('aria-label', v); el.title = v; }
  });

  // Cambiar lang del HTML
  document.documentElement.lang = lang;
}



// Navbar Mobile con ANIMACIÓN
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenu.classList.contains('hidden')) {
    // Abrir con animación
    mobileMenu.classList.remove('hidden');
    setTimeout(() => mobileMenu.classList.add('mobile-menu-slide'), 10);
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    // Cerrar con animación
    mobileMenu.classList.add('mobile-menu-hide');
    setTimeout(() => {
      mobileMenu.classList.remove('mobile-menu-slide', 'mobile-menu-hide');
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }, 200);
  }
}


// Función para cerrar menú (para enlaces y click fuera)
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('mobile-menu-hide');
    setTimeout(() => {
      mobileMenu.classList.remove('mobile-menu-slide', 'mobile-menu-hide');
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }, 200);
  }
}


// Event listeners NAVBAR + MOBILE
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

  // Cerrar al clickear enlaces
  document.getElementById('mobile-menu').querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Click fuera
  document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenu.classList.contains('hidden') &&
      !mobileMenu.contains(event.target) &&
      !mobileBtn.contains(event.target)) {
      closeMobileMenu();
    }
  });
});


// Carruseles horizontales (proyectos y certificados)
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('projects-track', '.project-card');
  initCarousel('certificates-track', '.certificate-card');
});

function initCarousel(trackId, cardSelector) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const cards = track.querySelectorAll(cardSelector);
  if (!cards.length) return;

  const prefix = trackId.replace('-track', '');
  const prevBtns = [prefix + '-prev-lg', prefix + '-prev-sm']
    .map(id => document.getElementById(id)).filter(Boolean);
  const nextBtns = [prefix + '-next-lg', prefix + '-next-sm']
    .map(id => document.getElementById(id)).filter(Boolean);

  // Un "paso" = distancia real entre dos cards (funciona aunque el
  // navegador no soporte gap en flex, donde getComputedStyle devuelve "normal")
  function getStep() {
    const first = cards[0].getBoundingClientRect();
    if (cards.length > 1) {
      const second = cards[1].getBoundingClientRect();
      const real = second.left - first.left;
      if (real > 0) return real;
    }
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap);
    return first.width + (isNaN(gap) ? 16 : gap);
  }

  // Fallback para navegadores sin scrollBy({ behavior: 'smooth' })
  const smoothScroll = 'scrollBehavior' in document.documentElement.style;

  function scrollTrack(delta) {
    if (smoothScroll) {
      track.scrollBy({ left: delta, behavior: 'smooth' });
    } else {
      track.scrollLeft += delta;
    }
  }

  prevBtns.forEach(btn => btn.addEventListener('click', () => scrollTrack(-getStep())));
  nextBtns.forEach(btn => btn.addEventListener('click', () => scrollTrack(getStep())));

  // Estado de los botones + fundido de bordes según lo que quede por ver
  function updateControls() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const hasOverflow = maxScroll > 8;
    const atStart = track.scrollLeft <= 8;
    const atEnd = track.scrollLeft >= maxScroll - 8;

    [...prevBtns, ...nextBtns].forEach(btn => {
      btn.classList.toggle('carousel-nav-off', !hasOverflow);
      if (hasOverflow) btn.removeAttribute('aria-hidden');
      else btn.setAttribute('aria-hidden', 'true');
    });

    prevBtns.forEach(btn => {
      btn.classList.toggle('opacity-40', atStart);
      btn.setAttribute('aria-disabled', atStart ? 'true' : 'false');
    });
    nextBtns.forEach(btn => {
      btn.classList.toggle('opacity-40', atEnd);
      btn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
    });

    // Fundido solo hacia el lado donde todavía queda contenido
    track.classList.toggle('carousel-fade-left', hasOverflow && !atStart);
    track.classList.toggle('carousel-fade-right', hasOverflow && !atEnd);
  }

  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  window.addEventListener('load', updateControls);
  track.querySelectorAll('img').forEach(img => img.addEventListener('load', updateControls));
  updateControls();
}

// Tema claro / oscuro (la preferencia inicial se aplica en <head> sin parpadeo)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const light = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) { /* file:// */ }
    });
  });
});

// Animación de entrada de tarjetas (reveal escalonado)
document.addEventListener('DOMContentLoaded', () => {
  if (!('IntersectionObserver' in window)) return;

  const cards = [...document.querySelectorAll('.certificate-card, .project-card, .flip-container')];
  if (!cards.length) return;

  // Las cards de un carrusel se revelan juntas al entrar el carril completo:
  // así la card que queda recortada en el borde también se ve.
  const groups = new Map();
  cards.forEach(card => {
    const target = card.closest('#projects-track, #certificates-track') || card;
    if (!groups.has(target)) groups.set(target, []);
    groups.get(target).push(card);
  });

  groups.forEach(groupCards => {
    groupCards.forEach((card, index) => {
      card.classList.add('reveal');
      card.style.transitionDelay = Math.min(index, 6) * 70 + 'ms';
    });
  });

  function revealCard(card) {
    if (card.classList.contains('in-view')) return;
    card.classList.add('in-view');
    const delay = parseFloat(card.style.transitionDelay) || 0;
    setTimeout(() => { card.style.transitionDelay = ''; }, delay + 700);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (groups.get(entry.target) || [entry.target]).forEach(revealCard);
      io.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  groups.forEach((groupCards, target) => io.observe(target));

  // Red de seguridad: si algo sigue pendiente y ya está en pantalla, se revela igual
  function revealPendingInViewport() {
    const pending = document.querySelectorAll('.reveal:not(.in-view)');
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      return;
    }
    const vh = window.innerHeight || document.documentElement.clientHeight;
    pending.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < vh + 120 && rect.bottom > -120) revealCard(card);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      revealPendingInViewport();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', () => setTimeout(revealPendingInViewport, 800));
});

// Flip de habilidades: toque en pantallas sin hover + foco con teclado (CSS)
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.flip-container');
  if (!containers.length) return;

  const canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  containers.forEach(container => {
    container.setAttribute('tabindex', '0');
    if (!canHover) {
      container.addEventListener('click', () => container.classList.toggle('is-flipped'));
    }
  });
});
