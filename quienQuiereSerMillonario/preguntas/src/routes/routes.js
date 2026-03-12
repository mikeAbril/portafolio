import inicio from "../views/pantallaInicio.vue"
import juego from "../views/pantallaJuego.vue"
import final from "../views/patallaFinal.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {path:"/", component:inicio},
    {path:"/juego", component:juego},
    {path:"/final", component:final}
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})