document.addEventListener('DOMContentLoaded', function() {
    const texto = "AZCINO";
    const elemento = document.getElementById('typewriter');
    let i = 0;
    const velocidad = 150; // milisegundos entre letras
    const retrasoInicio = 1000; // retraso de 1 segundo antes de empezar

    function typeWriter() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(typeWriter, velocidad);
        }
    }

    setTimeout(typeWriter, retrasoInicio);
});


document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  track.innerHTML += track.innerHTML;
});

