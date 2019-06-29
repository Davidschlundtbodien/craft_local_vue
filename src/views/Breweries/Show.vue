<template>
  <div class="breweries-show">
    <h1>{{ brewery.name }}</h1>
    
    <div class="container">
      <h4>Upcoming Events: <div v-for="event in brewery.events">
        <h5>{{event.title}}</h5>
        <h5>{{event.date}}</h5>
        <img v-bind:src="event.image" alt="Event image">
        <router-link v-bind:to="'/events/' + event.id"><button>Show more</button></router-link>
      </div></h4> 
    </div>

    <div class="container">
      <h4>Beers Offered:<div v-for="beer in brewery.beers">
        <img v-bind:src="beer.image" alt="Beer image">
        <h5>{{beer.name}}</h5>
        <h5>{{beer.style}} || {{beer.abv}}%</h5>
        <router-link v-bind:to="'/beers/' + beer.id"><button>Show more</button></router-link>
      </div></h4>
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
      brewery: {}
    };
  },
  created: function() {
    axios.get("/api/breweries/" + this.$route.params.id).then(response => {
      this.brewery = response.data;
      console.log(this.brewery);
    });
  },
  methods: {}
};
</script>
