<template>
  <div class="contenedor-respuestas">
    <div 
      v-for="(opcion, index) in opciones" 
      :key="index"
      v-show="!opcion.oculta"
      class="opcion-respuesta"
      :class="[
        `opcion-${getLetra(index)}`,
        {
          'seleccionada': opcionSeleccionada === index && !confirmada,
          'correcta': confirmada && opcion.correcta,
          'incorrecta': confirmada && opcionSeleccionada === index && !opcion.correcta,
          'bloqueada': confirmada
        }
      ]"
      @click="manejarClick(index, opcion.correcta)"
    >
      <!-- Borde hexagonal -->
      <div class="hexagono-borde"></div>
      
      <!-- Contenido -->
      <div class="contenido-opcion">
        <span class="letra">{{ getLetra(index) }}:</span>
        <span class="texto">{{ opcion.texto }}</span>
      </div>

      <!-- Punto indicador -->
      <div class="punto-indicador"></div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  opciones: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['respuesta'])

const opcionSeleccionada = ref(null)
const confirmada = ref(false)
let audioSeguro = null
let audioAsustado = null
let temporizadorAsustado = null

function getLetra(index) {
  return ['A', 'B', 'C', 'D'][index]
}

function reproducirSeguroYAsustado() {
  // Si ya se reprodujo, no hacer nadaaaa
  if (audioSeguro) return
  
  // Reproducir SEGURO.mp3 primero
  audioSeguro = new Audio(
    new URL('../assets/SEGURO.mp3', import.meta.url).href
  )
  audioSeguro.play().catch(err => {
    console.log('Error al reproducir SEGURO.mp3:', err)
  })
  
  // Programar ASUSTADO.mp3 10 segundos
  temporizadorAsustado = setTimeout(() => {
    // Solo reproducir si todavía no se ha confirmado la respuesta
    if (!confirmada.value) {
      audioAsustado = new Audio(
        new URL('../assets/ASUSTADO.mp3', import.meta.url).href
      )
      audioAsustado.play().catch(err => {
        console.log('Error al reproducir ASUSTADO.mp3:', err)
      })
    }
  }, 10000) // 10 segundos 
}

function limpiarAudios() {
  // Limpiar temporizador si existe
  if (temporizadorAsustado) {
    clearTimeout(temporizadorAsustado)
    temporizadorAsustado = null
  }
  
  // Detener audios si están reproduciéndose
  if (audioSeguro) {
    audioSeguro.pause()
    audioSeguro = null
  }
  
  if (audioAsustado) {
    audioAsustado.pause()
    audioAsustado = null
  }
}

function manejarClick(index, esCorrecta) {
  // Si ya confirmó, no hacer nada
  if (confirmada.value) return
  
  // Primer click: Seleccionar (naranja)
  if (opcionSeleccionada.value === null) {
    opcionSeleccionada.value = index
    reproducirSeguroYAsustado()
    return
  }

  
  
  if (!esCorrecta) {
    setTimeout(()=>{
      router.push('/final')
    }, 2000)
  }

  // Si clickea la misma opción por segunda vez: Confirmar
  if (opcionSeleccionada.value === index) {
    confirmada.value = true
    limpiarAudios() // Detener temporizador y audios al confirmar
    
    // Esperar 2 segundos antes de pasar a la siguiente pregunta
    setTimeout(() => {
      emit('respuesta', esCorrecta)
      // Reset para la siguiente pregunta
      opcionSeleccionada.value = null
      confirmada.value = false
    }, 2000)
  } else {
    // Si clickea una diferente: cambiar selección
    opcionSeleccionada.value = index
  }
}
</script>

<style scoped>
.contenedor-respuestas {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px;
}

.opcion-respuesta {
  position: relative;
  height: 70px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.opcion-respuesta:hover:not(.seleccionada):not(.correcta):not(.incorrecta):not(.bloqueada) {
  transform: scale(1.02);
}

.opcion-respuesta.bloqueada {
  cursor: not-allowed;
}

/* Hexágono/Borde */
.hexagono-borde {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.8) 0%, 
    rgba(147, 51, 234, 0.6) 100%);
  clip-path: polygon(
    20px 0%, 
    calc(100% - 20px) 0%, 
    100% 50%, 
    calc(100% - 20px) 100%, 
    20px 100%, 
    0% 50%
  );
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.opcion-respuesta:hover:not(.bloqueada) .hexagono-borde {
  box-shadow: 
    0 0 30px rgba(59, 130, 246, 0.8),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
}

