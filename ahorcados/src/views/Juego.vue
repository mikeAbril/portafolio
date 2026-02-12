<template>
  <div class="juego">
    <p v-if="mostrarPista" class="pista">
  💡 Pista: {{ pistaTexto }}
</p>

    <p class="intentos">Intentos: {{ intentos }}</p>

    <!-- PALABRA -->
    <div class="palabra">
      <span v-for="(letra, index) in mostrar" :key="index">
        {{ letra }}
      </span>
    </div>

    <!-- TECLADO -->
    <div class="teclado">
      <div class="fila">
        <button v-for="t in fila1" :key="t" @click="presionar(t, $event)">
          {{ t }}
        </button>
      </div>

      <div class="fila">
        <button v-for="t in fila2" :key="t" @click="presionar(t, $event)">
          {{ t }}
        </button>
      </div>

      <div class="fila">
        <button v-for="t in fila3" :key="t" @click="presionar(t, $event)">
          {{ t }}
        </button>
      </div>

      <button class="atras" @click="$router.push('/')">🔙 Atrás</button>
    </div>

    <!-- MODAL GANAR -->
    <q-dialog v-model="modalGanar">
      <q-card>
        <q-card-section class="text-h6 text-center">
          🎉 ¡GANASTE!
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" label="Ver Historial" @click="irHistorial" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- MODAL PERDER -->
    <q-dialog v-model="modalPerder">
      <q-card>
        <q-card-section class="text-h6 text-center">
          ❌ Perdiste <br />
          La palabra era: <b>{{ palabra }}</b>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="negative" label="Ver Historial" @click="irHistorial" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palabra: "",
      mostrar: [],
      intentos: 0,
      intentosMax: 0,
      inicioTiempo: null,
      pistaTexto: "",


      modalGanar: false,
      modalPerder: false,

      fila1: ["Q","W","E","R","T","Y","U","I","O","P"],
      fila2: ["A","S","D","F","G","H","J","K","L"],
      fila3: ["Z","X","C","V","B","N","M"]
    };
  },

  created() {
    this.obtenerPalabra();
  },
  computed: {
  mostrarPista() {
    const dificultad = localStorage.getItem("dificultad");
    return dificultad === "facil" || dificultad === "medio";
  }
},

  methods: {
    obtenerPalabra() {
      const categoria = localStorage.getItem("categoria");
      const dificultad = localStorage.getItem("dificultad");

      if (dificultad === "facil") this.intentosMax = 9;
      else if (dificultad === "medio") this.intentosMax = 7;
      else this.intentosMax = 5;

      this.intentos = this.intentosMax;

 const palabrasBase = [
       // ----------------- FRUTAS -----------------
  { nombre: "MANZANA", categoria: "frutas", dificultad: "facil" },
  { nombre: "PERA", categoria: "frutas", dificultad: "facil" },
  { nombre: "MANGO", categoria: "frutas", dificultad: "facil" },
  { nombre: "UVA", categoria: "frutas", dificultad: "facil" },
  { nombre: "KIWI", categoria: "frutas", dificultad: "facil" },
  { nombre: "FRESA", categoria: "frutas", dificultad: "facil" },
  { nombre: "BANANO", categoria: "frutas", dificultad: "facil" },
  { nombre: "COCO", categoria: "frutas", dificultad: "facil" },
  { nombre: "LIMA", categoria: "frutas", dificultad: "facil" },
  { nombre: "PAPAYA", categoria: "frutas", dificultad: "facil" },

  { nombre: "GUANABANA", categoria: "frutas", dificultad: "medio" },
  { nombre: "MARAÑON", categoria: "frutas", dificultad: "medio" },
  { nombre: "TAMARINDO", categoria: "frutas", dificultad: "medio" },
  { nombre: "DURAZNO", categoria: "frutas", dificultad: "medio" },
  { nombre: "GRANADA", categoria: "frutas", dificultad: "medio" },
  { nombre: "MELON", categoria: "frutas", dificultad: "medio" },
  { nombre: "ARANDANO", categoria: "frutas", dificultad: "medio" },
  { nombre: "NECTARINA", categoria: "frutas", dificultad: "medio" },
  { nombre: "TORONJA", categoria: "frutas", dificultad: "medio" },
  { nombre: "MORA", categoria: "frutas", dificultad: "medio" },

  { nombre: "MARACUYA", categoria: "frutas", dificultad: "dificil" },
  { nombre: "PARCHITA", categoria: "frutas", dificultad: "dificil" },
  { nombre: "CARAMBOLA", categoria: "frutas", dificultad: "dificil" },
  { nombre: "AGRAZ", categoria: "frutas", dificultad: "dificil" },
  { nombre: "CHIRIMOYA", categoria: "frutas", dificultad: "dificil" },
  { nombre: "LICHI", categoria: "frutas", dificultad: "dificil" },
  { nombre: "PITAHAYA", categoria: "frutas", dificultad: "dificil" },
  { nombre: "MANGOSTINO", categoria: "frutas", dificultad: "dificil" },
  { nombre: "GUAYACAN", categoria: "frutas", dificultad: "dificil" },
  { nombre: "CIRUELA", categoria: "frutas", dificultad: "dificil" },

  // ----------------- ANIMALES -----------------
  { nombre: "PERRO", categoria: "animales", dificultad: "facil" },
  { nombre: "GATO", categoria: "animales", dificultad: "facil" },
  { nombre: "RATON", categoria: "animales", dificultad: "facil" },
  { nombre: "LORO", categoria: "animales", dificultad: "facil" },
  { nombre: "OSO", categoria: "animales", dificultad: "facil" },
  { nombre: "LEON", categoria: "animales", dificultad: "facil" },
  { nombre: "TIBURON", categoria: "animales", dificultad: "facil" },
  { nombre: "VACA", categoria: "animales", dificultad: "facil" },
  { nombre: "FOCA", categoria: "animales", dificultad: "facil" },
  { nombre: "SAPO", categoria: "animales", dificultad: "facil" },

  { nombre: "ELEFANTE", categoria: "animales", dificultad: "medio" },
  { nombre: "JIRAFA", categoria: "animales", dificultad: "medio" },
  { nombre: "COCODRILO", categoria: "animales", dificultad: "medio" },
  { nombre: "PINGÜINO", categoria: "animales", dificultad: "medio" },
  { nombre: "HIPOPOTAMO", categoria: "animales", dificultad: "medio" },
  { nombre: "CANGURO", categoria: "animales", dificultad: "medio" },
  { nombre: "HALCON", categoria: "animales", dificultad: "medio" },
  { nombre: "TORTUGA", categoria: "animales", dificultad: "medio" },
  { nombre: "ZORRILLO", categoria: "animales", dificultad: "medio" },
  { nombre: "ABEJARUCO", categoria: "animales", dificultad: "medio" },

  { nombre: "ORNITORRINCO", categoria: "animales", dificultad: "dificil" },
  { nombre: "AXOLOTE", categoria: "animales", dificultad: "dificil" },
  { nombre: "EQUINODERMO", categoria: "animales", dificultad: "dificil" },
  { nombre: "DRAGON", categoria: "animales", dificultad: "dificil" },
  { nombre: "MARSUPIAL", categoria: "animales", dificultad: "dificil" },
  { nombre: "CAMALEON", categoria: "animales", dificultad: "dificil" },
  { nombre: "ARACHNIDO", categoria: "animales", dificultad: "dificil" },
  { nombre: "MAMIFERO", categoria: "animales", dificultad: "dificil" },
  { nombre: "TARANTULA", categoria: "animales", dificultad: "dificil" },
  { nombre: "ANTILOPE", categoria: "animales", dificultad: "dificil" },

  // ----------------- PAISES -----------------
  { nombre: "COLOMBIA", categoria: "paises", dificultad: "facil" },
  { nombre: "PERU", categoria: "paises", dificultad: "facil" },
  { nombre: "CHILE", categoria: "paises", dificultad: "facil" },
  { nombre: "MEXICO", categoria: "paises", dificultad: "facil" },
  { nombre: "CANADA", categoria: "paises", dificultad: "facil" },
  { nombre: "JAPON", categoria: "paises", dificultad: "facil" },
  { nombre: "CHINA", categoria: "paises", dificultad: "facil" },
  { nombre: "BRASIL", categoria: "paises", dificultad: "facil" },
  { nombre: "ITALIA", categoria: "paises", dificultad: "facil" },
  { nombre: "RUSIA", categoria: "paises", dificultad: "facil" },

  { nombre: "ARGENTINA", categoria: "paises", dificultad: "medio" },
  { nombre: "AUSTRALIA", categoria: "paises", dificultad: "medio" },
  { nombre: "ECUADOR", categoria: "paises", dificultad: "medio" },
  { nombre: "ESPAÑA", categoria: "paises", dificultad: "medio" },
  { nombre: "PORTUGAL", categoria: "paises", dificultad: "medio" },
  { nombre: "TURQUIA", categoria: "paises", dificultad: "medio" },
  { nombre: "VIETNAM", categoria: "paises", dificultad: "medio" },
  { nombre: "INDONESIA", categoria: "paises", dificultad: "medio" },
  { nombre: "PAKISTAN", categoria: "paises", dificultad: "medio" },
  { nombre: "UCRANIA", categoria: "paises", dificultad: "medio" },

  { nombre: "KAZAJISTAN", categoria: "paises", dificultad: "dificil" },
  { nombre: "LITUANIA", categoria: "paises", dificultad: "dificil" },
  { nombre: "UZBEKISTAN", categoria: "paises", dificultad: "dificil" },
  { nombre: "KIRGUISTAN", categoria: "paises", dificultad: "dificil" },
  { nombre: "AZERBAIYAN", categoria: "paises", dificultad: "dificil" },
  { nombre: "TAYIKISTAN", categoria: "paises", dificultad: "dificil" },
  { nombre: "MOZAMBIQUE", categoria: "paises", dificultad: "dificil" },
  { nombre: "ARGELIA", categoria: "paises", dificultad: "dificil" },
  { nombre: "BANGLADESH", categoria: "paises", dificultad: "dificil" },
  { nombre: "ETIOPIA", categoria: "paises", dificultad: "dificil" },

  // ----------------- DEPORTES -----------------
  { nombre: "FUTBOL", categoria: "deportes", dificultad: "facil" },
  { nombre: "TENIS", categoria: "deportes", dificultad: "facil" },
  { nombre: "BOXEO", categoria: "deportes", dificultad: "facil" },
  { nombre: "GOLF", categoria: "deportes", dificultad: "facil" },
  { nombre: "RUGBY", categoria: "deportes", dificultad: "facil" },
  { nombre: "NATACION", categoria: "deportes", dificultad: "facil" },
  { nombre: "AJEDREZ", categoria: "deportes", dificultad: "facil" },
  { nombre: "BASQUET", categoria: "deportes", dificultad: "facil" },
  { nombre: "CICLISMO", categoria: "deportes", dificultad: "facil" },
  { nombre: "PESAS", categoria: "deportes", dificultad: "facil" },

  { nombre: "PATINAJE", categoria: "deportes", dificultad: "medio" },
  { nombre: "ATLETISMO", categoria: "deportes", dificultad: "medio" },
  { nombre: "TAEKWONDO", categoria: "deportes", dificultad: "medio" },
  { nombre: "HALTEROFILIA", categoria: "deportes", dificultad: "medio" },
  { nombre: "ESCALADA", categoria: "deportes", dificultad: "medio" },
  { nombre: "TRIATLON", categoria: "deportes", dificultad: "medio" },
  { nombre: "PARACAIDISMO", categoria: "deportes", dificultad: "medio" },
  { nombre: "SURF", categoria: "deportes", dificultad: "medio" },
  { nombre: "HIPISMO", categoria: "deportes", dificultad: "medio" },
  { nombre: "REMO", categoria: "deportes", dificultad: "medio" },

  { nombre: "HEPTATLON", categoria: "deportes", dificultad: "dificil" },
  { nombre: "ESGRIMA", categoria: "deportes", dificultad: "dificil" },
  { nombre: "BADMINTON", categoria: "deportes", dificultad: "dificil" },
  { nombre: "PENTATLON", categoria: "deportes", dificultad: "dificil" },
  { nombre: "JUDO", categoria: "deportes", dificultad: "dificil" },
  { nombre: "KENDO", categoria: "deportes", dificultad: "dificil" },
  { nombre: "CAPOEIRA", categoria: "deportes", dificultad: "dificil" },
  { nombre: "WINDSURF", categoria: "deportes", dificultad: "dificil" },
  { nombre: "SNOWBOARD", categoria: "deportes", dificultad: "dificil" },
  { nombre: "BOBSLEIGH", categoria: "deportes", dificultad: "dificil" },

  // ----------------- PELICULAS -----------------
  { nombre: "TITANIC", categoria: "peliculas", dificultad: "facil" },
  { nombre: "AVATAR", categoria: "peliculas", dificultad: "facil" },
  { nombre: "ROCKY", categoria: "peliculas", dificultad: "facil" },
  { nombre: "FROZEN", categoria: "peliculas", dificultad: "facil" },
  { nombre: "COCO", categoria: "peliculas", dificultad: "facil" },
  { nombre: "JOKER", categoria: "peliculas", dificultad: "facil" },
  { nombre: "ALIEN", categoria: "peliculas", dificultad: "facil" },
  { nombre: "MOANA", categoria: "peliculas", dificultad: "facil" },
  { nombre: "MATRIX", categoria: "peliculas", dificultad: "facil" },
  { nombre: "GLADIADOR", categoria: "peliculas", dificultad: "facil" },

  { nombre: "INTERESTELAR", categoria: "peliculas", dificultad: "medio" },
  { nombre: "INCEPTION", categoria: "peliculas", dificultad: "medio" },
  { nombre: "GRAVITY", categoria: "peliculas", dificultad: "medio" },
  { nombre: "CORALINE", categoria: "peliculas", dificultad: "medio" },
  { nombre: "PSICOSIS", categoria: "peliculas", dificultad: "medio" },
  { nombre: "AMELIE", categoria: "peliculas", dificultad: "medio" },
  { nombre: "CASABLANCA", categoria: "peliculas", dificultad: "medio" },
  { nombre: "TERMINATOR", categoria: "peliculas", dificultad: "medio" },
  { nombre: "TOPGUN", categoria: "peliculas", dificultad: "medio" },
  { nombre: "GODZILLA", categoria: "peliculas", dificultad: "medio" },

  { nombre: "SCHINDLER", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "MEMENTO", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "DUNKIRK", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "OLDBOY", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "SPIRITEDAWAY", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "METROPOLIS", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "APOCALYPTO", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "EXORCISTA", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "BLADE RUNNER", categoria: "peliculas", dificultad: "dificil" },
  { nombre: "GREENLAND", categoria: "peliculas", dificultad: "dificil" },

  // ----------------- CIENCIA -----------------
  { nombre: "ATOMO", categoria: "ciencia", dificultad: "facil" },
  { nombre: "CELULA", categoria: "ciencia", dificultad: "facil" },
  { nombre: "PLANTA", categoria: "ciencia", dificultad: "facil" },
  { nombre: "FOSIL", categoria: "ciencia", dificultad: "facil" },
  { nombre: "LUNA", categoria: "ciencia", dificultad: "facencia", dificultad: "facil" },
  { nombre: "SOL", categoria: "ciencia", dificultad: "facil" },
  { nombre: "AGUA", categoria: "ciencia", dificultad: "facil" },
  { nombre: "METAL", categoria: "ciencia", dificultad: "facil" },
  { nombre: "ROCA", categoria: "ciencia", dificultad: "facil" },
  { nombre: "NUBE", categoria: "ciencia", dificultad: "facil" },

  { nombre: "GENETICA", categoria: "ciencia", dificultad: "medio" },
  { nombre: "NEURONA", categoria: "ciencia", dificultad: "medio" },
  { nombre: "MUTACION", categoria: "ciencia", dificultad: "medio" },
  { nombre: "MICROBIO", categoria: "ciencia", dificultad: "medio" },
  { nombre: "ASTRONOMIA", categoria: "ciencia", dificultad: "medio" },
  { nombre: "GRAVEDAD", categoria: "ciencia", dificultad: "medio" },
  { nombre: "ATOMICO", categoria: "ciencia", dificultad: "medio" },
  { nombre: "EXPERIMENTO", categoria: "ciencia", dificultad: "medio" },
  { nombre: "PLANETA", categoria: "ciencia", dificultad: "medio" },
  { nombre: "FISIOLOGIA", categoria: "ciencia", dificultad: "medio" },

  { nombre: "TERMODINAMICA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "ELECTROMAGNETISMO", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "NEUROCIENCIA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "BIOQUIMICA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "PALEONTOLOGIA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "ASTROFISICA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "CROMODINAMICA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "COSMOLOGIA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "NANOTECNOLOGIA", categoria: "ciencia", dificultad: "dificil" },
  { nombre: "BIOINGENIERIA", categoria: "ciencia", dificultad: "dificil" }
      ];
      const lista = palabrasBase.filter(
        p => p.categoria === categoria && p.dificultad === dificultad
      );

      if (lista.length === 0) {
        alert("No hay palabras disponibles");
        this.$router.push("/");
        return;
      }

      const random = lista[Math.floor(Math.random() * lista.length)];
      this.palabra = random.nombre.toUpperCase();
      this.pistaTexto = `Categoría: ${categoria.toUpperCase()}`;


      this.mostrar = this.palabra.split("").map(l =>
        l === " " ? " " : "_"
      );

      this.inicioTiempo = Date.now();
    },

    presionar(letra, event) {
      event.target.disabled = true;

      let acierto = false;

      this.palabra.split("").forEach((l, i) => {
        if (l === letra) {
          this.mostrar[i] = letra;
          acierto = true;
        }
      });

      if (!acierto) {
        this.intentos--;

        if (this.intentos <= 0) {
          this.guardarHistorial("PERDIÓ");
          this.modalPerder = true;
          return;
        }
      }

      if (!this.mostrar.includes("_")) {
        this.guardarHistorial("GANÓ");
        this.modalGanar = true;
      }
    },

    guardarHistorial(resultado) {
      const historial = JSON.parse(localStorage.getItem("historial")) || [];

      const tiempoFinal = Math.floor(
        (Date.now() - this.inicioTiempo) / 1000
      );

      historial.push({
        nombre: localStorage.getItem("jugador") || "jugador",
        dificultad: localStorage.getItem("dificultad"),
        categoria: localStorage.getItem("categoria"),
        tiempo: tiempoFinal,
        resultado
      });

      localStorage.setItem("historial", JSON.stringify(historial));
    },

    irHistorial() {
      this.modalGanar = false;
      this.modalPerder = false;
      this.$router.push("/historial");
    }
  }
};
</script>

