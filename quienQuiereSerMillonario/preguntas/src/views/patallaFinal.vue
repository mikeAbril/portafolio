<template>
  <div class="fondo">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>

    <div class="contenido-final">
      <!-- Título -->
      <h1 class="titulo-final">
        {{ ultimoJugador?.gano 
          ? ' ¡FELICITACIONES! ' 
          : ' Fin del Juego / Game Over' 
        }}
      </h1>

      <!-- Estadísticas del jugador actual -->
      <div class="stats-jugador">
        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-icon">👤</div>
            <div class="stat-label">Jugador</div>
            <div class="stat-value">{{ ultimoJugador?.nombre || 'Sin nombre' }}</div>
          </q-card-section>
        </q-card>

        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-icon">💰</div>
            <div class="stat-label">Puntaje</div>
            <div class="stat-value">${{ (ultimoJugador?.puntaje || 0).toLocaleString() }}</div>
          </q-card-section>
        </q-card>

        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-icon">✅</div>
            <div class="stat-label">Respuestas</div>
            <div class="stat-value">{{ ultimoJugador?.respuestasCorrectas || 0 }}/20</div>
          </q-card-section>
        </q-card>

        <q-card class="stat-card">
          <q-card-section>
            <div class="stat-icon">⏱️</div>
            <div class="stat-label">Tiempo</div>
            <div class="stat-value">{{ formatTiempo(ultimoJugador?.tiempo || 0) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- TABLA DE RANKING -->
      <div class="tabla-container">
        <q-table
          :rows="rankingJugadores"
          :columns="columns"
          row-key="timestamp"
          title="🏆 Ranking de Jugadores"
          :rows-per-page-options="[5, 10, 20, 50]"
          :pagination="{ rowsPerPage: 10 }"
          class="tabla-ranking"
          dark
          bordered
          flat
        >
          <!-- Columna de posición con medallas -->
          <template v-slot:body-cell-posicion="props">
            <q-td :props="props">
              <div class="posicion-cell">
                <span v-if="props.row.posicion === 1" class="medalla oro">🥇</span>
                <span v-else-if="props.row.posicion === 2" class="medalla plata">🥈</span>
                <span v-else-if="props.row.posicion === 3" class="medalla bronce">🥉</span>
                <span v-else class="numero-posicion">{{ props.row.posicion }}</span>
              </div>
            </q-td>
          </template>

          <!-- Columna de puntaje con formato -->
          <template v-slot:body-cell-puntaje="props">
            <q-td :props="props">
              <q-chip 
                :color="getPuntajeColor(props.row.posicion)" 
                text-color="white"
                icon="paid"
                size="md"
              >
                ${{ props.value.toLocaleString() }}
              </q-chip>
            </q-td>
          </template>

          <!-- Columna de estado (ganó/perdió) -->
          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <q-badge 
                :color="props.value ? 'positive' : 'negative'"
                :label="props.value ? '🏆 Ganó' : '❌ Perdió'"
                size="md"
              />
            </q-td>
          </template>

          <!-- Resaltar al jugador actual -->
          <template v-slot:body="props">
            <q-tr 
              :props="props"
              :class="{ 'jugador-actual': esJugadorActual(props.row) }"
            >
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <template v-if="col.name === 'posicion'">
                  <div class="posicion-cell">
                    <span v-if="props.row.posicion === 1" class="medalla oro">🥇</span>
                    <span v-else-if="props.row.posicion === 2" class="medalla plata">🥈</span>
                    <span v-else-if="props.row.posicion === 3" class="medalla bronce">🥉</span>
                    <span v-else class="numero-posicion">{{ props.row.posicion }}</span>
                  </div>
                </template>
                <template v-else-if="col.name === 'puntaje'">
                  <q-chip 
                    :color="getPuntajeColor(props.row.posicion)" 
                    text-color="white"
                    icon="paid"
                    size="md"
                  >
                    ${{ col.value.toLocaleString() }}
                  </q-chip>
                </template>
                <template v-else-if="col.name === 'estado'">
                  <q-badge 
                    :color="col.value ? 'positive' : 'negative'"
                    :label="col.value ? '🏆 Ganó' : '❌ Perdió'"
                    size="md"
                  />
                </template>
                <template v-else>
                  {{ col.value }}
                </template>
              </q-td>
            </q-tr>
          </template>

          <!-- Mensaje cuando no hay datos -->
          <template v-slot:no-data>
            <div class="text-center q-pa-md">
              <q-icon name="emoji_events" size="3em" color="amber" />
              <p class="text-h6" style="color: #FFD700; margin-top: 10px;">
                ¡prueba!
              </p>
              <p style="color: rgba(255,255,255,0.7);">
               prueba
              </p>
            </div>
          </template>
        </q-table>
      </div>

      <!-- Botón volver al menú -->
      <q-btn 
        class="btn-menu"
        @click="volverInicio"
        unelevated
        rounded
        size="lg"
      > 
        <q-icon left name="home" />
        MENÚ PRINCIPAL 
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useJuegoStore } from '../stores/juegostore'
import { computed } from 'vue'

const router = useRouter()
const juegoStore = useJuegoStore()

// Último jugador registrado
const ultimoJugador = computed(() => {
  const jugadores = juegoStore.historialJugadores
  return jugadores.length > 0 ? jugadores[jugadores.length - 1] : null
})

// Columnas de la tabla
const columns = [
  {
    name: 'posicion',
    label: 'Posición',
    field: 'posicion',
    align: 'center',
    sortable: false,
    style: 'width: 100px'
  },
  {
    name: 'nombre',
    required: true,
    label: 'Jugador',
    align: 'left',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'puntaje',
    label: 'Puntaje',
    field: 'puntaje',
    align: 'center',
    sortable: true,
    sort: (a, b) => b - a
  },
  {
    name: 'respuestasCorrectas',
    label: 'Respuestas Correctas',
    field: 'respuestasCorrectas',
    align: 'center',
    sortable: true
  },
  {
    name: 'tiempo',
    label: 'Tiempo',
    field: row => formatTiempo(row.tiempo),
    align: 'center',
    sortable: true
  },
  {
    name: 'estado',
    label: 'Estado',
    field: 'gano',
    align: 'center',
    sortable: true
  },
  {
    name: 'fecha',
    label: 'Fecha',
    field: 'fecha',
    align: 'center',
    sortable: true
  }
]

// Ranking ordenado con posiciones
const rankingJugadores = computed(() => {
  return [...juegoStore.historialJugadores]
    .sort((a, b) => b.puntaje - a.puntaje)
    .map((jugador, index) => ({
      ...jugador,
      posicion: index + 1
    }))
})

function formatTiempo(segundos) {
  if (!segundos) return '0:00'
  const mins = Math.floor(segundos / 60)
  const secs = segundos % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function getPuntajeColor(posicion) {
  if (posicion === 1) return 'amber-9'      // Oro
  if (posicion === 2) return 'grey-6'       // Plata
  if (posicion === 3) return 'deep-orange'  // Bronce
  return 'primary'
}

// Verificar si es el jugador actual
function esJugadorActual(jugador) {
  return ultimoJugador.value && jugador.timestamp === ultimoJugador.value.timestamp
}

function volverInicio() {
  juegoStore.reiniciarJuego()
  router.push('/')
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
  padding: 20px;
  position: relative;
  box-sizing: border-box;
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
  pointer-events: none;
}

.contenido-final {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.titulo-final {
  color: #FFD700;
  font-size: 3rem;
  text-align: center;
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.6);
  animation: titulo-pulse 2s ease-in-out infinite;
  margin: 0;
}

@keyframes titulo-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.stats-jugador {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
}

.stat-card {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(186, 85, 211, 0.3));
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
}

.stat-card :deep(.q-card__section) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.stat-icon {
  font-size: 3rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.stat-value {
  color: #FFD700;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.tabla-container {
  width: 100%;
  background: rgba(10, 5, 32, 0.8);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.tabla-ranking {
  background: transparent;
}

.tabla-ranking :deep(.q-table__title) {
  color: #FFD700;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}

.tabla-ranking :deep(th) {
  background: rgba(138, 43, 226, 0.5) !important;
  color: #FFD700 !important;
  font-weight: bold;
  font-size: 0.95rem;
}

.tabla-ranking :deep(tbody tr) {
  transition: all 0.3s ease;
}

.tabla-ranking :deep(tbody tr:hover) {
  background: rgba(255, 215, 0, 0.1) !important;
}

/* Resaltar jugador actual */
.jugador-actual {
  background: linear-gradient(90deg, 
    rgba(255, 215, 0, 0.3) 0%, 
    rgba(255, 215, 0, 0.15) 50%,
    rgba(255, 215, 0, 0.3) 100%) !important;
  border-left: 4px solid #FFD700 !important;
  animation: pulse-row 2s ease-in-out infinite;
}

@keyframes pulse-row {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }
}

.posicion-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.medalla {
  font-size: 2.5rem;
  animation: medalla-rotate 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
}

@keyframes medalla-rotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(10deg) scale(1.1); }
}

.numero-posicion {
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  font-size: 1.5rem;
}

.btn-menu {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(186, 85, 211, 0.8));
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 15px 40px;
  margin-top: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4);
  transition: all 0.3s ease;
}

.btn-menu:hover {
  background: linear-gradient(135deg, rgba(186, 85, 211, 0.9), rgba(138, 43, 226, 0.9));
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 25px rgba(186, 85, 211, 0.6);
}

@media (max-width: 768px) {
  .titulo-final {
    font-size: 2rem;
  }
  
  .stats-jugador {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tabla-container {
    padding: 10px;
  }
  
  .medalla {
    font-size: 2rem;
  }
}
</style>