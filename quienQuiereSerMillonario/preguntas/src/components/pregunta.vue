
<template>
  <button @click="emit('seleccion', correcta)">
    {{ texto }}
  </button>
</template>

<script setup>
defineProps({
  texto: String,
  correcta: Boolean
})
const emit = defineEmits(['seleccion'])
</script>