<style>
/* ====== FONDO GENERAL ====== */
.juego {
   
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 25px;

  background: radial-gradient(circle at top, #1f2937, #020617);
  font-family: "Segoe UI", system-ui, sans-serif;
}

/* ====== CUADRANTE 1 (LIBRE PARA IMÁGENES) ====== */
.juego::before {
  content: "";
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  border-radius: 20px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(10px);
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

/* ====== INTENTOS ====== */
.intentos {
  grid-column: 2 / 3;
  grid-row: 1 / 2;

  justify-self: end;
  align-self: center;

  font-size: 18px;
  font-weight: 600;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.08);
  padding: 10px 18px;
  border-radius: 14px;
  backdrop-filter: blur(8px);
}

/* ====== PALABRA ====== */
.palabra {
  grid-column: 1 / 3;
  grid-row: 2 / 3;

  margin: 30px auto;
  padding: 25px 40px;
  width: fit-content;

  font-size: 38px;
  letter-spacing: 14px;
  font-weight: 700;
  color: #f9fafb;

  background: rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* ====== TECLADO ====== */
.teclado {
  grid-column: 2 / 3;
  grid-row: 3 / 4;

  padding: 25px;
  border-radius: 24px;

  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.03)
  );
  backdrop-filter: blur(14px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}

/* ====== FILAS DEL TECLADO ====== */
.teclado .fila {
  display: flex;
  justify-content: center;
  margin: 12px 0;
}

/* ====== BOTONES ====== */
button {
  min-width: 44px;
  padding: 12px 14px;
  margin: 5px;

  border-radius: 12px;
  border: none;

  font-size: 15px;
  font-weight: 700;
  color: #111827;

  background: linear-gradient(145deg, #f9fafb, #d1d5db);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);

  cursor: pointer;
  transition: all 0.25s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
}

/* ====== BOTÓN DESHABILITADO ====== */
button:disabled {
  background: linear-gradient(145deg, #6b7280, #374151);
  color: #e5e7eb;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* ====== BOTÓN ATRÁS ====== */
.atras {
  margin-top: 20px;
  width: 60%;

  background: linear-gradient(145deg, #fbbf24, #d97706);
  color: #111827;

  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
}

.atras:hover {
  background: linear-gradient(145deg, #fcd34d, #f59e0b);
}
.pista {
  grid-column: 1 / 3;
  text-align: center;

  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fbbf24;

  background: rgba(255, 255, 255, 0.08);
  padding: 10px 18px;
  border-radius: 14px;
  backdrop-filter: blur(8px);
}

/* ====== RESPONSIVE ====== */
@media (max-width: 900px) {
  .body {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }

  .body::before {
    grid-column: 1;
    grid-row: 1;
    height: 200px;
  }

  .intentos {
    grid-column: 1;
    justify-self: center;
    margin-top: 10px;
  }

  .palabra {
    letter-spacing: 10px;
    font-size: 30px;
  }

  .teclado {
    grid-column: 1;
  }
}
/* ====== CONTENEDOR DE LA PALABRA ====== */
.palabra {
    grid-column: 1 / 3; /* ocupa todo el ancho */
  grid-row: 2 / 3;    /* va DEBAJO del header y ARRIBA del teclado */
  display: flex;
  justify-content: center;
  gap: 18px;

  font-size: 38px;
  font-weight: 700;
  color: #f9fafb;

  background: rgba(255, 255, 255, 0.07);
  padding: 25px 40px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* ====== CADA LETRA / RAYA ====== */
.palabra span {
  width: 42px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 4px solid #fbbf24; /* RAYA VISIBLE */
  color: #f9fafb;

  font-size: 34px;
  text-transform: uppercase;
}

/* ====== CUANDO ES ESPACIO ====== */
.palabra span:empty {
  border-bottom: none;
}

</style>
