<template>
  <div class="body">
    <h5 class="letra">Selecciona la categoria</h5>

    <div class="cajas">
      <div class="card card-frutas">
        <router-link to="/dificultad" >
        <img :src="frutas" alt="">
        <h4>frutas</h4>
      </router-link>
      </div>
      <div class="card card-animales">
        <router-link to="/dificultad" >
        <img :src="animales" alt="">
        <h4>animales</h4>
      </router-link>
      </div>
      <div class="card card-paises">
        <router-link to="/dificultad" >
        <img :src="paises" alt="">
        <h4>paises</h4>
      </router-link>
      </div>
      <div class="card card-deportes">
        <router-link to="/dificultad" >
        <img :src="deportes" alt="">
        <h4>deportes</h4>
        </router-link>
      </div>
      <div class="card card-peliculas">
        <router-link to="/dificultad">
        <img :src="peliculas" alt="">
        <h4>peliculas</h4>
      </router-link>
      </div>
      <div class="card card-ciencia">
        <router-link to="/dificultad">
        <img :src="ciencias" alt="">
        <h4>ciencia</h4>
        </router-link>
      </div>
   
    </div>

    <div>
      <q-btn style="background: goldenrod; color: white" label="volver" class="letra" to="/"/>
    </div>
  </div>
</template>

<script setup>
import frutas from '../assets/frutasRemove.png'
import animales from '../assets/animalesRemove.png'
import paises from '../assets/paisesRemove.png'
import deportes from '../assets/deportesRemove.png'
import peliculas from '../assets/peliculasRemove.png'
import ciencias from '../assets/cienciasRemove.png'
</script>

<style>
.body {
  gap: 15px;
}

.letra {
  font-family: "Press Start 2P", cursive;
}

.cajas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.card {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;  
  color: white;            
}

 
.card img {
  width: 100px;   
  height: 100px;
 
}

.card:hover {
  transform: translateY(-5px);
}

/* Tus colores */
.card-frutas {
  background: linear-gradient(100deg, #f10202, #ff607d);
}

.card-animales {
  background: linear-gradient(100deg, #267eea, #6cadea);
}

.card-paises {
  background: linear-gradient(100deg, #2bff41, #58bf51);
}

.card-deportes {
  background: linear-gradient(100deg, orange, #e9792e);
}

.card-peliculas {
  background: linear-gradient(100deg, #000000, #ffffff);
}

.card-ciencia {
  background: linear-gradient(100deg, #84e2fc, #a9c6d7);
}
</style>
