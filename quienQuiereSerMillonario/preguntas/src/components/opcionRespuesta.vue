<template>
  <button @click="seleccionar">
    {{ texto }}
  </button>
</template>

<script setup>
 const props = defineProps({
  texto: String,
  correcta: Boolean
})

const emit = defineEmits(['seleccion'])

function seleccionar() {
  emit('seleccion', props.correcta)
}
</script>
