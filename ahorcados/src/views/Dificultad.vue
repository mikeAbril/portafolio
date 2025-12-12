<template>
  <div class="body">

    <div class="overlay"></div>

    <div class="content">

      <h1 class="titulo">ELIGE DIFICULTAD</h1>

      <div class="dificultades">

        <!-- FACIL -->
       <!-- FACIL -->
<div class="cajaDificultad facil" @click="guardar('facil')">
  <p>FÁCIL</p>
</div>

<!-- MEDIO -->
<div class="cajaDificultad medio" @click="guardar('medio')">
  <p>MEDIO</p>
</div>

<!-- DIFICIL -->
<div class="cajaDificultad dificil" @click="guardar('dificil')">
  <p>DIFÍCIL</p>
</div>


      </div>

      <q-btn class="btn-volver" label="Atrás" to="/categoria" />
    </div>

  </div>
</template>
<script>
  export default {
  methods: {
    guardar(dif) {
      localStorage.setItem("dificultad", dif);
      this.$router.push("/juego");
    }
  }
};
</script>
<style>
    /* --- ESTILO GENERAL --- */
.body {
  position: relative;
  min-height: 100vh;
  background: url('../assets/fondo-aorcados.png') no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(3px);
}

.content {
  position: relative;
  text-align: center;

  width: 90%;
  max-width: 600px;

  padding: 35px;
  border-radius: 25px;

  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);

  box-shadow: 0 0 25px rgba(255,255,255,0.15);
  animation: aparecer 0.4s ease-out;
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  text-shadow: 0 0 10px #fff;
  margin-bottom: 40px;
}

/* --- DIFICULTADES --- */
.dificultades {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 35px;
}

/* CAJA GENERAL */
.cajaDificultad {
  width: 100%;
  padding: 18px 0;

  font-family: 'Press Start 2P';
  font-size: 16px;
  text-decoration: none;
  color: white;

  border-radius: 12px;

  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(3px);

  border: 3px solid white;
  text-align: center;

  transition: 0.25s ease;
}

/* --- HOVERS POR DIFICULTAD --- */

/* FÁCIL verde */
.facil:hover {
  box-shadow: 0 0 25px #00ff4c;
  border-color: #00ff4c;
  transform: scale(1.05);
}

/* MEDIO amarillo */
.medio:hover {
  box-shadow: 0 0 25px #ffe100;
  border-color: #ffe100;
  transform: scale(1.05);
}

/* DIFÍCIL rojo */
.dificil:hover {
  box-shadow: 0 0 25px #ff2b2b;
  border-color: #ff2b2b;
  transform: scale(1.05);
}

/* Botón volver */
.btn-volver {
  background: #F4A100;
  color: #fff;
  font-family: 'Press Start 2P';
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px #F4A100;
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