<template>
  <div class="beers-new">
    <h1>New Brew!</h1>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Beer name" v-model="newBeerName">
        </div>
        <div>
          <label for="style">Style</label>
          <input type="text" class="form-control" id="style" placeholder="BJCP Style" v-model="newBeerStyle">
        </div>
        <div>
          <label for="glassware">Glassware</label>
          <input type="text" class="form-control" id="glassware" placeholder="Nonic Pint" v-model="newBeerGlassware">
        </div>
        <div>
          <label for="ibu">IBU</label>
          <input type="number" class="form-control" id="ibu" placeholder="12" v-model="newBeerIbu">
        </div>
        <div>
          <label for="srm">SRM</label>
          <input type="number" class="form-control" id="srm" placeholder="4" v-model="newBeerSrm">
        </div>
        <div>
          <label for="abv">ABV</label>
          <input type="text" class="form-control" id="abv" placeholder="4.7" v-model="newBeerAbv">
        </div>
        <div>
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" placeholder="Short summary about the beer" v-model="newBeerDescription">
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" class="form-control" id="image" placeholder="Place an image url here" v-model="newBeerImage">
        </div>
        <div>
          <div v-for="format in formats">
            <input type="checkbox" v-bind:id="format.name" v-bind:value="format.id" v-model="formatIds">
            <label v-bind:for="format.name">{{format.name}}</label>
          </div>
        </div>
        

      <button type="submit">Create New Beer</button>
    </form>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      formats:[],
      newBeerName: "",
      newBeerDescription: "",
      newBeerStyle: "",
      newBeerImage: "",
      newBeerAbv: "",
      newBeerIbu: "",
      newBeerSrm: "",
      newBeerGlassware: "",
      newBeerBreweryId: "",
      formatIds:[]
    };
  },
  created: function() {
    axios.get("/api/formats").then(response => {
      this.formats = response.data;
    });

  },
  methods: {
    submit: function() {
      var params = {
        name: this.newBeerName,
        description: this.newBeerDescription,
        style: this.newBeerStyle,
        image: this.newBeerImage,
        abv: this.newBeerAbv,
        ibu: this.newBeerIbu,
        srm: this.newBeerSrm,
        glassware: this.newBeerGlassware,
        format_ids: this.formatIds
      };
      axios.post("/api/beers", params).then(response => {
        console.log(response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>
