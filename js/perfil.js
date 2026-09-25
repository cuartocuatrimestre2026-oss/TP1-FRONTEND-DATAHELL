/* ==========================================================================
   JAVASCRIPT PARA PERFILES INDIVIDUALES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ JS Perfil cargado correctamente');

  // 1. Mostrar Reseña / Recomendación dentro de la tarjeta correspondiente
  const mediaItems = document.querySelectorAll('.media-item');

  if (mediaItems.length > 0) {
    mediaItems.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.querySelector('strong')?.textContent || 'Seleccionado';
        const type = item.getAttribute('data-type') || 'Favorito';
        const desc = item.getAttribute('data-desc') || 'Sin descripción adicional disponible.';

        // Encontrar la sección de la tarjeta donde está el elemento
        const cardSection = item.closest('.card-section');
        if (cardSection) {
          let detailBox = cardSection.querySelector('.media-detail-box');
          if (!detailBox) {
            detailBox = document.createElement('div');
            detailBox.className = 'media-detail-box';
            cardSection.appendChild(detailBox);
          }

          // Marcar ítem activo en la lista
          const siblings = cardSection.querySelectorAll('.media-item');
          siblings.forEach(s => s.classList.remove('active-media'));
          item.classList.add('active-media');

          // Seleccionar ícono SVG monolineal según el tipo (Película vs Álbum)
          const isMovie = type.toLowerCase().includes('pelí') || type.toLowerCase().includes('peli') || type.toLowerCase().includes('film') || type.toLowerCase().includes('movie');
          const iconSvg = isMovie
            ? `<svg class="icon-mono" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="17" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`
            : `<svg class="icon-mono" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;

          // Renderizar la reseña dentro de la tarjeta respetando el diseño de la web
          detailBox.innerHTML = `
            <div class="media-review-card">
              <h4 class="media-review-title">${iconSvg} <span>${type}: ${title}</span></h4>
              <p class="media-review-text">${desc}</p>
            </div>
          `;
        }
      });
    });
  }

  // Función auxiliar: Notificación Toast personalizada DataHell
  function showCustomToast(title, message) {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
      <div class="custom-toast-icon">🔥</div>
      <div class="custom-toast-content">
        <div class="custom-toast-title">${title}</div>
        <div class="custom-toast-message">${message}</div>
      </div>
      <button class="custom-toast-close" aria-label="Cerrar">&times;</button>
    `;

    document.body.appendChild(toast);

    const closeBtn = toast.querySelector('.custom-toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 300);
    });

    // Auto ocultar a los 2.2 segundos (2200 ms)
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.classList.add('toast-hiding');
        setTimeout(() => toast.remove(), 300);
      }
    }, 2200);
  }

  // 2. Modal de Saludo / Contacto Virtual
  const contactBtn = document.getElementById('contactMemberBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      const name = contactBtn.getAttribute('data-member-name') || 'Integrante';
      showCustomToast('¡Saludo Enviado!', `Le enviaste un saludo virtual a <strong>${name}</strong>.<br>¡Gracias por visitar su perfil!`);
    });
  }
});

