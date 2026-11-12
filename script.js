document.addEventListener('DOMContentLoaded', () => {
  // 1. Barra de progreso de lectura
  const progressBar = document.getElementById('readingProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  // 2. Cambio de tema claro / oscuro
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const htmlEl = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    if (next === 'light') {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Modo Oscuro';
    } else {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Modo Claro';
    }
  });

  // 3. Diagrama interactivo de la Vía Láctea
  const infoBox = document.getElementById('diagramInfoBox');
  const hotspotData = {
    erosita: '<strong>🟠 Burbujas de eROSITA (Rayos X):</strong> Dos colosales estructuras bipolares de gas calentado por ondas de choque (~5 millones de grados K) que se extienden unos 80° en el cielo y envuelven a las burbujas de Fermi.',
    fermi: '<strong>🟣 Burbujas de Fermi (Rayos Gamma):</strong> Descubiertas en 2010, se alzan hasta ~50° de latitud galáctica por encima y debajo del centro. Sus bordes afilados sugieren una violenta liberación de energía en el núcleo galáctico.',
    center: '<strong>🟡 Centro Galáctico (Sagitario A*):</strong> El corazón de la Vía Láctea. El estudio demuestra que una inyección compacta de energía aquí (hace ~27 millones de años) es indispensable para formar las Burbujas de eROSITA.',
    ring: '<strong>🔵 Anillo de Formación Estelar (~5 kpc):</strong> Zona del disco donde nacen más estrellas y explotan más supernovas. Aunque eleva «chimeneas» calientes, su densidad es tan baja (10⁻⁵–10⁻⁴ cm⁻³) que no puede crear las Burbujas de eROSITA.',
    sun: '<strong>🟢 Posición del Sol (~8 kpc del centro):</strong> Nuestro puesto de observación. Los autores probaron 12 ángulos solares distintos: con la explosión central, las burbujas se ven en el 50% de ellos; solo con el anillo, en el 0%.'
  };

  document.querySelectorAll('.diagram-hotspot').forEach((hotspot) => {
    const key = hotspot.getAttribute('data-info');
    const updateInfo = () => {
      if (hotspotData[key]) {
        infoBox.innerHTML = hotspotData[key];
      }
    };
    hotspot.addEventListener('mouseenter', updateInfo);
    hotspot.addEventListener('click', updateInfo);
  });

  // 4. Pestañas interactivas de Simulación (Figura 1 vs Figura 2 vs Ambas)
  const simTabs = document.querySelectorAll('.sim-tab');
  const figurePanelsContainer = document.querySelector('.figure-panels');
  const panelDi = document.getElementById('panel-di');
  const panelDici = document.getElementById('panel-dici');

  simTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      simTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.getAttribute('data-target');
      if (target === 'panel-both') {
        figurePanelsContainer.classList.add('compare-both');
        panelDi.classList.add('active');
        panelDici.classList.add('active');
      } else {
        figurePanelsContainer.classList.remove('compare-both');
        panelDi.classList.toggle('active', target === 'panel-di');
        panelDici.classList.toggle('active', target === 'panel-dici');
      }
    });
  });

  // 5. Lightbox para ampliar las gráficas del artículo científico
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.img-zoom-container').forEach((container) => {
    container.addEventListener('click', () => {
      const img = container.querySelector('img');
      const figure = container.closest('figure');
      const caption = figure ? figure.querySelector('figcaption') : null;
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.innerText : img.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
