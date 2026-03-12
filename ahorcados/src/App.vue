<template>
  <q-layout view="hHh lpR fFf">

    <!-- HEADER -->
    <q-header elevated class="bg-warning text-white shadow-2">
      <q-toolbar>

        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="flex items-center gap-2">
          <q-avatar rounded size="40px" color="white">
            <img src="https://cdn-icons-png.flaticon.com/512/854/854894.png">
          </q-avatar>
          <span class="text-weight-bold text-h6 letter-spacing-2">
            
          </span>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <!-- DRAWER -->
    <q-drawer v-model="leftDrawerOpen" overlay behavior="mobile" bordered class="bg-grey-1">
      <div class="q-pa-md column q-gutter-sm">
        <q-btn color="warning" glossy unelevated label="🏠 Inicio" to="/" />
        <q-btn color="warning" glossy unelevated label="📜 Historial" to="/historial" />
        <q-btn color="warning" glossy unelevated label="🛒 Tienda" />
      </div>
    </q-drawer>

    <!-- CONTENIDO -->
    <q-page-container>
      <div class="contenedor-principal">
        <router-view />
      </div>
    </q-page-container>

  </q-layout>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
<style>
  /* Fondo global */
#app {
  background: linear-gradient(135deg, #0f0f0f, #222);
 
}

/* Caja principal más elegante y responsiva */
.contenedor-principal {
  margin: auto;
  margin-top: 110px;
  width: 95%;
  max-width: none;

  background: rgba(255, 255, 255, 0.07);
  border-radius: 25px;
  padding: 25px;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow: 0px 8px 25px rgba(255, 255, 255, 0.1);

  transition: 0.3s ease;
}

/* Responsive para pantallas más pequeñas */
@media (max-width: 600px) {
  .contenedor-principal {
    margin-top: 85px;
    padding: 15px;
  }
}

</style>
 
