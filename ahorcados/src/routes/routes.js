
import Inicio from "../views/Inicio.vue"
import Categoria from "../views/Categoria.vue"
import Dificultad from "../views/Dificultad.vue"
import Juego from "../views/Juego.vue"
import Historial from "../views/Historial.vue"
import { createRouter, createWebHashHistory } from "vue-router"



const routes = [
    {path:"/", component:Inicio},
    {path:"/categoria", component:Categoria},
    {path:"/dificultad", component:Dificultad},
    {path:"/juego", component:Juego},
    {path:"/historial", component:Historial},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
