<template>
  <router-view v-slot="{ Component, route }">
    <transition 
      :name="route.meta.transition || 'fade'"
      mode="out-in"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup>
// No necesitas importar nada adicional
</script>

<style>
/* ==================== TRANSICIÓN FADE ==================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ==================== TRANSICIÓN SLIDE ==================== */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* ==================== TRANSICIÓN ZOOM ==================== */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-enter-from {
  transform: scale(0.8);
  opacity: 0;
}

.zoom-leave-to {
  transform: scale(1.2);
  opacity: 0;
}

/* ==================== TRANSICIÓN SCALE (Crecimiento) ==================== */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s ease;
}

.scale-enter-from {
  transform: scale(0);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* ==================== TRANSICIÓN ROTATE ==================== */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.rotate-enter-from {
  transform: rotate(-180deg) scale(0.5);
  opacity: 0;
}

.rotate-leave-to {
  transform: rotate(180deg) scale(0.5);
  opacity: 0;
}

/* ==================== TRANSICIÓN FLIP ==================== */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.6s ease;
  transform-style: preserve-3d;
}

.flip-enter-from {
  transform: rotateY(-180deg);
  opacity: 0;
}

.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}

/* ==================== TRANSICIÓN BOUNCE (Rebote) ==================== */
.bounce-enter-active {
  animation: bounce-in 0.8s;
}

.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* ==================== TRANSICIÓN SLIDE-FADE (Combinada) ==================== */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

/* ==================== TRANSICIÓN SPACE (Temática espacial) ==================== */
.space-enter-active,
.space-leave-active {
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.space-enter-from {
  transform: scale(0.3) rotate(360deg);
  opacity: 0;
  filter: blur(10px);
}

.space-leave-to {
  transform: scale(1.5) rotate(-360deg);
  opacity: 0;
  filter: blur(10px);
}
</style>