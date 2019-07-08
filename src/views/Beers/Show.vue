<template>
  <div class="beers-show">
    <button><router-link v-bind:to="'/beers/' + beer.id + '/edit'">Edit</router-link></button>
    <button v-on:click="destroyBeer(beer)">Remove</button>
    <h1>{{ beer.name }}</h1>
    <img v-bind:src="beer.image" alt="Beer image">
    <h2>{{beer.style}} || {{beer.abv}}% || IBU: {{beer.ibu}} || SRM: {{beer.srm}}</h2>
    <h3>Glassware: {{beer.glassware}}</h3>
    <h3>Released: {{beer.released}}</h3>
    <p>{{beer.description}}</p>

    <div v-for="format in beer.formats" class="container">
      <h3>{{format.name}}</h3>
      <h4>{{format.single_unit_volume}} oz || Pack: {{format.pack}} || Case: {{format.case}}</h4>
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
      beer: {}
    };
  },
  created: function() {
    axios.get("/api/beers/" + this.$route.params.id).then(response => {
      this.beer = response.data;
      console.log(this.beer);
    });
  },
  methods: {
    destroyBeer: function(beer) {
      axios.delete("/api/beers/" + this.beer.id).then(response => {
        console.log("Beer Removed", response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>