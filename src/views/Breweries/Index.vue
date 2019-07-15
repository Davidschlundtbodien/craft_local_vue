<template>
  <div class="breweries-index">

    <datalist id="search-filters">
      <option v-for="brewery in breweries">{{brewery.name}}</option>
    </datalist>

    <div id="map" class="container"></div>

    <h1>{{ message }}</h1>
    <div class="container">
      <div v-for="brewery in filterBy(breweries, $parent.searchFilter)">
        <img v-bind:src="brewery.profile_img" alt="brewery image">
        <h2>{{brewery.name}}</h2>
        <h4>{{brewery.address}}</h4>
        <div v-for="beer in limitBy(orderBy(filterBy(brewery.beers), 'released'), 1)">
          <router-link v-bind:to="'/beers/' + beer.id">
          <span v-on:click="$parent.searchClear()">{{beer.name}} || {{beer.style}}</span>
          </router-link>
        </div>     
        <router-link v-bind:to="'/breweries/' + brewery.id">
          <button v-on:click="$parent.searchClear()">Show more</button>
        </router-link>    
      </div>
    </div>

  </div>
</template>

<style>
canvas.mapboxgl-canvas {
   position: relative !important;
 }

#map { 
  width: 100%; 
  height: 500px;
}

.mapboxgl-marker {
  background-image: url(https://cdn0.iconfinder.com/data/icons/beer-set-glyph-silhouettes/300/205522386Untitled-3-512.png);
  background-size: cover;
  background-color: #4ff026;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
 
.mapboxgl-popup {
  max-width: 200px;
}

</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Craft Local",
      breweries: []
    };
  },
  created: function() {
    axios.get("/api/breweries").then(response => {
      this.breweries = response.data;
      console.log(this.breweries);
    });
  },
  updated: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc2tpIiwiYSI6ImNqeGFseXZ3dDAzZ3kzeW84MTZjNnBtaDYifQ.F-JPPqi8gSB8FSYqq6bJGA';
    
    var city = [-115.1398, 36.1699];
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: city,
      zoom: 10,
    });

    this.breweries.forEach(function(brewery) {
      var el = document.createElement('div');
      el.className = 'marker';
      // create the popup
      var popup = new mapboxgl.Popup({ offset: 25 })
        .setText(brewery.name);
      // create the marker
      var marker = new mapboxgl.Marker(el)
        .setLngLat([brewery.longitude, brewery.latitude])
        .setPopup(popup)
        .addTo(map);
    });
  },
  methods: {}
};
</script>
