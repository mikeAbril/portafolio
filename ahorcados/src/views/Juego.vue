<template>
  <div class="teclado-container">
    <div class="teclado">
      <button v-for="key in keys" :key="key" class="tecla" @click="$emit('press', key)">
        {{ key }}
      </button>
    </div>

    <!-- Botón atrás -->
    <q-btn
      style="background: goldenrod; color: white; margin-top: 20px;"
      label="terminar"
      to="/"
    />
  </div>
</template>

<script setup>
const keys = [
  'Q','W','E','R','T','Y','U','I','O','P',
  'A','S','D','F','G','H','J','K','L',
  'Z','X','C','V','B','N','M'
]
</script>

<style scoped>
.teclado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.teclado {
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
}

.tecla {
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  background: #333;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.tecla:hover {
  background: #555;
}
</style>
