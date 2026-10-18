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


// Carrusel horizontal de proyectos
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('projects-track');
  if (!track) return;

  const cards = track.querySelectorAll('.project-card');
  if (!cards.length) return;

  const prevLg = document.getElementById('projects-prev-lg');
  const nextLg = document.getElementById('projects-next-lg');
  const prevSm = document.getElementById('projects-prev-sm');
  const nextSm = document.getElementById('projects-next-sm');

  // ancho de scroll = ancho de una card + gap
  function getStep() {
    const card = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || '16', 10);
    return card.getBoundingClientRect().width + gap;
  }

  function scrollLeft() {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  }

  function scrollRight() {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  }

  [prevLg, prevSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollLeft);
  });

  [nextLg, nextSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollRight);
  });
});

// Carrusel de certificados
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('certificates-track');
  if (!track) return;

  const cards = track.querySelectorAll('.certificate-card');
  if (!cards.length) return;

  const prevLg = document.getElementById('certificates-prev-lg');
  const nextLg = document.getElementById('certificates-next-lg');
  const prevSm = document.getElementById('certificates-prev-sm');
  const nextSm = document.getElementById('certificates-next-sm');

  // ancho de scroll = ancho de una card + gap
  function getStep() {
    const card = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || '24', 10);
    return card.getBoundingClientRect().width + gap;
  }

  function scrollLeft() {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  }

  function scrollRight() {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  }

  [prevLg, prevSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollLeft);
  });

  [nextLg, nextSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollRight);
  });

  // Ocultar botones cuando no hay más contenido en esa dirección (solo desktop)
  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 8;
    const atEnd = track.scrollLeft >= maxScroll - 8;

    [prevLg, prevSm].forEach(btn => {
      if (btn) btn.classList.toggle('opacity-40', atStart);
    });
    [nextLg, nextSm].forEach(btn => {
      if (btn) btn.classList.toggle('opacity-40', atEnd);
    });
  }

  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
});

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
  const cards = document.querySelectorAll('.certificate-card, .project-card, .flip-container');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  cards.forEach(card => {
    const index = [...(card.parentElement.children)].filter(el => el.classList.contains('certificate-card') || el.classList.contains('project-card') || el.classList.contains('flip-container')).indexOf(card);
    card.classList.add('reveal');
    const delay = Math.min(index, 6) * 70;
    card.style.transitionDelay = delay + 'ms';
    card.dataset.revealDelay = delay;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
      entry.target.classList.add('in-view');
      setTimeout(() => { entry.target.style.transitionDelay = ''; }, delay + 700);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => io.observe(card));
});


