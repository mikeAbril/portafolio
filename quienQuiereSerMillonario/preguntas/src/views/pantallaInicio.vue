<template>
  <div class="fondo">
    <!-- Partículas animadas -->
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    
    <div class="logo-container">
      <div class="logo-wrapper">
        <img 
          src="../assets/logonobg.png" 
          alt="Logo Millonario" 
          class="logo"
        />
        
        <!--  Input de nombre -->
        <div class="nombre-container">
          <q-input
            v-model="nombreJugador"
            outlined
            label="Ingresa tu nombre"
            placeholder="Tu nombre aquí..."
            class="input-nombre"
            dark
            color="amber"
            label-color="amber"
            :rules="[val => val && val.length > 0 || 'Por favor ingresa tu nombre']"
            @keyup.enter="jugar"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="amber" />
            </template>
          </q-input>
          
          <q-btn
            @click="jugar"
            unelevated
            rounded
            size="lg"
            class="btn-jugar"
            :disable="!nombreJugador || nombreJugador.trim() === ''"
          >
            <span class="btn-texto">JUGAR</span>
            <q-icon right name="play_arrow" size="md" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useJuegoStore } from '../stores/juegostore'

const router = useRouter()
const juegoStore = useJuegoStore()
const audioReproducido = ref(false)
const nombreJugador = ref('')

let audioBienvenidos = null

function reproducirBienvenidos() {
  if (audioBienvenidos) return
  audioBienvenidos = new Audio(
    new URL('../assets/bienvenidos.mp3', import.meta.url).href
  )
  audioBienvenidos.play().catch(err => {
    console.log('Error al reproducir bienvenidos.mp3:', err)
  })

  audioBienvenidos.addEventListener('ended', () => {
    const audioAmbiente = new Audio(
      new URL('../assets/SONIDOAMBIENTE.mp3', import.meta.url).href
    )
    audioAmbiente.loop = true
    audioAmbiente.volume = 0.3
    audioAmbiente.play().catch(err => {
      console.log('Error al reproducir SONIDOAMBIENTE.mp3:', err)
    })
  })
}

function jugar() {
  if (!nombreJugador.value || nombreJugador.value.trim() === '') return
  
  if (!audioReproducido.value) {
    audioReproducido.value = true
    reproducirBienvenidos()
  }

  // Iniciar juego con el nombre del jugador
  juegoStore.iniciarJuego(nombreJugador.value.trim())
  router.push('/juego')
}
</script>

<style scoped>
.fondo {
  background: radial-gradient(ellipse at center, #1a0b3a 0%, #0a0520 50%, #000000 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: relative;
}

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
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-5%, 5%) scale(1.1); }
}

.stars, .stars2, .stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
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
    58vw 55vh white, 68vw 48vh white, 78vw 60vh white, 88vw 52vh white, 98vw 65vh white;
  animation: float 50s linear infinite;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-100vh) translateX(10vw); }
}

.stars2::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(135, 206, 250, 0.8);
  box-shadow: 
    12vw 15vh rgba(135, 206, 250, 0.8), 24vw 35vh rgba(135, 206, 250, 0.8),
    36vw 25vh rgba(135, 206, 250, 0.8), 48vw 55vh rgba(135, 206, 250, 0.8);
  animation: float2 80s linear infinite;
}

@keyframes float2 {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-100vh) translateX(-15vw); }
}

.stars3::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(186, 85, 211, 0.9);
  border-radius: 50%;
  box-shadow: 
    10vw 20vh 2px rgba(186, 85, 211, 0.9),
    30vw 40vh 2px rgba(186, 85, 211, 0.9);
  animation: float3 100s linear infinite, twinkle 3s ease-in-out infinite;
}

@keyframes float3 {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-100vh) translateX(20vw); }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.logo-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.logo-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.logo {
  width: 800px;
  height: auto;
  max-width: 90%;
  object-fit: contain;
  border-radius: 50%;
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.4));
  animation: logo-pulse 3s ease-in-out infinite;
}

@keyframes logo-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 50px rgba(255, 215, 0, 0.7));
  }
}

/*  Estilos del contenedor de nombre */
.nombre-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  align-items: center;
}

.input-nombre {
  width: 100%;
  font-size: 18px;
}

.input-nombre :deep(.q-field__control) {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.input-nombre :deep(.q-field__native) {
  color: #FFD700;
  font-weight: bold;
  text-align: center;
}

.btn-jugar {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1a0b3a;
  font-weight: bold;
  font-size: 20px;
  padding: 15px 50px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  transition: all 0.3s ease;
}

.btn-jugar:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
}

.btn-jugar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-texto {
  letter-spacing: 3px;
  margin-right: 10px;
}
</style>