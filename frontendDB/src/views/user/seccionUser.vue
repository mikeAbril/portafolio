<template>
  <q-page class="mystic-page animate-fade-in">
    <header class="mystic-header">
      <q-btn flat round icon="arrow_back_ios_new" color="primary" size="sm" @click="$router.back()" />
      <h1 class="header-title">PREDICCIONES</h1>
      <q-btn flat round class="notification-btn" icon="notifications">
        <q-badge color="red" floating>3</q-badge>
      </q-btn>
    </header>

    <div class="q-px-lg q-pt-lg q-gutter-y-xl">
      <!-- HERO SECTION -->
      <section>
        <div class="hero-container">
          <div class="hero-glow"></div>
          <q-card flat class="glass hero-card glass-hover">
            <div class="hero-icon-bg">
              <q-icon name="brightness_high" size="140px" />
            </div>
            <div class="forecast-badge">
              <q-icon name="auto_awesome" size="16px" />
              <span>DAILY VIBRATION</span>
            </div>
            <h2 class="text-h4 text-weight-bold q-mb-md text-primary">Sintonía Universal</h2>
            <p class="text-description">
              Hoy, los números indican una fuerte conexión con tu intuición. Es el momento perfecto para tomar decisiones que habías estado postergando. La energía del <span class="text-primary text-weight-bold">7</span> te guía hacia la verdad interior.
            </p>
          </q-card>
        </div>
      </section>

      <!-- PLANETARY TRANSITS -->
      <section>
        <div class="row items-center justify-between q-mb-md">
          <h2 class="section-title">Tránsitos Planetarios</h2>
          <div class="subtitle-badge">EN TIEMPO REAL</div>
        </div>
        
        <div class="planetary-scroll hide-scrollbar">
          <div v-for="(planet, index) in planets" :key="planet.name" 
               class="planet-card glass glass-hover"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="planet-icon-container" :style="`border-color: ${planet.color}44; background: ${planet.color}11`">
              <q-icon :name="planet.icon" :style="`color: ${planet.color}`" size="sm" />
            </div>
            <div class="text-center">
              <p class="planet-label text-uppercase">{{ planet.name }}</p>
              <p class="planet-status">{{ planet.status }}</p>
            </div>
            <q-linear-progress :value="planet.progress" :style="`color: ${planet.color}`" class="q-mt-xs" />
          </div>
        </div>
      </section>

      <!-- OUTLOOK SECTION -->
      <section class="q-gutter-y-lg">
        <h2 class="section-title">Perspectivas Cósmicas</h2>
        
        <div class="outlook-card glass glass-hover border-left-primary">
          <div class="outlook-icon-box bg-primary-glow">
            <q-icon name="calendar_month" color="primary" size="md" />
          </div>
          <div class="q-ml-md">
            <div class="row items-center q-gutter-x-sm q-mb-xs">
              <h3 class="outlook-title">Vibración Mensual</h3>
              <span class="outlook-badge bg-primary-glow text-primary">MARZO</span>
            </div>
            <p class="outlook-desc">Un mes de consolidación financiera y expansión en relaciones profesionales. Tus números maestros están activos.</p>
          </div>
        </div>

        <div class="outlook-card glass glass-hover border-left-secondary">
          <div class="outlook-icon-box bg-secondary-glow">
            <q-icon name="published_with_changes" color="secondary" size="md" />
          </div>
          <div class="q-ml-md">
            <div class="row items-center q-gutter-x-sm q-mb-xs">
              <h3 class="outlook-title">Ciclo Anual</h3>
              <span class="outlook-badge bg-secondary-glow text-secondary">2026</span>
            </div>
            <p class="outlook-desc">Vibración anual 8: El año de la cosecha. Recibirás recompensas por el trabajo duro de los últimos tres años.</p>
          </div>
        </div>
      </section>

      <!-- PREMIUM BANNER -->
      <section class="q-pb-xl">
        <div class="premium-banner">
          <div class="premium-glow"></div>
          <div class="premium-content">
            <p class="premium-label">EXCLUSIVO</p>
            <h3 class="text-h5 text-weight-bold q-mb-sm">Desbloquea tu Mapa Estelar</h3>
            <p class="premium-text">Recibe predicciones personalizadas para Amor, Dinero y Salud basadas en tu fecha de nacimiento.</p>
            <q-btn unelevated color="primary" text-color="black" label="OBTENER PREMIUM" class="premium-btn glow-primary" />
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
const planets = [
  { name: 'MARTE', status: 'En Leo', icon: 'brightness_low', color: '#fb923c', progress: 0.75 },
  { name: 'LUNA', status: 'Creciente', icon: 'mode_night', color: '#60a5fa', progress: 0.5 },
  { name: 'SOL', status: 'En Piscis', icon: 'wb_sunny', color: '#f4d125', progress: 1 },
  { name: 'VENUS', status: 'En Aries', icon: 'star', color: '#f43f5e', progress: 0.25 }
]
</script>

<style scoped>
.mystic-page {
  background: var(--bg-dark);
  min-height: 100vh;
  padding-bottom: 2rem;
}

/* HEADER */
.mystic-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
}

.header-title {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: var(--primary);
  margin: 0;
  text-transform: uppercase;
}

.notification-btn {
  background: var(--primary-glow);
  color: var(--primary);
}

/* HERO SECTION */
.hero-container {
  position: relative;
}

.hero-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%);
  opacity: 0.5;
  pointer-events: none;
}

.hero-card {
  padding: 2rem;
  overflow: hidden;
  position: relative;
}

.hero-icon-bg {
  position: absolute;
  top: -30px;
  right: -30px;
  opacity: 0.05;
  color: var(--primary);
  transform: rotate(-15deg);
}

.forecast-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 1.5rem;
  background: var(--primary-glow);
  width: fit-content;
  padding: 4px 12px;
  border-radius: 20px;
}

.text-description {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 1rem;
}

/* PLANETARY SCROLL */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-main);
}

.subtitle-badge {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
}

.planetary-scroll {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  margin: 0 -0.5rem;
}

.planet-card {
  flex: 0 0 140px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.planet-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--text-muted);
  margin: 0;
  letter-spacing: 1px;
}

.planet-status {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-main);
}

/* OUTLOOK CARDS */
.outlook-card {
  display: flex;
  padding: 1.5rem;
  align-items: center;
}

.bg-primary-glow { background: var(--primary-glow); }
.bg-secondary-glow { background: rgba(168, 85, 247, 0.15); }

.border-left-primary { border-left: 4px solid var(--primary); }
.border-left-secondary { border-left: 4px solid var(--secondary); }

.outlook-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.outlook-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-main);
}

.outlook-badge {
  font-size: 0.65rem;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 800;
}

.outlook-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0.4rem 0 0 0;
  line-height: 1.5;
}

/* PREMIUM BANNER */
.premium-banner {
  position: relative;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  text-align: center;
  overflow: hidden;
  border: 1px solid rgba(244, 209, 37, 0.2);
}

.premium-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 50%);
  opacity: 0.3;
  animation: rotate 20s infinite linear;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.premium-content {
  position: relative;
  z-index: 1;
}

.premium-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.4em;
  margin-bottom: 0.75rem;
}

.premium-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.premium-btn {
  width: 100%;
  max-width: 300px;
  height: 54px;
  border-radius: 16px !important;
  font-size: 1rem !important;
}

/* UTILS */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
 