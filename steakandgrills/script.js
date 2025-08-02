
  // Elementos
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.createElement('div');
  menuOverlay.classList.add('mobile-menu-overlay');
  document.body.appendChild(menuOverlay);

  const menuLinks = document.querySelectorAll('.mobile-menu-list a');

  // Abrir menú
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  });

  // Cerrar menú
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll
  };

  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Cerrar al hacer clic en un enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('href').startsWith('#') || link.target !== '_blank') {
        closeMenu();
      }
    });
  });


  // Scroll suave solo para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});




// Cambiar pestañas del menú
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;

    // Remover active de botones y pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.menu-tab').forEach(tab => tab.classList.remove('active'));

    // Añadir active al seleccionado
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});
