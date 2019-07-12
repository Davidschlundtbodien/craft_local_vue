<template>
  <div class="breweries-index">

    <datalist id="search-filters">
      <option v-for="brewery in breweries">{{brewery.name}}</option>
    </datalist>


    <h1>{{ message }}</h1>
    <div class="container">
      <div v-for="brewery in filterBy(breweries, $parent.searchFilter)">
        <!-- <img v-bind:src="brewery.profile_img" alt="brewery image"> -->
        <h2>{{brewery.name}}</h2>
        <router-link v-bind:to="'/breweries/' + brewery.id">
          <button v-on:click="$parent.searchClear()">Show more</button>
        </router-link>    
        <div v-for="beer in limitBy(orderBy(filterBy(brewery.beers), 'released'), 1)">
          <router-link v-bind:to="'/beers/' + beer.id">
          <span v-on:click="$parent.searchClear()">{{beer.name}} || {{beer.style}}</span>
          </router-link>
        </div>     
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Craft Local",
      breweries: [],

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
