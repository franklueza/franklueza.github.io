// Toggle menú móvil
 const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// Activar scroll suave con JavaScript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Evita el salto instantáneo

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Calcula el offset del header fijo
      const header = document.querySelector('.navbar');
      const headerHeight = header ? header.offsetHeight : 0;

      const offsetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});