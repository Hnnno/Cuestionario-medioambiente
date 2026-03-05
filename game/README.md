# Trash Stage 🌱

Un juego educativo de navegador enfocado en la gestión de residuos y la concientización ambiental, enmarcado en la problemática de contaminación urbana de la ciudad de Merlo, Buenos Aires.

---

## Descripción

Trash Stage es un juego de múltiples niveles diseñado para enseñar a los jugadores cómo clasificar y reciclar correctamente distintos tipos de residuos. Combina mecánicas de arrastrar y soltar con un cuestionario final reflexivo, animando a los jugadores a pensar críticamente sobre los hábitos de reciclaje sin el temor de perder el progreso.

---

## Jugabilidad

El juego consta de **3 niveles**, cada uno con una mecánica distinta:

### Nivel 1 — Arrastrar y clasificar
- Arrastrá los residuos hacia su contenedor de reciclaje correcto (vidrio, plástico, papel, orgánico).
- Hay un temporizador activo: el nivel termina si se acaba el tiempo.
- Sin sistema de vidas: los errores no terminan el nivel.
- Se suman puntos por cada clasificación correcta.

### Nivel 2 — Arrastrar y clasificar (modo difícil)
- Misma mecánica de arrastre que el Nivel 1.
- **3 respuestas incorrectas** obligan a reiniciar el nivel.
- Mayor dificultad para reforzar los hábitos correctos de reciclaje.

### Nivel 3 — Cuestionario
- Un cuestionario de opción múltiple sobre conocimientos de reciclaje.
- Sin condición de derrota: diseñado para la reflexión, no la competencia.
- El progreso de los niveles anteriores se conserva sin importar el resultado del cuestionario.

---

## Estructura del proyecto

```
Ecojuego/
├── README.md
├── imagenes/
│   └── banana.gif
└── game/
    ├── index.html          # Menú principal / punto de entrada
    ├── juego.html          # Nivel 1
    ├── segundonivel.html   # Nivel 2
    ├── final.html          # Nivel 3 (Cuestionario)
    ├── app.js              # Lógica del Nivel 1
    ├── app2.js             # Lógica del Nivel 2
    ├── app3.js             # Lógica del Nivel 3
    ├── estilos.css         # Estilos del Nivel 1
    ├── segundo.css         # Estilos del Nivel 2
    ├── tercer.css          # Estilos del Nivel 3
    └── detalles.css        # Estilos globales / índice
```

---

## Cómo ejecutar

No requiere instalación ni compilación. Simplemente abrí `game/index.html` en cualquier navegador moderno.

```
game/index.html  ←  Empezar acá
```

> Navegadores recomendados: Chrome, Firefox, Edge (versiones recientes).

---

## Contexto y motivación

Este proyecto fue desarrollado con una preocupación ambiental local como eje central. La ciudad de Merlo enfrenta un grave problema de contaminación causado por el manejo inadecuado de residuos. Los sitios de acumulación ilegal de basura, conocidos como "Ecopuntos", generan humo tóxico por quemas clandestinas que afectan directamente la salud respiratoria de los vecinos.

El objetivo de este juego es concientizar sobre el reciclaje correcto como un paso concreto y accesible hacia una comunidad más limpia y saludable.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)

---

## Nota de privacidad

Este repositorio fue modificado para proteger la privacidad de sus autores. Se eliminaron referencias personales del código fuente y los archivos del proyecto.

---

## Licencia

Este proyecto fue creado con fines educativos. Podés usarlo o adaptarlo libremente para iniciativas de concientización ambiental sin fines de lucro.
