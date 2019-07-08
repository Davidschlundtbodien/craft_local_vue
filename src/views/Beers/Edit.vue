<template>
  <div class="beers-edit">
    <h1>Editing - {{ beer.name }}</h1>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="beer name" v-model="beer.name">
        </div>
        <div>
          <label for="style">Style</label>
          <input type="text" class="form-control" id="style" placeholder="BJCP Style" v-model="beer.style">
        </div>
        <div>
          <label for="glassware">Glassware</label>
          <input type="text" class="form-control" id="glassware" placeholder="Nonic Pint" v-model="beer.glassware">
        </div>
        <div>
          <label for="ibu">IBU</label>
          <input type="number" class="form-control" id="ibu" placeholder="12" v-model="beer.ibu">
        </div>
        <div>
          <label for="srm">SRM</label>
          <input type="number" class="form-control" id="srm" placeholder="4" v-model="beer.srm">
        </div>
        <div>
          <label for="abv">ABV</label>
          <input type="text" class="form-control" id="abv" placeholder="4.7" v-model="beer.abv">
        </div>
        <div>
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" placeholder="Short summary about the beer" v-model="beer.description">
        </div>
        <div>
          <label for="image"><img v-bind:src="beer.image" alt=""></label><br>
          <input type="text" class="form-control" id="image" placeholder="Place an image url here" v-model="beer.image">
        </div>
        <div class="container">
          <span v-for="format in formats"><br>
            <label v-bind:for="format.name">{{format.name}}</label>
            <input type="checkbox" v-bind:id="format.id" v-bind:value="format.id" v-model="formatIds">
          </span>
          <span>formatIds: {{ formatIds }}</span>
        </div>

      <button type="submit">Confirm Changes</button>
    </form>

    <div>
      <button v-on:click="destroyBeer(beer)">Remove Beer</button>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      beer: {},
      formats: [],
      formatIds: []
    };
  },
  created: function() {
    axios.get("/api/beers/" + this.$route.params.id).then(response => {
      this.beer = response.data;
      console.log(this.beer);
      this.beer.formats.forEach(format => {
        this.formatIds.push(format.id);
      });

    });
    axios.get("/api/formats").then(response => {
      this.formats = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.beer.name,
        description: this.beer.description,
        style: this.beer.style,
        image: this.beer.image,
        abv: this.beer.abv,
        ibu: this.beer.ibu,
        srm: this.beer.srm,
        glassware: this.beer.glassware,
        format_ids: this.formatIds
      };
      axios.patch("/api/beers" + this.beer.id, params).then(response => {
        this.$router.push("/beers/" + this.beer.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
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