  const parallaxCard = document.getElementById('cardParallax');

  function updateParallax() {
    const scrollY = window.scrollY;
    const offsetTop = parallaxCard.offsetTop;
    const height = parallaxCard.offsetHeight;
    const windowHeight = window.innerHeight;

    if (scrollY + windowHeight > offsetTop && scrollY < offsetTop + height) {
      const yOffset = (scrollY - offsetTop) * 0.3;
      parallaxCard.style.backgroundPosition = `center ${yOffset}px`;
    }
  }

  window.addEventListener('scroll', updateParallax);
  window.addEventListener('resize', updateParallax);