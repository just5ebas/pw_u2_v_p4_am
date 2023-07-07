import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  { path: "/", component: ()=> import('../modules/pokemon/page/BienvenidaPage') },
  { path: "/juego", component: ()=> import('../modules/pokemon/page/JuegoPage') },
  { path: "/premios", component: ()=> import('../modules/pokemon/page/PremiosPage') },
  { path: "/pokemon", component: ()=> import('../modules/pokemon/page/PokemonPage.vue') },
  { path: "/:pathMatch(.*)*", component: ()=> import('../modules/pokemon/page/NoEncontradoPage') },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
