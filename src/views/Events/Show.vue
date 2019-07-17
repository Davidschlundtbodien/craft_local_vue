<template>
  <div class="events-show">

<!--     <button v-if="isCurrentBrewery()"><router-link v-bind:to="'/events/' + event.id + '/edit'">Edit</router-link></button><br>
    <button v-if="isCurrentBrewery()" v-on:click="destroyEvent(event)">Remove</button><br>

    <img v-bind:src="event.image" alt="Event image">
    <h1>{{ event.title }} || {{event.date}}</h1>
    <h2>{{event.location}}</h2>
    <p>{{event.content}}</p>
    <div v-for="beer in event.beers">
      <h4>{{beer.name}}</h4>
      <h4>{{beer.style}} || {{beer.abv}}%</h4>
    </div>


    <div id="map"></div>


 -->

    <!-- Footer -->
    <section class="container-fluid px-0">
      <div class="row no-gutters g-min-height-80vh">
        <!-- section Content -->
        <div class="col-lg d-flex g-bg-black-opacity-0_9 g-color-white-opacity-0_8">
          <div class="align-self-center g-pa-60">

            <div class="col-md-4 align-self-center g-py-20">
              <img class="g-height-350" v-bind:src="event.image" alt="Brewery Image">
            </div>

            <div class="u-heading-v2-2--bottom g-brd-primary g-mb-30">
              <h2 class="u-heading-v2__title h1 g-color-white text-uppercase g-font-weight-600">{{event.title}}</h2>
            </div>

            <div class="lead g-font-weight-400 g-mb-40">
              <p>{{event.content}}</p>
            </div>

            <address class="text-uppercase display-6">
              <ul class="list-unstyled mb-0">
                <li class="d-flex align-items-baseline g-mb-10">
                  <i class="fa fa-map-marker g-color-primary g-mr-10"></i>
                    <span class="g-color-white">{{event.location}}</span>
                </li>
                <li class="d-flex align-items-baseline g-mb-10">
                  <i class="fa fa-calendar g-color-primary g-mr-10"></i>
                    <span class="g-color-white">{{event.date}}</span>
                </li>
                <li class="d-flex align-items-baseline" v-for="beer in event.beers">
                  <i class="fa fa-glass g-color-primary g-mr-10"></i>
                    <span class="g-color-white">{{beer.name}} <a class="g-color-primary"> | | </a> {{beer.style}}</span>
                </li>
              </ul>
            </address>
          </div>
        </div>
        <!-- End section Content -->

        <!-- Google Map -->
        <div class="col-lg g-min-height-400">
          <div id="map"></div>
        </div>
        <!-- End Google Map -->
      </div>
    </section>
    <!-- Footer -->

  </div>
</template>

<style>
#map { 
  width: 100%; 
  height: 100%;
}

#marker {
  background-image: url(https://cdn0.iconfinder.com/data/icons/beer-set-glyph-silhouettes/300/205522386Untitled-3-512.png);
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
 
.mapboxgl-popup {
  max-width: 200px;
}

canvas.mapboxgl-canvas {
   position: relative !important;
 }
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      event: {}
    };
  },
  created: function() {
    axios.get("/api/events/" + this.$route.params.id).then(response => {
      this.event = response.data;
      console.log(this.event);
    });
  },
  updated: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc2tpIiwiYSI6ImNqeGFseXZ3dDAzZ3kzeW84MTZjNnBtaDYifQ.F-JPPqi8gSB8FSYqq6bJGA';
     
    var event = [this.event.longitude, this.event.latitude];
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: event,
      zoom: 15,
    });
     
    // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 })
      .setText(this.event.content);
     
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';
     
    // create the marker
    new mapboxgl.Marker(el)
      .setLngLat(event)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  },  
  methods: {
    destroyEvent: function(beer) {
      axios.delete("/api/events/" + this.event.id).then(response => {
        console.log("Event Removed", response.data);
        this.$router.push("/breweries/" + localStorage.getItem('user_id'));
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    isCurrentBrewery: function() {
      if (this.event.brewery_id == localStorage.getItem('user_id')) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>