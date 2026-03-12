<template>
  <div class="q-pa-md">
    <h4 class="text-center">🏆 Historial</h4>

    <div v-for="nivel in ['facil','medio','dificil']" :key="nivel">
      <h6 class="text-capitalize">
        {{ nivel }}
      </h6>

      <q-list bordered separator>
        <q-item
          v-for="(j, i) in topPorDificultad(nivel)"
          :key="i"
        >
          <q-item-section>
            {{ i + 1 }}️⃣ {{ j.nombre }} - {{ j.tiempo }}s
          </q-item-section>
        </q-item>

        <q-item v-if="topPorDificultad(nivel).length === 0">
          <q-item-section>
            Sin registros
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-btn
      class="q-mt-md"
      color="primary"
      label="Jugar otra vez"
      to="/"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      historial: []
    };
  },

  created() {
    this.historial =
      JSON.parse(localStorage.getItem("historial")) || [];
  },

  methods: {
    topPorDificultad(nivel) {
      return this.historial
        .filter(h => h.dificultad === nivel && h.resultado === "GANÓ")
        .sort((a, b) => a.tiempo - b.tiempo)
        .slice(0, 3);
    }
  }
};
</script>
<style>
  /* ====== CONTENEDOR GENERAL ====== */
.q-pa-md {
  min-height: 100vh;
  background: radial-gradient(circle at top, #020617, #0f172a);
  color: #e5e7eb;
}

/* ====== TÍTULO ====== */
h4 {
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 30px;
  color: #fbbf24;
}

/* ====== SUBTÍTULOS ====== */
h6 {
  margin-top: 25px;
  font-weight: 700;
  color: #93c5fd;
}

/* ====== LISTA ====== */
.q-list {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

/* ====== ITEM ====== */
.q-item {
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.q-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* ====== TOP 1 DESTACADO ====== */
.q-item:first-child {
  background: linear-gradient(145deg, #fbbf24, #f59e0b);
  color: #111827;
  font-weight: 800;
}

/* ====== BOTÓN ====== */
.q-btn {
  display: block;
  margin: 40px auto 0;
  font-weight: 700;
  letter-spacing: 1px;
}

</style>