<template>
  <div class="fondo">
    <!-- Partículas animadas -->
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>

    <div class="contenido-juego">
      <!-- Video petrosky -->
      <div class="video-container">
        <video 
          class="video-presentador"
          autoplay 
          loop 
          muted
          playsinline
        >
          <source src="../assets/ESTATICO.mp4" type="video/mp4">
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <barraPremio :preguntaActual="juegoStore.numeroPregunta" />

      <!-- Contenedor centrado para comodines y pregunta -->
      <div class="seccion-principal">
        <comodines />
        <Pregunta :texto="juegoStore.preguntaActual.texto" />
      </div>

      <Respuestas
        :opciones="juegoStore.opcionesVisibles"
        @respuesta="validarRespuesta"
      />
    </div>
  </div>
</template>

<script setup>
import Pregunta from '../components/pregunta.vue'
import Respuestas from '../components/listaRespuestas.vue'
import comodines from '../components/comodines.vue'
import barraPremio from '../components/barraPremio.vue'
import { useJuegoStore } from '../stores/juegostore'

const juegoStore = useJuegoStore()

function validarRespuesta(correcta) {
  if (correcta === true) {
    juegoStore.siguientePregunta()
  } else {
    // Perder el juego
    juegoStore.perderJuego()
  }
}
</script>

<style scoped>
.fondo {
  background: radial-gradient(ellipse at center, #1a0b3a 0%, #0a0520 50%, #000000 100%);
  
  width: 100vw;
  min-height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  padding: 15px 20px 40px;
  position: relative;
  box-sizing: border-box;
}

/* Efecto de nebulosa */
.fondo::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(0, 191, 255, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 105, 180, 0.2) 0%, transparent 60%);
  animation: nebula 20s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes nebula {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-5%, 5%) scale(1.1);
  }
}

/* Partículas - Estrellas pequeñas rápidas */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
  pointer-events: none;
}

.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: white;
  box-shadow: 
    5vw 10vh white, 15vw 5vh white, 25vw 15vh white, 35vw 8vh white, 45vw 20vh white,
    55vw 25vh white, 65vw 12vh white, 75vw 30vh white, 85vw 18vh white, 95vw 35vh white,
    8vw 40vh white, 18vw 45vh white, 28vw 38vh white, 38vw 50vh white, 48vw 42vh white,
    58vw 55vh white, 68vw 48vh white, 78vw 60vh white, 88vw 52vh white, 98vw 65vh white,
    3vw 70vh white, 13vw 75vh white, 23vw 68vh white, 33vw 80vh white, 43vw 72vh white,
    53vw 85vh white, 63vw 78vh white, 73vw 90vh white, 83vw 82vh white, 93vw 95vh white,
    10vw 22vh white, 20vw 32vh white, 30vw 62vh white, 40vw 88vh white, 50vw 28vh white,
    60vw 58vh white, 70vw 8vh white, 80vw 38vh white, 90vw 68vh white, 12vw 78vh white,
    22vw 18vh white, 32vw 48vh white, 42vw 88vh white, 52vw 8vh white, 62vw 38vh white,
    72vw 68vh white, 82vw 28vh white, 92vw 58vh white, 2vw 48vh white, 96vw 18vh white;
  animation: float 50s linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(10vw);
  }
}

/* Partículas medianas más lentas */
.stars2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.stars2::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  background: rgba(135, 206, 250, 0.8);
  box-shadow: 
    12vw 15vh rgba(135, 206, 250, 0.8), 24vw 35vh rgba(135, 206, 250, 0.8),
    36vw 25vh rgba(135, 206, 250, 0.8), 48vw 55vh rgba(135, 206, 250, 0.8),
    60vw 45vh rgba(135, 206, 250, 0.8), 72vw 65vh rgba(135, 206, 250, 0.8),
    84vw 15vh rgba(135, 206, 250, 0.8), 96vw 75vh rgba(135, 206, 250, 0.8),
    8vw 85vh rgba(135, 206, 250, 0.8), 16vw 5vh rgba(135, 206, 250, 0.8),
    28vw 95vh rgba(135, 206, 250, 0.8), 40vw 35vh rgba(135, 206, 250, 0.8),
    52vw 75vh rgba(135, 206, 250, 0.8), 64vw 25vh rgba(135, 206, 250, 0.8),
    76vw 85vh rgba(135, 206, 250, 0.8), 88vw 45vh rgba(135, 206, 250, 0.8),
    4vw 55vh rgba(135, 206, 250, 0.8), 20vw 65vh rgba(135, 206, 250, 0.8),
    32vw 5vh rgba(135, 206, 250, 0.8), 44vw 95vh rgba(135, 206, 250, 0.8),
    56vw 15vh rgba(135, 206, 250, 0.8), 68vw 85vh rgba(135, 206, 250, 0.8),
    80vw 35vh rgba(135, 206, 250, 0.8), 92vw 55vh rgba(135, 206, 250, 0.8),
    14vw 75vh rgba(135, 206, 250, 0.8), 26vw 45vh rgba(135, 206, 250, 0.8);
  animation: float2 80s linear infinite;
}

