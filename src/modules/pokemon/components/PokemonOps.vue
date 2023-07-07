<template>
<div class="contenedor-opciones">
 <ul>
    <!--<li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>-->
    <li  v-for="pokemon in opciones" :key="pokemon.id" @click="$emit('seleccionado',pokemon.id)">{{pokemon.nombre}}</li>
  </ul>
</div>
 
</template>

<script>
export default {
  props:{
    opciones:{
      type: Array,
      required: true
    }
  }, 
  methods:{
    pruebaDeEvento(){
      console.log("Prueba de eventos")
    }
  }

};
</script>

<style scoped>
ul{
  list-style-type: none;
}

li{
  border:2px outset #EAE2B7;
  border-radius: 5px;
  background-color: #D62828;
  margin-bottom: 10px;
  width: 200px;
  cursor: pointer;
  color: #ECE5BE;
}

li:hover{
  background-color: #003049;
  color: #EAE2B7;
  border: 2px inset #EAE2B7;
}
.contenedor-opciones{
  display: flex;
  justify-content: center;
}

</style>