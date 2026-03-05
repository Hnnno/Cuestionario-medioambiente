document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll('.item');
    const contenedores = document.querySelectorAll('.contenedor');
    const puntuacionElemento = document.getElementById('puntuacion');
    const temporizadorElemento = document.getElementById('temporizador');
    const tituloElemento = document.querySelector('h1');
    const estadoContaminacionElemento = document.getElementById('estado-contaminacion');

    const TIEMPO_INICIAL = 70;
    
    let puntuacion = 0;
    let elementoArrastrado = null;
    let tiempoRestante = TIEMPO_INICIAL;
    let temporizadorIntervalo; 
    let juegoActivo = true; 
    
    let contenedoresContaminados = {
        papel: false,
        vidrio: false,
        plastico: false,
        organico: false,
        rechazo: false
    };

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
    
    function actualizarEstadoContaminacion() {
        const totalContaminados = Object.values(contenedoresContaminados).filter(c => c).length;
        
        if (totalContaminados > 0) {
            estadoContaminacionElemento.textContent = `¡${totalContaminados} Contaminado(s)!`;
            estadoContaminacionElemento.classList.add('contaminado');
        } else {
            estadoContaminacionElemento.textContent = 'Limpio';
            estadoContaminacionElemento.classList.remove('contaminado');
        }
    
        const LIMITE_CONTAMINACION = 3;
        if (totalContaminados >= LIMITE_CONTAMINACION) {
            finalizarJuego("Se contaminaron 3 contenedores. El juego se terminó.");
        }
    }

    function finalizarJuego(mensaje) {
        if (!juegoActivo) return; 
        
        juegoActivo = false;
        clearInterval(temporizadorIntervalo);
        
        const mensajeFinal = mensaje.includes('has terminsdo de reciclar') 
            ? `Reciclaje completado. ${mensaje.replace('has terminsdo de reciclar', '')}` 
            : mensaje;
            
        tituloElemento.style.color = '#1a5c9a';
        tituloElemento.textContent = `${mensajeFinal} Puntuación final: ${puntuacion}`;

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
                    
                    let puntosObtenidos;
                    const esContaminado = contenedoresContaminados[tipoAceptado];

                    if (esContaminado) {
                        puntosObtenidos = 0; 
                        
                    } else {
                        const puntosBase = 10;
                        const factorTiempo = tiempoRestante / TIEMPO_INICIAL;
                        puntosObtenidos = Math.round(puntosBase * factorTiempo);
                        puntosObtenidos = Math.max(2, puntosObtenidos); 
                    }
                    
                    puntuacion += puntosObtenidos;
                    elementoArrastrado.remove();

                    const basuraContainer = document.getElementById('basura-container');
                    if (basuraContainer && basuraContainer.children.length === 0) {
                        finalizarJuego('has terminsdo de reciclar');
                    }
                } else {
                    puntuacion = Math.max(0, puntuacion - 15);
                    if (tipoAceptado !== 'rechazo' && !contenedoresContaminados[tipoAceptado]) {
                        contenedoresContaminados[tipoAceptado] = true;
                        contenedor.classList.add('contaminado');
                        actualizarEstadoContaminacion();
                    }
                    
                }
                
                puntuacionElemento.textContent = puntuacion;
                elementoArrastrado = null;
            }
        });
    });

    puntuacionElemento.textContent = puntuacion; 
    actualizarEstadoContaminacion();
    iniciarTemporizador();
});