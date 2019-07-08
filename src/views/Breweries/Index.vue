<template>
  <div class="breweries-index">
    <h1>{{ message }}</h1>
    <div class="container">
      <div v-for="brewery in breweries">
        <!-- <img v-bind:src="brewery.profile_img" alt="brewery image"> -->
        <h2>{{brewery.name}}</h2>
        <router-link v-bind:to="'/breweries/' + brewery.id"><button>Show more</button></router-link>    
             
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Craft Local",
      breweries: []
    };
  },
  created: function() {
    axios.get("/api/breweries").then(response => {
      this.breweries = response.data;
    });
  },
  methods: {}
};
</script>
