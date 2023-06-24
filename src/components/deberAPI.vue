<template>
  <div class="container">
    <div class="juego">
      <h1>¡Prueba tu suerte!</h1>
      <h2>Reglas</h2>
      <ul>
        <li>Debes presionar el boton para obtener una respuesta.</li>
        <li>Las respuestas pueden ser Si (yes) y No (no).</li>
        <li>Si obtienes 3 veces la misma respuesta, ¡Ganaste!</li>
        <li>Tienes 10 intentos.</li>
      </ul>
      <h3 v-if="mostrarBoton()">Intentos: {{ intentos }}</h3>
      <h3>Conteo: {{ contadorSi >= contadorNo ? contadorSi : contadorNo }}</h3>
      <button v-if="mostrarBoton()" v-on:click="juego()">Presioname</button>
      <h1 id="win">{{ mensajeWin }}</h1>
      <h3 v-if="respuesta">Respuesta: {{ respuesta }}</h3>
      <div class="respuesta" v-if="respuesta">
        <img
          v-if="json != null"
          :src="json.image"
          alt="No se puede mostrar la imagen"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intentos: 10,
      json: null,
      respuesta: "",
      contadorSi: 0,
      contadorNo: 0,
      win: false,
      mensajeWin: "",
    };
  },
  methods: {
    async consumirApi() {
      return await fetch("https://yesno.wtf/api").then((r) => r.json());
    },
    async juego() {
      this.intentos--;
      await this.generarRespuesta();
      this.sumarRespuesta();
      this.verificarVictoria();
    },
    async generarRespuesta() {
      this.json = await this.consumirApi();
      this.respuesta = this.json.answer;
    },
    sumarRespuesta() {
      if (this.respuesta == "yes") {
        this.contadorSi += 1;
        this.contadorNo = 0;
      } else {
        this.contadorNo += 1;
        this.contadorSi = 0;
      }
    },
    verificarVictoria() {
      if (this.contadorSi == 3 || this.contadorNo == 3) {
        this.win = true;
        this.mensajeWin = "GANASTE";
      } else {
        if (!this.mostrarBoton()) {
          this.mensajeWin = "PERDISTE";
        }
      }
    },
    mostrarBoton() {
      return this.intentos > 0 && !this.win;
    },
  },
};
</script>

<style>

h1,
h2 {
  color: cadetblue;
}
ul,
h2 {
  text-align: start;
  margin-left: 35%;
}
h2 {
  margin-left: 37%;
}
button {
  width: 150px;
  border-radius: 10px;
  font-size: 16px;
}
button:hover{
  color: white;
  border: black 1px solid;
  background-color: cadetblue;
}
img {
  height: auto;
  width: 350px;
  height: 350px;
}
.respuesta{
  border: solid black 2px;
  padding: 10px;
  border-radius: 6px;
  background-color: cadetblue;
  margin: 0px 35%;
}
</style>