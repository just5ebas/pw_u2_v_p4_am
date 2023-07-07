<template>
  <div v-if="rondas > 0">
    <div v-if="!pokemonCorrecto">
      <h1>Espere por favor...</h1>
      <h3>Estamos obteniendo los pokemons</h3>
    </div>
    <div v-else>
      <h1>¿Quién es ese Pokemon?</h1>
      <h2>Puntaje: {{ puntaje }}</h2>
      <h3>Rondas: {{ rondas }}</h3>
      <h3 v-if="!(gano || perdio)">Tienes {{ intentos }} intentos</h3>
      <PokemonImg
        :pokemonId="pokemonCorrecto.id"
        :muestraPokemon="showPokemon"
      />

      <div v-if="!(gano || perdio)">
        <PokemonOps
          :opciones="arreglo"
          v-on:seleccionado="revisarSeleccion($event)"
        />
      </div>
    </div>

    <div v-if="gano" class="mensaje_ganador">
      <h1>{{ pokemonCorrecto.nombre }}</h1>
      <h1>GANASTE</h1>
      <h2>Has obtenido {{ puntosObt }} punto(s)</h2>
      <button @click="reiniciar">Jugar de nuevo</button>
    </div>
    <div v-if="perdio" class="mensaje_perdedor">
      <h1>PERDISTE</h1>
      <h2>La opcion correcta era {{ pokemonCorrecto.nombre }}</h2>
      <button @click="reiniciar">Jugar de nuevo</button>
    </div>
  </div>
  <div v-else>
    <br />
    <PokemonImg :pokemonId="pokemonCorrecto.id" :muestraPokemon="showPokemon" />

    <div v-if="gano" class="mensaje_ganador">
      <h1>{{ pokemonCorrecto.nombre }}</h1>
      <h1>GANASTE</h1>
    </div>
    <div v-if="perdio" class="mensaje_perdedor">
      <h1>PERDISTE</h1>
      <h2>La opcion correcta era {{ pokemonCorrecto.nombre }}</h2>
    </div>

    <br />

    <div v-if="puntaje >= 10" class="mensaje_ganador">
      <h1>Ya no tienes mas rondas</h1>
      <h2>Tu puntaje total es de {{ puntaje }} puntos</h2>
      <h2>
        Puedes ir a ver la pestaña "Premios" para saber como ganar alguno.
      </h2>
    </div>
    <div v-if="puntaje < 10" class="mensaje_perdedor">
      <h1>Se acabaron tus rondas</h1>
      <h2>No alcanzaste el puntaje requerido</h2>
      <h2>Tus puntos: {{ puntaje }}</h2>
    </div>
  </div>
</template>

<script>
import PokemonImg from "../components/PokemonImg.vue";
import PokemonOps from "../components/PokemonOps.vue";
import obtenerFachadaPokemon from "../helpers/clientePokemonAPI";

export default {
  data() {
    return {
      arreglo: [],
      pokemonCorrecto: null,
      showPokemon: false,
      intentos: 3,
      puntaje: 0,
      puntosObt: 0,
      gano: false,
      perdio: false,
      rondas: 5,
    };
  },

  components: {
    PokemonImg,
    PokemonOps,
  },
  methods: {
    async cargaJuegoInicial() {
      const arregloPokemons = await obtenerFachadaPokemon();
      console.log(arregloPokemons);
      this.arreglo = arregloPokemons;
      const indicePokemon = Math.floor(Math.random() * 4);
      this.pokemonCorrecto = this.arreglo[indicePokemon];
      this.showPokemon = false;
    },
    revisarSeleccion(idSeleccionado) {
      if (this.pokemonCorrecto.id == idSeleccionado) {
        this.gano = true;
        this.showPokemon = true;
        this.rondas--;
      }
      this.intentos--;
    },
    async reiniciar() {
      this.arreglo = [];
      this.pokemonCorrecto = null;
      this.showPokemon = false;
      this.intentos = 3;
      this.puntosObt = 0;
      this.gano = false;
      this.perdio = false;
      await this.cargaJuegoInicial();
    },
  },
  watch: {
    intentos() {
      if (this.intentos == 0 && !this.gano) {
        this.perdio = true;
        this.showPokemon = true;
        this.rondas--;
      } else if (this.intentos == 2 && this.gano) {
        this.puntaje += 5;
        this.puntosObt = 5;
      } else if (this.intentos == 1 && this.gano) {
        this.puntaje += 2;
        this.puntosObt = 2;
      } else if (this.intentos == 0 && this.gano) {
        this.puntaje += 1;
        this.puntosObt = 1;
      }
    },
  },
  mounted() {
    this.cargaJuegoInicial();
  },
};
</script>

<style scoped>
.mensaje_ganador {
  color: #474747;
}
.mensaje_perdedor {
  color: #ad343e;
}
button {
  font-size: 20px;
  border-radius: 7px;
  background: #731963;
  color: #e8dab2;
  cursor: pointer;
  border: 2px inset black;
  padding: 0px 10px;
}
button:hover {
  background: #f9e900;
  color: #0a1045;
  border: 2px outset #00c2d1;
}
html,
body {
  background-color: #d4a628;
}
</style>