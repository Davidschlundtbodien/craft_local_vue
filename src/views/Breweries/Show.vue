<template>
  <div class="breweries-show">
<!--     
    <datalist id="search-filters">
      <option v-for="beer in brewery.beers">{{beer.name}}</option>
      <option v-for="event in brewery.events">{{event.location}}</option>
    </datalist>

    <div class="container">
      <div class="form-group">
        <span>Sort By: </span>
        <button v-on:click="setSortAttribute('abv')">ABV</button>
        <button v-on:click="setSortAttribute('released')">Most Recent</button>
      </div>

      <div v-for="beer in orderBy(filterBy(brewery.beers, $parent.searchFilter, 'name', 'style', 'formats'), sortAttribute, sortAscending)">
      </div>    
    </div>
 -->
      <!-- Brewery info -->
    <section class="g-flex-centered g-height-600 g-bg-darkgray-radialgradient-circle g-color-white-opacity-0_7 p-pos-rel">
      <div class="container justify-content-center">
        <div class="row justify-content-center">
          <div class="col-md-6 align-self-center g-py-20">
            <h2 class="h4 text-uppercase g-letter-spacing-1 g-color-primary g-mb-20">{{brewery.name}}</h2>
            <p class="lead mb-0 g-line-height-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin hendrerit rhoncus tempus. Donec id orci malesuada, finibus odio quis, tincidunt libero. Fusce in venenatis ligula. Etiam eget lacus id erat scelerisque tempor.</p>
          </div>

          <div class="col-md-4 align-self-center g-py-20">
            <img class="g-height-350" v-bind:src="brewery.profile_img" alt="Brewery Image">
          </div>
        </div>
      </div>
    </section>

      <!-- Event showcase -->
    <div class="row justify-content-center g-py-100 g-pos-rel" v-for="event in brewery.events">
      <div class="col-lg-4 g-mb-50 g-mb-0--lg">
        <img class="img-fluid" v-bind:src="event.image" alt="Image Description">
      </div>

      <div class="col-lg-4 align-self-center">
        <header class="u-heading-v2-3--bottom g-brd-primary g-mb-20">
          <h2 class="h3 u-heading-v2__title text-uppercase g-font-weight-300">{{event.title}}</h2>
        </header>

        <p class="lead g-mb-30">{{event.content}}</p>

        <ul class="list-unstyled g-color-gray-dark-v4 g-mb-40">
          <li class="d-flex g-mb-10">
            <i class="icon-clock g-color-primary g-mt-5 g-mr-10"></i>
            {{event.date}}
          </li>
          <li class="d-flex g-mb-10">
            <i class="icon-map g-color-primary g-mt-5 g-mr-10"></i>
            {{event.location}}
          </li>
        </ul>

        <router-link v-bind:to="'/events/' + event.id">
          <a class="btn btn-lg u-btn-outline-primary u-btn-hover-v1-4 g-mr-10 g-mb-15 rounded-5">View Event</a>
        </router-link>

      </div>
    </div>

    <!-- Beer List -->
    <section class="container justify-content-center">
      <div class="row">
      <div class="col-md-6 col-lg-3 g-mb-30" v-for="beer in brewery.beers">
        <!-- Article -->
        <article class="u-shadow-v1-5 g-bg-white g-color-black text-center rounded g-px-20 g-py-40 g-mb-5">
          <!-- Article Image -->
          <router-link v-bind:to="'/beers/' + beer.id">
            <img class="d-inline-block g-height-200 img-fluid mb-4" v-bind:src="beer.image" alt="Image Description">
          </router-link>  
          <!-- End Article Image -->

          <!-- Article Content -->
          <router-link v-bind:to="'/beers/' + beer.id">
          <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">{{beer.name}}</h4>
          </router-link>
          <p>{{beer.style}}</p>
          <span class="d-block g-color-primary g-font-size-16">{{beer.abv}}%</span>
          <!-- End Article Content -->
        </article>
        <!-- End Article -->
      </div>
      </div>      
    </section>


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
