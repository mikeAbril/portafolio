<template>
  <div
    class="body"
    :style="{
      backgroundImage: `url(${fondo})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }"
  >
    <div class="overlay"></div>

    <div class="content">

      <h3 class="titulo">BIENVENIDOS</h3>
      <h4 class="subtitulo">DESTINO COLGANTE</h4>

      <div class="login">
        <q-input
          filled
          v-model="nombre"
          label="Ingresa Tu Nombre"
          class="input"
          :error="error"
          :error-message="errorMensaje"
        />
      </div>

      <q-btn
        class="btn-start"
        label="Iniciar Game"
        @click="validarYGuardar"
        :disable="nombre.trim().length === 0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import fondo from "../assets/fondo-aorcados.png"

// ⚠️ IMPORTANTE: ahora sí estamos en script setup
const router = useRouter()

const nombre = ref('')
const error = ref(false)
const errorMensaje = ref('')

function validarYGuardar() {
  if (nombre.value.trim() === '') {
    error.value = true
    errorMensaje.value = "Debes ingresar un nombre"
    return
  }

  error.value = false
  errorMensaje.value = ""

  // Guardar el usuario
  localStorage.setItem("jugador", nombre.value.trim())

  // Información inicial de la ronda
  localStorage.setItem("ronda", JSON.stringify({
    jugador: nombre.value.trim(),
    puntos: 0,
    errores: 0,
    fecha: new Date().toISOString()
  }))

  // Navegar correctamente
  router.push("/categoria")
}
</script>

<style>
    /* Fuente retro */
.titulo,
.subtitulo,
.btn-start {
  font-family: 'Press Start 2P', cursive;
}

/* Contenedor principal */
.body {
  position: relative;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Oscurecer fondo para mejorar contraste */
.overlay {
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(3px);
}

/* Bloque central */
.content {
  position: relative;
  text-align: center;
  padding: 25px;
  border-radius: 20px;

  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);

  box-shadow: 0px 8px 25px rgba(0,0,0,0.6);
  width: 90%;
  max-width: 450px;
}

/* Títulos */
.titulo {
  color: #F9D342;
  text-shadow: 0 0 10px #F9D342;
  font-size: 20px;
}

.subtitulo {
  margin-top: 10px;
  margin-bottom: 40px;
  color: #00E5FF;
  text-shadow: 0 0 10px #00E5FF;
  font-size: 14px;
}

/* Input */
.input {
  width: 260px;
  border-radius: 15px;
  background: rgba(255,255,255,0.8);
  box-shadow: 0px 0px 10px #000;
  margin-bottom: 30px;
}

/* Botón Inicio */
.btn-start {
  background: #F4A100;
  color: #fff;
  padding: 12px 20px;
  border-radius: 12px;

  text-shadow: 0 0 5px black;
  box-shadow: 0 0 12px #F4A100;

  transition: 0.2s ease;
}

.btn-start:hover {
  transform: scale(1.06);
  box-shadow: 0 0 20px #F4A100;
}

@media (max-width: 500px) {
  .titulo { font-size: 16px; }
  .subtitulo { font-size: 12px; }
  .input { width: 220px; }
}
</style>