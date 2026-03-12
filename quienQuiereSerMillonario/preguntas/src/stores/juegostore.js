import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { preguntas } from '../data/preguntas.js'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export const useJuegoStore = defineStore('juego', () => {
  const $q = useQuasar()
  const router = useRouter()
  
  // Estado del juego
  const numeroPregunta = ref(0)
  const opcionesOcultas = ref([])
  const comodinesUsados = ref({
    cincuentaCincuenta: false,
    audiencia: false,
    llamarAmigo: false
  })

  //  Estado del jugador actual
  const nombreJugador = ref('')
  const tiempoInicio = ref(null)
  const tiempoFinal = ref(null)
  const respuestasCorrectas = ref(0)

  //   Historial de jugadores
  const historialJugadores = ref([])

  // Getters
  const preguntaActual = computed(() => {
    return preguntas[numeroPregunta.value]
  })

  const opcionesVisibles = computed(() => {
    return preguntaActual.value.opciones.map((opcion, index) => ({
      ...opcion,
      oculta: opcionesOcultas.value.includes(index)
    }))
  })

  //  Calcular puntaje
  const puntajeActual = computed(() => {
    const premios = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
                     200000, 300000, 500000, 750000, 1000000, 2000000, 3000000, 
                     5000000, 10000000, 50000000]
    return respuestasCorrectas.value > 0 ? premios[respuestasCorrectas.value - 1] : 0
  })

  //   Calcular tiempo transcurrido
  const tiempoTranscurrido = computed(() => {
    if (!tiempoInicio.value) return 0
    const fin = tiempoFinal.value || Date.now()
    return Math.floor((fin - tiempoInicio.value) / 1000) // segundos
  })

  //   Iniciar juego con nombre
  function iniciarJuego(nombre) {
    nombreJugador.value = nombre
    numeroPregunta.value = 0
    respuestasCorrectas.value = 0
    opcionesOcultas.value = []
    comodinesUsados.value = {
      cincuentaCincuenta: false,
      audiencia: false,
      llamarAmigo: false
    }
    tiempoInicio.value = Date.now()
    tiempoFinal.value = null
  }

  //  Siguiente pregunta
  function siguientePregunta() {
    respuestasCorrectas.value++
    
    if (numeroPregunta.value < preguntas.length - 1) {
      numeroPregunta.value++
      opcionesOcultas.value = []
    } else {
      // ¡GANÓ EL JUEGO!
      finalizarJuego(true)
    }
  }

  // Finalizar juego (ganar o perder)
  function finalizarJuego(gano = false) {
    tiempoFinal.value = Date.now()
    
    const jugador = {
      nombre: nombreJugador.value,
      puntaje: puntajeActual.value,
      respuestasCorrectas: respuestasCorrectas.value,
      totalPreguntas: preguntas.length,
      tiempo: tiempoTranscurrido.value,
      gano: gano,
      fecha: new Date().toLocaleString('es-CO'),
      timestamp: Date.now()
    }

    historialJugadores.value.push(jugador)
    
    // Redirigir a pantalla final
    router.push('/final')
  }

  //  Perder el juego
  function perderJuego() {
    finalizarJuego(false)
  }

  // Top 3 jugadores
  const top3Jugadores = computed(() => {
    return [...historialJugadores.value]
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 3)
  })

  function handleComodin50() {
    if (comodinesUsados.value.cincuentaCincuenta) return

    const incorrectas = preguntaActual.value.opciones
      .map((op, idx) => ({ ...op, index: idx }))
      .filter(op => !op.correcta)
    
    const paraOcultar = []
    while (paraOcultar.length < 2 && incorrectas.length > 0) {
      const randomIndex = Math.floor(Math.random() * incorrectas.length)
      paraOcultar.push(incorrectas[randomIndex].index)
      incorrectas.splice(randomIndex, 1)
    }
    
    opcionesOcultas.value = paraOcultar
    comodinesUsados.value.cincuentaCincuenta = true
  }

  function handleComodinAudiencia() {
    if (comodinesUsados.value.audiencia) return

    const correctaIndex = preguntaActual.value.opciones.findIndex(op => op.correcta)
    const porcentaje = Math.floor(60 + Math.random() * 30)
    const letra = ['A', 'B', 'C', 'D'][correctaIndex]
    
    comodinesUsados.value.audiencia = true
    
    $q.dialog({
      title: ' La Audiencia ha Votado',
      message: `El <strong>${porcentaje}%</strong> de la audiencia votó por la opción <strong>${letra}</strong>`,
      html: true,
      color: 'deep-purple',
      persistent: false,
      ok: {
        label: 'Entendido',
        color: 'deep-purple',
        unelevated: true,
        rounded: true
      },
      class: 'dialog-audiencia'
    })
  }

  function handleComodinAmigo() {
    if (comodinesUsados.value.llamarAmigo) return

    const correctaIndex = preguntaActual.value.opciones.findIndex(op => op.correcta)
    const letra = ['A', 'B', 'C', 'D'][correctaIndex]
    
    comodinesUsados.value.llamarAmigo = true
    
    $q.dialog({
      title: ' Llamando a un Amigo...',
      message: `"Hmm... no estoy 100% seguro, pero creo que la respuesta es la <strong>${letra}</strong>"`,
      html: true,
      color: 'amber',
      persistent: false,
      ok: {
        label: 'Gracias amigo!',
        color: 'amber',
        unelevated: true,
        rounded: true,
        icon: 'phone'
      },
      class: 'dialog-amigo'
    })
  }

  function reiniciarJuego() {
    nombreJugador.value = ''
    numeroPregunta.value = 0
    respuestasCorrectas.value = 0
    opcionesOcultas.value = []
    comodinesUsados.value = {
      cincuentaCincuenta: false,
      audiencia: false,
      llamarAmigo: false
    }
    tiempoInicio.value = null
    tiempoFinal.value = null
  }

  return {
    // Estado
    numeroPregunta,
    opcionesOcultas,
    comodinesUsados,
    nombreJugador,
    respuestasCorrectas,
    historialJugadores,
    
    // Computed
    preguntaActual,
    opcionesVisibles,
    puntajeActual,
    tiempoTranscurrido,
    top3Jugadores,
    
    // Métodos
    iniciarJuego,
    siguientePregunta,
    finalizarJuego,
    perderJuego,
    handleComodin50,
    handleComodinAudiencia,
    handleComodinAmigo,
    reiniciarJuego
  }
}, {
  persist: {
    key: 'juego-millonario',
    storage: localStorage,
    paths: [
      'numeroPregunta', 
      'opcionesOcultas', 
      'comodinesUsados',
      'nombreJugador',
      'respuestasCorrectas',
      'historialJugadores',
      'tiempoInicio',
      'tiempoFinal'
    ]
  }
})