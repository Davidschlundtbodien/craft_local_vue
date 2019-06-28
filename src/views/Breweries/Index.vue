<template>
  <div class="breweries-index">
    <h1>{{ message }}</h1>
    <div class="container">
      <div v-for="brewery in breweries">
        <!-- <img v-bind:src="brewery.profile_img" alt="brewery image"> -->
        <h2>{{brewery.name}}</h2>

        <h4>Upcoming Events: <div v-for="event in brewery.events">
          <h5>{{event.title}}</h5>
          <img v-bind:src="event.image" alt="event image">
          <h5>{{event.date}}</h5>
        </div></h4>

        <h4>Beers Offered:<div v-for="beer in brewery.beers">
          <img v-bind:src="beer.image" alt="event image">
          <h5>{{beer.name}}</h5>
          <h5>{{beer.style}} || {{beer.abv}}%</h5>
        </div></h4>     
             
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
