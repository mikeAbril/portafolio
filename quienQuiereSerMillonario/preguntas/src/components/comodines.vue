<template>
  <div class="comodines-container">
    <button 
      @click="juegoStore.handleComodin50" 
      :disabled="juegoStore.comodinesUsados.cincuentaCincuenta"
      class="comodin"
      :class="{ 'usado': juegoStore.comodinesUsados.cincuentaCincuenta }"
    >
      <span class="comodin-icono">50:50</span>
    </button>
    
    <button 
      @click="juegoStore.handleComodinAudiencia" 
      :disabled="juegoStore.comodinesUsados.audiencia"
      class="comodin"
      :class="{ 'usado': juegoStore.comodinesUsados.audiencia }"
    >
      <span class="comodin-icono">👥</span>
      <span class="comodin-texto">Audiencia</span>
    </button>
    
    <button 
      @click="juegoStore.handleComodinAmigo" 
      :disabled="juegoStore.comodinesUsados.llamarAmigo"
      class="comodin"
      :class="{ 'usado': juegoStore.comodinesUsados.llamarAmigo }"
    >
      <span class="comodin-icono">📞</span>
      <span class="comodin-texto">Llamar</span>
    </button>
  </div>
</template>

<script setup>
import { useJuegoStore } from '../stores/juegostore'

const juegoStore = useJuegoStore()
</script>

<style scoped>
.comodines-container {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.comodin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 100%);
  border: 3px solid #FFD700;
  border-radius: 15px;
  color: #FFD700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.comodin:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.5) 0%, rgba(255, 215, 0, 0.3) 100%);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
}

.comodin.usado,
.comodin:disabled {
  background: rgba(100, 100, 100, 0.2);
  border-color: rgba(150, 150, 150, 0.5);
  color: rgba(150, 150, 150, 0.5);
  cursor: not-allowed;
  opacity: 0.3;
}

.comodin-icono {
  font-size: 28px;
  font-weight: bold;
}

.comodin-texto {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  
}
</style>