<template>
  <q-layout view="lHh Lpr lFf" class="admin-layout animate-fade-in">
    <q-page-container>
      <q-page class="admin-page">

        <header class="admin-header glass">
          <div class="header-top row items-center justify-between">
            <div class="brand">
              <div class="admin-badge">SYSTEM ADMIN</div>
              <div class="title text-primary">Portal Maestro</div>
            </div>

            <div class="actions row items-center q-gutter-x-md">
              <q-btn round flat icon="notifications" color="primary">
                <q-badge color="red" floating>5</q-badge>
              </q-btn>
              <q-avatar size="42px" class="cursor-pointer glass-hover">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80" />
              </q-avatar>
            </div>
          </div>

          <div class="header-search q-mt-lg">
            <q-input
              filled
              dark
              dense
              placeholder="Buscar usuarios, lecturas o transacciones..."
              class="search-input"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="primary" />
              </template>
            </q-input>
          </div>

          <nav class="nav-tabs q-mt-lg row justify-around">
            <q-btn flat class="nav-btn" :class="{ 'active-nav': $route.path === '/admin/usuarios' }" icon="people" label="Usuarios" @click="irUsuarios()" />
            <q-btn flat class="nav-btn" :class="{ 'active-nav': $route.path === '/admin/pagos' }" icon="payments" label="Pagos" @click="irPagos()" />
            <q-btn flat class="nav-btn" :class="{ 'active-nav': $route.path === '/admin' }" icon="analytics" label="Dashboard" @click="irDashboard()" />
          </nav>
        </header>

        <main class="admin-content q-pa-lg">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <div class="bottom-safe-area"></div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()

function irDashboard() {
  router.push("/admin")
}

function irUsuarios() {
  router.push("/admin/usuarios")
}

function irPagos() {
  router.push("/admin/pagos")
}
</script>

<style scoped>
.admin-layout {
  background: var(--bg-dark);
}

.admin-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.admin-header {
  padding: 2rem;
  border-radius: 0 0 2rem 2rem;
  border-top: none;
  border-left: none;
  border-right: none;
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-badge {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.search-input {
  max-width: 800px;
  margin: 0 auto;
}

.nav-tabs {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  gap: 1rem;
}

.nav-btn {
  color: var(--text-muted);
  border-radius: 12px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.active-nav {
  color: var(--primary) !important;
  background: var(--primary-glow);
}

/* CONTENT AREA */
.admin-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.bottom-safe-area {
  height: 40px;
}

@media (max-width: 600px) {
  .admin-header {
    padding: 1.5rem 1rem;
  }
  
  .nav-btn :deep(.q-btn__content) {
    flex-direction: column;
    font-size: 0.7rem;
  }
}
</style>
yle>