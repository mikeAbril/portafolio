<template>
  <div class="body">
    <div class="overlay"></div>

    <div class="content">
      <h5 class="titulo">SELECCIONA LA CATEGORÍA</h5>

      <div class="cajas">
        <div class="card card-frutas" @click="seleccionarCategoria('frutas')">
          <img :src="frutas" alt="" />
          <h4>FRUTAS</h4>
        </div>

        <div
          class="card card-animales"
          @click="seleccionarCategoria('animales')"
        >
          <img :src="animales" alt="" />
          <h4>ANIMALES</h4>
        </div>

        <div class="card card-paises" @click="seleccionarCategoria('paises')">
          <img :src="paises" alt="" />
          <h4>PAISES</h4>
        </div>

        <div
          class="card card-deportes"
          @click="seleccionarCategoria('deportes')"
        >
          <img :src="deportes" alt="" />
          <h4>DEPORTES</h4>
        </div>

        <div
          class="card card-peliculas"
          @click="seleccionarCategoria('peliculas')"
        >
          <img :src="peliculas" alt="" />
          <h4>PELÍCULAS</h4>
        </div>

        <div class="card card-ciencia" @click="seleccionarCategoria('ciencia')">
          <img :src="ciencias" alt="" />
          <h4>CIENCIA</h4>
        </div>
      </div>

      <q-btn class="btn-volver" label="Volver" to="/" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

import frutas from "../assets/frutasRemove.png";
import animales from "../assets/animalesRemove.png";
import paises from "../assets/paisesRemove.png";
import deportes from "../assets/deportesRemove.png";
import peliculas from "../assets/peliculasRemove.png";
import ciencias from "../assets/cienciasRemove.png";

const router = useRouter();

function seleccionarCategoria(categoria) {
  // Obtener información del jugador almacenada
  const jugador = localStorage.getItem("jugador");

  // Guardar categoría seleccionada
  localStorage.setItem("categoria", categoria);

  // Actualizar datos de la ronda
  const ronda = JSON.parse(localStorage.getItem("ronda")) || {};

  ronda.categoria = categoria;
  ronda.jugador = jugador;

  localStorage.setItem("ronda", JSON.stringify(ronda));

  // Ir a la vista de dificultad
  router.push("/dificultad");
}
</script>

<style>
/* --- ESTILO GLOBAL GAMING --- */

.body {
  position: relative;
  min-height: 100vh;
  background: url("../assets/fondo-aorcados.png") no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Fondo oscuro con blur */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
}

.content {
  position: relative;
  text-align: center;

  width: 95%;
  max-width: 850px;
  padding: 35px;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);

  border-radius: 25px;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);

  animation: aparecer 0.4s ease-out;
}

/* Título retro */
.titulo {
  font-family: "Press Start 2P", cursive;
  color: #f4a100;
  margin-bottom: 35px;
  text-shadow: 0 0 10px #f4a100;
}

/* --- GRID RESPONSIVO --- */
.cajas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* --- CARD ESTILO GLASS + NEON --- */
.card {
  width: 100%;
  height: 160px;

  padding: 10px;
  border-radius: 15px;

  text-decoration: none;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);

  transition: 0.25s ease;
}

.card img {
  width: 90px;
  height: 90px;
}

.card h4 {
  margin-top: 5px;
  font-family: "Press Start 2P";
  font-size: 12px;
}

/* Hover neon */
.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 0 20px white;
}

/* COLORES DE CADA CATEGORÍA */
.card-frutas {
  background: linear-gradient(100deg, #ff0033, #ff7aa2);
}

.card-animales {
  background: linear-gradient(100deg, #267eea, #7eb8ff);
}

.card-paises {
  background: linear-gradient(100deg, #2bff41, #58bf51);
}

.card-deportes {
  background: linear-gradient(100deg, #ff7b00, #ffc068);
}

.card-peliculas {
  background: linear-gradient(100deg, #000000, #696969);
}

.card-ciencia {
  background: linear-gradient(100deg, #52d9ff, #a8e2f7);
}

/* Botón volver */
.btn-volver {
  background: #f4a100;
  color: #fff;
  font-family: "Press Start 2P";
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px #f4a100;
}

.btn-volver:hover {
  transform: scale(1.05);
}

/* Animación suave */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
