<template>
  <q-page class="pagos-page animate-fade-in">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="admin-label">TRANSACCIONES COSMICAS</div>
        <h1 class="text-h3 text-weight-bold text-primary q-ma-none">Registro de Pagos</h1>
      </div>
      
      <div class="search-box glass">
        <q-input 
          v-model="emailBuscar" 
          placeholder="Buscar por email..." 
          dark 
          borderless
          dense
          class="q-px-md"
          @keyup.enter="userEmail"
        >
          <template v-slot:append>
            <q-btn flat round icon="search" color="primary" @click="userEmail" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="table-container glass q-mb-xl">
      <q-table
        :rows="pagos"
        :columns="columns"
        row-key="_id"
        dark
        flat
        class="modern-q-table"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell-monto="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-x-sm">
              <div class="amount-badge">$</div>
              <div class="text-h6 text-weight-bold text-primary">{{ props.row.monto }}</div>
            </div>
          </q-td>
        </template>
        
        <template v-slot:body-cell-fecha="props">
          <q-td :props="props" class="text-muted">
            {{ formatearFecha(props.row.fecha) }}
          </q-td>
        </template>

        <template v-slot:body-cell-cancelacion="props">
          <q-td :props="props">
            <q-badge color="secondary" outline class="q-py-xs q-px-sm">
              {{ calcularCancelacion(props.row.fecha) }}
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getData } from '../../services/services'

const pagos = ref([])
const emailBuscar = ref("")

const columns = [
  { name: 'usuario', label: 'USUARIO (EMAIL)', field: row => row.idusuario?.email || 'N/A', align: 'left' },
  { name: 'monto', label: 'MONTO', field: 'monto', align: 'left' },
  { name: 'fecha', label: 'FECHA PAGO', field: 'fecha', align: 'left' },
  { name: 'cancelacion', label: 'PRÓXIMO VENCIMIENTO', align: 'left' }
]

async function listPagos(){
  try {
    let res = await getData("pagos")
    pagos.value = res 
  } catch (error) {
    console.error(error)
  }
}

async function userEmail(){
  try {
    let res = await getData(`pagos?email=${emailBuscar.value}`)
    pagos.value = res
  } catch (error) {
    console.error(error)
  }
}
 
function formatearFecha(fecha){
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}
 
function calcularCancelacion(fecha){
  const date = new Date(fecha)
  date.setMonth(date.getMonth() + 1)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(() => {
  listPagos()
})
</script>

<style scoped>
.pagos-page {
  padding-bottom: 40px;
}

.admin-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.search-box {
  width: 320px;
  border-radius: 16px;
}

.table-container {
  border-radius: 24px;
  overflow: hidden;
}

.modern-q-table {
  background: transparent !important;
}

:deep(.q-table th) {
  text-align: left;
  padding: 20px 24px;
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  color: var(--text-muted) !important;
  letter-spacing: 1px !important;
  border-bottom: 1px solid var(--glass-border) !important;
}

:deep(.q-table td) {
  padding: 16px 24px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
  font-size: 0.95rem !important;
}

:deep(.q-table tbody tr:hover) {
  background: rgba(255, 255, 255, 0.02) !important;
}

.amount-badge {
  width: 24px;
  height: 24px;
  background: var(--primary-glow);
  color: var(--primary);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
}

@media (max-width: 800px) {
  .search-box { width: 100%; margin-top: 20px; }
}
</style>