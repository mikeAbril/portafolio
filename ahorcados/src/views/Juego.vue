<template>
  <div class="body">
<p class="intentos">intentos/{{ intentos }}</p>
    <!-- PALABRA OCULTA -->
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

      fila1: ["Q","W","E","R","T","Y","U","I","O","P"],
      fila2: ["A","S","D","F","G","H","J","K","L"],
      fila3: ["Z","X","C","V","B","N","M"]
    };
  },

  created() {
    this.obtenerPalabra();
  },

  methods: {
    obtenerPalabra() {
      const categoria = localStorage.getItem("categoria");
      const dificultad = localStorage.getItem("dificultad");

      // Definir intentos según dificultad
      if (dificultad === "facil") this.intentosMax = 9;
      else if (dificultad === "medio") this.intentosMax = 7;
      else if (dificultad === "dificil") this.intentosMax = 5;

      this.intentos = this.intentosMax;

      // VECTOR DE PALABRAS
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
        alert("NO HAY PALABRAS PARA ESTA CATEGORÍA Y DIFICULTAD");
        return;
      }

      // Seleccionar palabra
      const random = lista[Math.floor(Math.random() * lista.length)];

      this.palabra = random.nombre.toUpperCase();

      this.mostrar = this.palabra.split("").map(() => "_");

      console.log("Palabra:", this.palabra);
      console.log("Mostrar:", this.mostrar);
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
          alert("❌ PERDISTE. La palabra era: " + this.palabra);
          this.$router.push("/");
          return;
        }
      }

      if (!this.mostrar.includes("_")) {
        alert("🎉 ¡GANASTE!");
        this.$router.push("/");
      }
    }
  }
};
</script>



<style>
.body {
  text-align: center;
  padding: 20px;
}

.palabra {
  font-size: 32px;
  letter-spacing: 10px;
  margin-bottom: 20px;
}

.teclado .fila {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

button {
  padding: 10px 12px;
  margin: 4px;
  border-radius: 8px;
  background: #eee;
  border: 1px solid #bbb;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #8d8d8d;
  color: white;
}

.atras {
  background: goldenrod;
  color: white;
  margin-top: 15px;
}
.palabra{
  color: white;
}
.intentos{
  color: white;
}
</style>
