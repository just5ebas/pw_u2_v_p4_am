<template>
  <PokemonPage />
</template>

<script>
import PokemonPage from "./modules/pokemon/page/PokemonPage.vue";

export default {
  name: "App",
  components: {
    PokemonPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
</style>
