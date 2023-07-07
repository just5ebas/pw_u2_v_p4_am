<template>
  <div>
    <router-link to="/">Bienvenido</router-link>
    <router-link to="/juego">Juego</router-link>
    <router-link to="/pokemon">Pokemon</router-link>
    <router-link to="/premios">Premios</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
div {
  padding: 0 30px;
}
div a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
</style>