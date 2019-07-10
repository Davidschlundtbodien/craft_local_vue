<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">| Home |</router-link>
      <router-link v-if="isLoggedIn()" to="/beers/new">| New Beer |</router-link>
      <router-link v-if="isLoggedIn()" to="/events/new">| New Event |<br></router-link>
      <router-link v-if="!isLoggedIn()" to="/breweries">| Signup |</router-link>
      <router-link v-if="!isLoggedIn()" to="/login">| Login |</router-link>
      <!-- Name sticks until refresh -->
      <span v-if="isLoggedIn()">| Logged in as: {{ loggedInUser }} |<br></span>
      <router-link v-if="isLoggedIn()" to="/logout">| Logout |</router-link>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      loggedInUser: localStorage.getItem('user_name')
    };
  },
  created: function() {},
  methods: {
    // Force re-render?
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }
    },

  }
};
</script>