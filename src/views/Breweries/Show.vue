<template>
  <div class="breweries-show">
    <h1>{{ brewery.name }}</h1>

    <datalist id="search-filters">
      <option v-for="beer in brewery.beers">{{beer.name}}</option>
      <option v-for="event in brewery.events">{{event.location}}</option>
    </datalist>
    
    <div class="container">
      <h4>Upcoming Events: <div v-for="event in filterBy(brewery.events, $parent.searchFilter)">
        <h5>{{event.title}}</h5>
        <h5>{{event.date}}</h5>
        <img v-bind:src="event.image" alt="Event image">
        <router-link v-bind:to="'/events/' + event.id">
          <button v-on:click="$parent.searchClear()">Show more</button>
        </router-link>
      </div></h4> 
    </div>



    <div class="container">
      <div class="form-group">
        <span>Sort By: </span>
        <button v-on:click="setSortAttribute('abv')">ABV</button>
        <button v-on:click="setSortAttribute('released')">Most Recent</button>
      </div>
      <h4>Beers Offered</h4>
      <div v-for="beer in orderBy(filterBy(brewery.beers, $parent.searchFilter, 'name', 'style', 'formats'), sortAttribute, sortAscending)">
        <img v-bind:src="beer.image" alt="Beer image">
        <h5>{{beer.name}}</h5>
        <h5>{{beer.style}} || {{beer.abv}}%</h5>
        <router-link v-bind:to="'/beers/' + beer.id">
          <button v-on:click="$parent.searchClear()">Show more</button>
        </router-link>
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
      brewery: {},
      sortAttribute: 'released',
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/breweries/" + this.$route.params.id).then(response => {
      this.brewery = response.data;
      console.log(this.brewery);
    });
  },
  methods: {
    setSortAttribute: function(attribute) {
      if (this.sortAttribute === attribute) {
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
      }
      this.sortAttribute = attribute;
    }
  }
};
</script>