/* Contenido interno */
.contenido-opcion {
  position: absolute;
  inset: 3px;
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.95) 0%, 
    rgba(15, 23, 42, 0.95) 100%);
  clip-path: polygon(
    20px 0%, 
    calc(100% - 20px) 0%, 
    100% 50%, 
    calc(100% - 20px) 100%, 
    20px 100%, 
    0% 50%
  );
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 40px;
  transition: all 0.3s ease;
}

.letra {
  color: #FFD700;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  min-width: 30px;
}

.texto {
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Punto indicador izquierdo */
.punto-indicador {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #FFD700;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

/* Estado: Seleccionada (Naranja) - Primer Click */
.opcion-respuesta.seleccionada .hexagono-borde {
  background: linear-gradient(135deg, 
    rgba(249, 115, 22, 0.9) 0%, 
    rgba(234, 88, 12, 0.8) 100%);
  box-shadow: 
    0 0 40px rgba(249, 115, 22, 0.8),
    inset 0 0 30px rgba(255, 255, 255, 0.3);
  animation: pulso-naranja 1.5s ease-in-out infinite;
}

.opcion-respuesta.seleccionada .contenido-opcion {
  background: linear-gradient(135deg, 
    rgba(154, 52, 18, 0.95) 0%, 
    rgba(124, 45, 18, 0.95) 100%);
}

@keyframes pulso-naranja {
  0%, 100% {
    box-shadow: 
      0 0 40px rgba(249, 115, 22, 0.8),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 
      0 0 60px rgba(249, 115, 22, 1),
      inset 0 0 40px rgba(255, 255, 255, 0.4);
  }
}

/* Estado: rtaCorrecta (Verde) - Segundo Click */
.opcion-respuesta.correcta .hexagono-borde {
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.9) 0%, 
    rgba(22, 163, 74, 0.8) 100%);
  box-shadow: 
    0 0 50px rgba(34, 197, 94, 1),
    inset 0 0 40px rgba(255, 255, 255, 0.4);
  animation: pulso-verde 0.5s ease-in-out 4;
}

.opcion-respuesta.correcta .contenido-opcion {
  background: linear-gradient(135deg, 
    rgba(20, 83, 45, 0.95) 0%, 
    rgba(14, 70, 38, 0.95) 100%);
}

@keyframes pulso-verde {
  0%, 100% {
    box-shadow: 
      0 0 50px rgba(34, 197, 94, 1),
      inset 0 0 40px rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 80px rgba(34, 197, 94, 1),
      inset 0 0 60px rgba(255, 255, 255, 0.6);
  }
}

/* Estado: RTA Incorrecta (Roja) - Segundo Click */
.opcion-respuesta.incorrecta .hexagono-borde {
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.9) 0%, 
    rgba(220, 38, 38, 0.8) 100%);
  box-shadow: 
    0 0 50px rgba(239, 68, 68, 1),
    inset 0 0 40px rgba(255, 255, 255, 0.4);
  animation: pulso-rojo 0.5s ease-in-out 4;
}

.opcion-respuesta.incorrecta .contenido-opcion {
  background: linear-gradient(135deg, 
    rgba(127, 29, 29, 0.95) 0%, 
    rgba(109, 26, 26, 0.95) 100%);
}

@keyframes pulso-rojo {
  0%, 100% {
    box-shadow: 
      0 0 50px rgba(239, 68, 68, 1),
      inset 0 0 40px rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 80px rgba(239, 68, 68, 1),
      inset 0 0 60px rgba(255, 255, 255, 0.6);
  }
}

/* Responsividaad */
@media (max-width: 768px) {
  .contenedor-respuestas {
    grid-template-columns: 1fr;
  }
  
  .texto {
    font-size: 16px;
  }
  
  .letra {
    font-size: 20px;
  }
}
</style>