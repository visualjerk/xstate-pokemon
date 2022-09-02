import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:name', component: () => import('./views/Details.vue') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
