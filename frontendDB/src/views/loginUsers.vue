<template>
  <q-page class="login-page">
    <div class="login-container">
      <!-- PANEL IZQUIERDO -->
      <div class="visual-panel">
        <img class="background-image"
          src="https://images.unsplash.com/photo-1515252047806-613ecf789d9b?auto=format&fit=crop&q=80" />
        <div class="overlay"></div>

        <div class="floating-numbers">
          <span v-for="n in numbers" :key="n" class="floating-number">{{ n }}</span>
        </div>

        <div class="title-panel animate-fade-in">
          <div class="brand-badge">PREMIUM ACCESS</div>
          <h1>Numerologia</h1>
          <p>EXPLORA TU DESTINO COSMICO</p>
        </div>
      </div>

      <!-- PANEL DERECHO -->
      <div class="form-panel">
        <div class="bg-glow"></div>
        <q-card class="glass-container animate-fade-in">
          <q-card-section class="text-center q-pb-none">
            <div class="auth-icon-container">
              <q-icon name="auto_awesome" size="32px" color="primary" />
            </div>
            <div class="text-h4 text-weight-bold q-mt-md">Bienvenido</div>
            <div class="subtitle text-uppercase q-mt-xs">Portal de Autenticación</div>
          </q-card-section>

          <q-card-section class="q-pt-xl">
            <q-input 
              v-model="usuario" 
              label="Correo Electrónico" 
              dark 
              filled
              class="q-mb-lg"
            >
              <template v-slot:prepend>
                <q-icon name="alternate_email" color="primary" />
              </template>
            </q-input>

            <q-input 
              v-model="password" 
              label="Clave Secreta" 
              type="password" 
              dark 
              filled
            >
              <template v-slot:prepend>
                <q-icon name="lock_open" color="primary" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions vertical class="q-px-md q-pb-lg">
            <q-btn 
              color="primary" 
              label="Acceder al Portal" 
              class="full-width glow-primary" 
              size="lg"
              unelevated
              :loading="loading" 
              @click="login" 
            />
            
            <div class="row items-center q-mt-md justify-between full-width">
              <q-btn flat dense no-caps label="Crear una cuenta" color="text-muted" @click="creacionUsuarios" />
              <q-btn flat dense no-caps label="¿Olvidaste tu clave?" color="text-muted" style="opacity: 0.7;" @click="recuperarPassword" />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { postData } from "../services/services.js";
import { useAuthStore } from "../store/Auth.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useNotifications } from "../composables/useNotifications.js";
import { useQuasar } from "quasar";

const usuario = ref("");
const password = ref("");
const loading = ref(false)
const $q = useQuasar();

const router = useRouter();
const authStore = useAuthStore();
const { success, errorAlert } = useNotifications()

const numbers = ['11:11', '333', '777', '444', '999', '222'];

const login = async () => {
  if (!usuario.value || !password.value) {
    errorAlert("Por favor, rellene todos los campos", "Se requiere correo electrónico y contraseña");
    return;
  }
  loading.value = true;

  try {
    const res = await postData("login", {
      email: usuario.value,
      password: password.value,
    });

    authStore.token = res.data.token;
    success(`¡Bienvenido, ${res.data.usuario.nombre || 'usuario'}!`);

    const rol = res.data.usuario.rol;
    if (rol === "admin") {
      router.push("/admin");
    } else {
      router.push("/seccionUser");
    }
  } catch (error) {
    const mensajeError = error.response?.data?.msg || "Error de autenticación";
    errorAlert(mensajeError)
  } finally {
    loading.value = false
  }
};

const creacionUsuarios = () => {
  router.push("/crear-user");
};

const recuperarPassword = () =>{
  $q.dialog({
    title: 'Recuperar Contraseña',
    message: 'Escribe tu correo electrónico y te enviaremos instrucciones.',
    dark: true,
    prompt: {
      model: '',
      type: 'email',
      filled: true,
      label: 'Tu Email'
    },
    cancel: true,
    persistent: true
  }).onOk(async(emailSolicitado) =>{
    loading.value = true;
    try {
      const res = await postData("usuario/forgot-password", {email: emailSolicitado});
      success("Código enviado", res.data.mensaje);
      pedirNuevoPassword();
    } catch (error) {
      errorAlert("Error", error.response?.data?.msg || "Error al solicitar recuperación");
    } finally {
      loading.value = false;
    }
  })
}

const pedirNuevoPassword = () => {
  $q.dialog({
    title: 'Restablecer Contraseña',
    message: 'Ingresa el código de 6 dígitos y tu nueva contraseña:',
    dark: true,
    prompt: {
      model: '',
      type: 'text',
      label: 'Código de 6 dígitos',
      filled: true,
      mask: '######' 
    },
    cancel: true,
    persistent: true
  }).onOk(async (codigoRecibido) => {
    $q.dialog({
      title: 'Nueva Clave',
      message: 'Escribe tu nueva contraseña (mínimo 8 caracteres):',
      dark: true,
      prompt: {
        model: '',
        type: 'password',
        label: 'Nueva Contraseña',
        filled: true
      },
      cancel: true
    }).onOk(async (newPassword) => {
      loading.value = true;
      try {
        await postData("usuario/reset-password", { 
          token: codigoRecibido, 
          newPassword: newPassword
        });
        success("¡Éxito!", "Contraseña actualizada correctamente");
      } catch (error) {
        errorAlert("Error", error.response?.data?.mensaje || "Código inválido");
      } finally {
        loading.value = false;
      }
    });
  });
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  overflow: hidden;
  background: var(--bg-dark);
}

.login-container {
  display: flex;
  height: 100%;
}

/* PANEL VISUAL */
.visual-panel {
  position: relative;
  width: 55vw;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.5) brightness(0.4);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, var(--bg-dark));
}

.floating-numbers {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-number {
  position: absolute;
  font-size: 5rem;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.05;
  filter: blur(2px);
  animation: float 20s infinite linear;
}

.floating-number:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.floating-number:nth-child(2) { top: 60%; left: 20%; animation-delay: -5s; }
.floating-number:nth-child(3) { top: 30%; left: 70%; animation-delay: -10s; }
.floating-number:nth-child(4) { top: 80%; left: 60%; animation-delay: -15s; }

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-50px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.title-panel {
  position: relative;
  text-align: left;
  padding: 80px;
  width: 100%;
}

.brand-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--primary-glow);
  color: var(--primary);
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.title-panel h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  color: var(--primary);
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.title-panel p {
  font-size: 1.2rem;
  color: var(--text-muted);
  letter-spacing: 4px;
  margin-top: 10px;
}

/* PANEL FORM */
.form-panel {
  width: 45vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: var(--bg-dark);
  padding: 40px;
}

.bg-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  filter: blur(60px);
  opacity: 0.3;
}

.glass-container {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.auth-icon-container {
  width: 64px;
  height: 64px;
  background: var(--primary-glow);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 2px;
}

@media (max-width: 1024px) {
  .login-container { flex-direction: column; }
  .visual-panel { width: 100%; height: 40vh; }
  .form-panel { width: 100%; height: 60vh; padding: 20px; }
  .title-panel { padding: 40px; }
  .overlay { background: linear-gradient(to bottom, transparent, var(--bg-dark)); }
}
</style>