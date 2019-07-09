import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Breweries/Index.vue';
import BreweriesShow from './views/Breweries/Show.vue';
import BreweriesSignup from "./views/Breweries/Signup.vue";
import BreweriesLogin from "./views/Breweries/Login.vue";
import BreweriesLogout from "./views/Breweries/Logout.vue";
import BeersShow from './views/Beers/Show.vue';
import BeersNew from './views/Beers/New.vue';
import BeersEdit from './views/Beers/Edit.vue';
import EventsShow from './views/Events/Show.vue';
import EventsNew from './views/Events/New.vue';
import EventsEdit from './views/Events/Edit.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'breweries-index', component: Home },
    { path: "/breweries", name: "breweries-signup", component: BreweriesSignup },
    { path: "/login", name: "breweries-login", component: BreweriesLogin },
    { path: "/logout", name: "breweries-logout", component: BreweriesLogout },
    { path: '/breweries/:id', name: 'breweries-show', component: BreweriesShow },
    { path: '/beers/new', name: 'beers-new', component: BeersNew },
    { path: '/beers/:id', name: 'beers-show', component: BeersShow },
    { path: '/beers/:id/edit', name: 'beers-edit', component: BeersEdit },
    { path: '/events/new', name: 'events-new', component: EventsNew },
    { path: '/events/:id', name: 'events-show', component: EventsShow },
    { path: '/events/:id/edit', name: 'events-edit', component: EventsEdit }
  ]
});
