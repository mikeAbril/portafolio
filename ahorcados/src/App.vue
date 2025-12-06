<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-warning text-white">
      <q-toolbar>
        <q-btn dense flat round icon="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
          </q-avatar>
          DESTINO COLGANTE
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <!-- drawer content -->
      <q-btn color="primary" label="Volver al Inicio" to="/"/><br>
      <q-btn color="primary" label="Historial" to="/historial"/><br>
      <q-btn color="primary" label="Tienda"/><br>
    </q-drawer>

    <q-page-container class="caja" >
      <router-view />
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
#app{
  background-color: black;
  display: grid;
  justify-content: center;
  align-items: center;

}

.caja{
  margin-top: 100px;
  width: 700px;
  height: 600px;
  background-color: #F5F5F5 ;
  border-radius: 30px;
  box-shadow: 3px 0px 10px #fff;

}
</style>