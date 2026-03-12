<template>
  <q-page padding class="mystic-bg text-white">
    <div class="q-pb-lg text-center">
      <h1 class="text-h3 text-amber-5 mystic-title q-ma-none">Panel de Control</h1>
      <p class="text-deep-purple-3 q-mt-sm">Resumen de tu energía financiera y comunitaria 🌌</p>
    </div>

    <div class="row q-col-gutter-md q-mb-lg justify-center">
      
      <div class="col-12 col-sm-4">
        <q-card dark bordered class="mystic-card text-center">
          <q-card-section>
            <q-icon name="account_balance_wallet" size="3em" color="amber" class="q-mb-sm" />
            <div class="text-h6 text-deep-purple-2">Ingresos del Mes</div>
            <div class="text-h4 text-amber text-weight-bold">${{ totalMonto }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card dark bordered class="mystic-card text-center">
          <q-card-section>
            <q-icon name="group" size="3em" color="amber" class="q-mb-sm" />
            <div class="text-h6 text-deep-purple-2">Almas Registradas</div>
            <div class="text-h4 text-amber text-weight-bold">{{ totalUsuarios }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card dark bordered class="mystic-card text-center">
          <q-card-section>
            <q-icon name="pending_actions" size="3em" color="amber" class="q-mb-sm" />
            <div class="text-h6 text-deep-purple-2">Pagos Pendientes</div>
            <div class="text-h4 text-amber text-weight-bold">{{ pagosPendientes }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <q-card dark bordered class="mystic-card">
          <q-card-section>
            <div class="text-h5 text-amber-4 q-mb-md mystic-title">Últimos Movimientos</div>
            
            <q-list dark separator class="mystic-list">
              <q-item v-for="movimiento in movimientosRecientes" :key="movimiento.id" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar :color="movimiento.tipo === 'ingreso' ? 'purple-9' : 'blue-grey-9'" text-color="amber">
                    <q-icon :name="movimiento.tipo === 'ingreso' ? 'arrow_upward' : 'refresh'" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold text-white">{{ movimiento.descripcion }}</q-item-label>
                  <q-item-label caption class="text-deep-purple-3">{{ movimiento.fecha }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="text-h6 text-amber">+${{ movimiento.monto }}</div>
                </q-item-section>
              </q-item>
            </q-list>

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getData } from '../../services/services'

// Variables principales
let pagos = ref([])
let usuarios = ref([])
let totalMonto = ref(0)
let totalUsuarios = ref(0) // <-- Variable reactiva para el template

// Variables de soporte (para evitar errores en consola/template)
let emailBuscar = ref('') // Debes asignarle el valor real que necesites buscar
let pagosPendientes = ref(0) 
let movimientosRecientes = ref([])

async function totalDinero(){
  try {
    let res = await getData(`pagos?email=${emailBuscar.value}`)
    pagos.value = res
    
    totalMonto.value = res.reduce((acumulador, pago) => {
      return acumulador + Number(pago.monto || 0);
    }, 0)

    console.log("Suma total de montos:", totalMonto.value);
  } catch (error) {
    console.log("Error al cargar pagos:", error)
  }
}

async function listUsers(){
  try {
    let res = await getData("usuario")
    usuarios.value = res
    
    // Asignamos el largo del arreglo a la variable reactiva
    totalUsuarios.value = res.length; 
    
    console.log("Número total de usuarios:", totalUsuarios.value)
  } catch (error) {
    console.log("Error al cargar usuarios:", error)
  }
}

// Es mejor agrupar los llamados iniciales en un solo onMounted
onMounted(() => {
  totalDinero()
  listUsers()
})
</script>

<style scoped>
/* 🌌 Fondo místico general */
.mystic-bg {
  background: radial-gradient(circle at top center, #2e1065 0%, #0f172a 100%);
  min-height: 100vh;
  min-width: 95vw;
}

/* ✨ Títulos con brillo */
.mystic-title {
  font-family: 'Cinzel', serif; 
  text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
  letter-spacing: 1px;
}

/* 🔮 Tarjetas con efecto vidrio (Glassmorphism) */
.mystic-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mystic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(139, 92, 246, 0.3);
}

/* Lista de actividades */
.mystic-list {
  border-radius: 8px;
  background: rgba(88, 28, 135, 0.1);
}
</style>