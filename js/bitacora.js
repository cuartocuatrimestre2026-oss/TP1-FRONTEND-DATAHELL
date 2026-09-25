/* ==========================================================================
   JAVASCRIPT PARA LA SECCIÓN BITÁCORA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ JS Bitácora cargado correctamente');

  // 1. Filtrado Dinámico de Entradas de la Bitácora
  const filterBtns = document.querySelectorAll('.bitacora-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineCards = document.querySelectorAll('.timeline-card');

  const updateActiveCard = () => {
    if (!timelineCards.length) return;
    let activeCard = null;
    let minDistance = Infinity;

    // punto central de la pantalla
    const viewportCenter = window.innerHeight / 2;

    timelineCards.forEach(card => {
      // la tarjeta esta visible
      if (card.offsetParent !== null) {
        const rect = card.getBoundingClientRect();
        // centro de la tarjeta
        const cardCenter = rect.top + (rect.height / 2);

        // distancia entre ambos centros
        const distance = Math.abs(viewportCenter - cardCenter);

        // se activa la mas cercana al centro de la pantalla
        if (distance < minDistance) {
          minDistance = distance;
          activeCard = card;
        }
      }
    });

    // aplicarle el estilo a cada tarjeta
    timelineCards.forEach(card => {
      if (card === activeCard) {
        // agrandar tarjeta central
        card.classList.remove('scroll-inactive');
        card.classList.add('scroll-active');
      } else {
        // reducir al 75% y opacar las restantes
        card.classList.remove('scroll-active');
        card.classList.add('scroll-inactive');
      }
    });
  };

  if (filterBtns.length > 0 && timelineItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover clase activa de todos los botones
        filterBtns.forEach(b => b.classList.remove('btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline'));

        // Activar el botón seleccionado
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        const filter = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        // Actualizar el foco visual de la tarjeta visible tras el filtrado
        setTimeout(updateActiveCard, 50);
      });
    });
  }

  if (timelineCards.length > 0) {
    // Usamos passive: true para que el scroll siga siendo súper fluido y no se trabe
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    // Ejecutamos la función una vez al cargar la página para enfocar la primera tarjeta
    updateActiveCard();
  }
});
