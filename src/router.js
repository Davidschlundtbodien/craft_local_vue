import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Breweries/Index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'breweries-index',
      component: Home
    }
  ]
});
