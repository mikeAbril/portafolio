<template>
  <div class="usuarios-page animate-fade-in">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="admin-label">GESTIÓN DE MIEMBROS</div>
        <h1 class="text-h3 text-weight-bold text-primary q-ma-none">Control de Almas</h1>
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

    <div class="table-wrapper glass">
      <table class="modern-table">
        <thead>
          <tr>
            <th>USUARIO</th>
            <th>NACIMIENTO</th>
            <th>CONTACTO</th>
            <th>ESTADO</th>
            <th class="text-right">ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in usuarios" :key="user._id" class="table-row">
            <td>
              <div class="row items-center q-gutter-x-md">
                <q-avatar size="32px" color="primary-glow" text-color="primary">
                  {{ user.nombre.charAt(0) }}
                </q-avatar>
                <div class="text-weight-bold">{{ user.nombre }}</div>
              </div>
            </td>
            <td class="text-muted font-mono">{{ user.fechanacimiento }}</td>
            <td>{{ user.email }}</td>
            <td>
              <q-badge :color="user.estado === 1 ? 'positive' : 'grey-7'" 
                       :label="user.estado === 1 ? 'Activo' : 'Inactivo'"
                       class="q-py-xs q-px-sm" />
            </td>
            <td class="text-right">
              <q-btn 
                v-if="user.estado === 0" 
                flat
                dense
                color="positive"
                label="Activar"
                icon="check_circle"
                class="q-px-md"
                @click="activarUser(user._id)"
              />

              <q-btn 
                v-if="user.estado === 1" 
                flat
                dense
                color="negative"
                label="Desactivar"
                icon="block"
                class="q-px-md"
                @click="desactivarUser(user._id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getData, putData} from '../../services/services'

const usuarios = ref([])
const emailBuscar = ref("")

async function listUsers(){
  try {
    let res = await getData("usuario")
    usuarios.value = res    
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  listUsers()
})

async function activarUser(id) {
  try {
    await putData(`usuario/${id}`, { estado: 1 })
    listUsers()
  } catch (error) {
    console.error(error)
  }
}

async function desactivarUser(id) {
  try {
    await putData(`usuario/${id}`, { estado: 0 })
    listUsers()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.usuarios-page {
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

.table-wrapper {
  overflow: hidden;
  border-radius: 24px;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  text-align: left;
  padding: 20px 24px;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 1px;
  border-bottom: 1px solid var(--glass-border);
}

.modern-table td {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 0.9rem;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

@media (max-width: 800px) {
  .search-box { width: 100%; margin-top: 20px; }
  .table-wrapper { overflow-x: auto; }
  .modern-table { min-width: 700px; }
}
</style>