@keyframes float2 {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(-15vw);
  }
}

/* Partículas grandes brillantes */
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.stars3::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  background: rgba(186, 85, 211, 0.9);
  border-radius: 50%;
  box-shadow: 
    10vw 20vh 2px rgba(186, 85, 211, 0.9),
    30vw 40vh 2px rgba(186, 85, 211, 0.9),
    50vw 60vh 2px rgba(186, 85, 211, 0.9),
    70vw 80vh 2px rgba(186, 85, 211, 0.9),
    90vw 10vh 2px rgba(186, 85, 211, 0.9),
    20vw 70vh 2px rgba(186, 85, 211, 0.9),
    40vw 30vh 2px rgba(186, 85, 211, 0.9),
    60vw 90vh 2px rgba(186, 85, 211, 0.9),
    80vw 50vh 2px rgba(186, 85, 211, 0.9),
    15vw 85vh 2px rgba(186, 85, 211, 0.9),
    35vw 15vh 2px rgba(186, 85, 211, 0.9),
    55vw 45vh 2px rgba(186, 85, 211, 0.9),
    75vw 75vh 2px rgba(186, 85, 211, 0.9),
    95vw 25vh 2px rgba(186, 85, 211, 0.9),
    5vw 55vh 2px rgba(186, 85, 211, 0.9),
    25vw 95vh 2px rgba(186, 85, 211, 0.9),
    45vw 5vh 2px rgba(186, 85, 211, 0.9),
    65vw 35vh 2px rgba(186, 85, 211, 0.9),
    85vw 65vh 2px rgba(186, 85, 211, 0.9),
    12vw 42vh 2px rgba(186, 85, 211, 0.9);
  animation: float3 100s linear infinite, twinkle 3s ease-in-out infinite;
}

@keyframes float3 {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(20vw);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Contenido del juego */
.contenido-juego {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0;
  box-sizing: border-box;
}

/* Sección principal - Comodines y Pregunta centrados */
.seccion-principal {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 10px;
  flex-shrink: 0;
}

/* Estilos del video */
.video-container {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.3),
    0 0 40px rgba(255, 215, 0, 0.2);
  margin-bottom: 5px;
  flex-shrink: 0;
}

.video-presentador {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 15px;
}

/* ========== RESPONSIVIDAD ========== */


@media (max-width: 1200px) {
  .contenido-juego {
    max-width: 100%;
    gap: 10px;
  }
  
  .seccion-principal {
    max-width: 100%;
    gap: 10px;
  }
}


@media (max-width: 1024px) {
  .fondo {
    padding: 12px 15px 35px;
  }
  
  .contenido-juego {
    gap: 8px;
  }
  
  .seccion-principal {
    gap: 8px;
    padding: 0 8px;
  }
  
  .video-container {
    max-width: 380px;
  }
}


@media (max-width: 768px) {
  .fondo {
    padding: 10px 10px 30px;
  }
  
  .contenido-juego {
    gap: 8px;
  }
  
  .seccion-principal {
    gap: 8px;
    padding: 0 5px;
  }
  
  .video-container {
    max-width: 350px;
  }
}


@media (max-width: 640px) {
  .fondo {
    padding: 8px 8px 30px;
  }
  
  .contenido-juego {
    gap: 6px;
  }
  
  .seccion-principal {
    gap: 6px;
    padding: 0;
    width: 98%;
  }
  
  .video-container {
    max-width: 320px;
  }
}


@media (max-width: 480px) {
  .fondo {
    padding: 8px 5px 30px;
  }
  
  .contenido-juego {
    gap: 5px;
  }
  
  .seccion-principal {
    gap: 5px;
    width: 100%;
  }
  
  .video-container {
    max-width: 280px;
  }
}


@media (max-width: 375px) {
  .fondo {
    padding: 5px 3px 30px;
  }
  
  .contenido-juego {
    gap: 4px;
  }
  
  .seccion-principal {
    gap: 4px;
  }
  
  .video-container {
    max-width: 250px;
  }
}


@media (max-width: 768px) and (orientation: landscape) {
  .fondo {
    padding: 10px;
  }
  
  .contenido-juego {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .video-container {
    max-width: 300px;
    margin-bottom: 0;
  }
  
  .seccion-principal {
    flex: 1;
    min-width: 300px;
    gap: 10px;
  }
}
</style>