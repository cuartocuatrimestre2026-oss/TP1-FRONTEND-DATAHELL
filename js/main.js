/* ==========================================================================
   JAVASCRIPT PRINCIPAL - PORTADA Y INTERACCIONES GLOBALES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ JS Principal cargado correctamente');

  // 1. Menú Hamburguesa para Dispositivos Móviles
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      mobileMenuBtn.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('show')
      );
    });
  }

  // 1.5 Navegación ultra-fluida e instantánea entre páginas (sin destellos de recarga)
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript:')) {
      link.addEventListener('click', (e) => {
        const targetUrl = link.href;

        // Si es la misma página, hacer scroll suave al tope sin recargar
        if (targetUrl === window.location.href || targetUrl === window.location.href + '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Aplicar transición ultra rápida de salida antes de redireccionar
        e.preventDefault();
        document.body.classList.add('page-fade-out');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 60);
      });
    }
  });

  // 2. Interacción Dinámica de la Portada: Generador de Frase Motivacional del Equipo
  const heroQuoteBtn = document.getElementById('heroQuoteBtn');
  const heroQuoteDisplay = document.getElementById('heroQuoteDisplay');

  // Frases propuestas por los integrantes del equipo
  const equipoFrases = [
    '«Soy el amo de mi destino, soy el capitán de mi alma» - William E. Henley',
    '«El tiempo fluye como líquido entre tus manos.» — Mariü',
    '«Jehová Jireh : Dios proveerá.»',
    '«No hay nada como volver a un lugar que permanece sin cambios para descubrir cuánto has cambiado tú.» — Nelson Mandela',
    '«Frente al mar la felicidad es una idea simple» — Jean-Claude Izzo',
    '«La perfección del carácter es vivir cada día como si fuese el último, sin apresurarse, sin apatía, sin pretensiones.» - Marco Aurelio',
    '«No hay nada como volver a un lugar que permanece sin cambios para descubrir cuánto has cambiado tú.» — Nelson Mandela',
    '«El verdadero signo de la inteligencia no es el conocimiento, sino la imaginación. — Albert Einstein',
    '«El único modo de hacer un gran trabajo es amar lo que haces.» — Steve Jobs',
    '«No cuentes los días, haz que los días cuenten.» — Muhammad Ali',
    '«Ahora sé más que lo que sabía antes.» — Mariü',
    '«La creatividad como motor del futuro.» — Ser',
    '«Lo urgente no deja tiempo para lo importante.» — Mafalda',
    '«El que vive en armonía consigo mismo vive en armonía con el Universo.» - Marco Aurelio',
    '«Uno es dueño de lo que calla y esclavo de lo que habla.» — Sigmund Freud',
    '«Ve siempre más allá, porque ahí es donde encontrarás la verdad.» - Albert Camus',
    '«Vemos las cosas, no como son, sino como somos nosotros» - Immanuel Kant', 
    '««La inspiración existe, pero tiene que encontrarte trabajando.» - Pablo Picasso',
    '«No temas a la perfección, nunca la alcanzarás.» — Salvador Dalí',
    //'«»',//
  
  ];

  let ultimosIndicesUsados = [];

  if (heroQuoteBtn && heroQuoteDisplay) {
    heroQuoteBtn.addEventListener('click', () => {
      // Si se mostraron todas las frases del ciclo, reiniciamos el historial
      if (ultimosIndicesUsados.length >= equipoFrases.length) {
        ultimosIndicesUsados = [ultimosIndicesUsados[ultimosIndicesUsados.length - 1]];
      }

      // Seleccionar únicamente entre los índices que aún no salieron
      const disponibles = equipoFrases
        .map((_, index) => index)
        .filter(index => !ultimosIndicesUsados.includes(index));

      const randomIndex = disponibles[Math.floor(Math.random() * disponibles.length)];
      ultimosIndicesUsados.push(randomIndex);

      heroQuoteDisplay.style.opacity = '0';
      setTimeout(() => {
        heroQuoteDisplay.textContent = equipoFrases[randomIndex];
        heroQuoteDisplay.style.opacity = '1';
      }, 200);
    });
  }

  // 3. Contador Dinámico de Estadísticas del Equipo (se activa al posicionarse en la sección)
  const statElements = document.querySelectorAll('.stat-number');
  if (statElements.length > 0) {
    const animateStat = (stat) => {
      const rawTarget = stat.getAttribute('data-target') || '0';
      const target = parseInt(rawTarget, 10);
      const suffix = rawTarget.replace(/[0-9]/g, ''); // preserva '%' u otro sufijo
      let current = 0;
      stat.textContent = '0' + suffix;
      const increment = Math.max(1, Math.ceil(target / 25));

      if (stat._timer) clearInterval(stat._timer);

      stat._timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(stat._timer);
        } else {
          stat.textContent = current + suffix;
        }
      }, 35);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statElements.forEach(stat => observer.observe(stat));
  }
});
