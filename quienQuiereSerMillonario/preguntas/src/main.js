import { createApp } from 'vue'
import { Quasar, Dialog } from 'quasar'  // ⭐ Importar Dialog
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './routes/routes.js'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.use(Quasar, {
  plugins: {
    Dialog  //  Dialogo del amigo en elcomodinq puse  
  }
})

app.mount('#app')