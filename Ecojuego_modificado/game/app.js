document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll('.item');
    const contenedores = document.querySelectorAll('.contenedor');
    const puntuacionElemento = document.getElementById('puntuacion');
    const temporizadorElemento = document.getElementById('temporizador');

    const tituloElemento = document.querySelector('h1');
    const TIEMPO_INICIAL = 60;
    
    let puntuacion = 0;
    let elementoArrastrado = null;
    let tiempoRestante = TIEMPO_INICIAL;
    let temporizadorIntervalo; 
    let juegoActivo = true; 

    function iniciarTemporizador() {
        temporizadorElemento.textContent = tiempoRestante; 
        temporizadorIntervalo = setInterval(() => {
            tiempoRestante--;
            temporizadorElemento.textContent = tiempoRestante;

            if (tiempoRestante <= 0) {
                finalizarJuego('Se acabó el tiempo.');
            }
        }, 1000);
    }
    function finalizarJuego(mensaje) {
        if (!juegoActivo) return; 
        
        juegoActivo = false;
        clearInterval(temporizadorIntervalo);
        
        tituloElemento.style.color = '#1a5c9a';
        tituloElemento.textContent = `${mensaje} Puntuación final: ${puntuacion}`;

        document.body.classList.add('juego-terminado'); 

        items.forEach(item => {
            item.setAttribute('draggable', 'false');
        });

    }

    items.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', (e) => {
            if (!juegoActivo) return; 

            elementoArrastrado = item;
            e.dataTransfer.setData('text/plain', item.dataset.tipo);
            setTimeout(() => item.classList.add('dragging'), 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            elementoArrastrado = null;
        });
    });

    contenedores.forEach(contenedor => {
        contenedor.addEventListener('dragover', (e) => {
            if (!juegoActivo) return;
            e.preventDefault(); 
            contenedor.classList.add('drag-over');
        });

        contenedor.addEventListener('dragleave', () => {
            if (!juegoActivo) return;
            contenedor.classList.remove('drag-over');
        });
        contenedor.addEventListener('drop', (e) => {
            if (!juegoActivo) return;
            e.preventDefault();
            contenedor.classList.remove('drag-over');
            if (elementoArrastrado) {
                const tipoBasura = elementoArrastrado.dataset.tipo;
                const tipoAceptado = contenedor.dataset.acepta;

                if (tipoBasura === tipoAceptado) {
                    const puntosbase = 10;
                    const factortiempo = tiempoRestante / TIEMPO_INICIAL;
                    let puntosobtenidos = Math.round(puntosbase * factortiempo);
                    puntosobtenidos = Math.max(2, puntosobtenidos); 
                    puntuacion += puntosobtenidos;
                    elementoArrastrado.remove();
                    const basuraContainer = document.getElementById('basura-container');
                    if (basuraContainer && basuraContainer.children.length === 0) {
                        finalizarJuego('Toda la basura fue reciclada.');
                    }
                } else {
                    puntuacion = Math.max(0, puntuacion - 5);
                }
                
                puntuacionElemento.textContent = puntuacion;
                elementoArrastrado = null;
            }
        });
    });

    puntuacionElemento.textContent = puntuacion; 
    iniciarTemporizador();
});