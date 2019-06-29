<template>
  <div class="breweries-show">
    <h1>{{ brewery.name }}</h1>
    <h4>Beers Offered:<div v-for="beer in brewery.beers">
      <img v-bind:src="beer.image" alt="event image">
      <h5>{{beer.name}}</h5>
      <h5>{{beer.style}} || {{beer.abv}}%</h5>
    </div></h4>
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
