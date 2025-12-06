<template>
    <div class="body" :style="{backgroundImage: `url(${fondo})`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover'}">
         
        <h3 class="letra">bienvenidos</h3>
        <h4 class="letra">DESTINO COLGANTE</h4>
         <br>
         <br>
         <br>
         <br>
         <div class="login">
            <q-input filled v-model="nombre" label="Ingresa Tu Nombre" class="input" />
        </div>
        <q-btn style="background: goldenrod; color: white" label="Iniciar Game" to="/categoria" class="letra" @click="guardarUsuarios()"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import fondo from "../assets/fondo-aorcados.png"

const nombre = ref('');
const usuarios = ref([]);
function guardarUsuarios(){
    usuarios.value.push(nombre.value)
    return usuarios.value
    
}

</script>

<style>
.letra{
    font-family: 'Press Start 2P', cursive;
    color: #0F4C5C;
}
.body{
    display: grid;
    justify-content: center;
}
 .input{
    width: 200px;
    background-color: white;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 5px 5px 7px black;
 }
</style>
