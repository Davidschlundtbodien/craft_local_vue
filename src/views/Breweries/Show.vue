<template>
  <div class="breweries-show">
<!--     
    <datalist id="search-filters">
      <option v-for="beer in brewery.beers">{{beer.name}}</option>
      <option v-for="event in brewery.events">{{event.location}}</option>
    </datalist>

    <div class="container">
      <h4>Upcoming Events: <div v-for="event in filterBy(brewery.events, $parent.searchFilter, 'title', 'location')">
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
      <!-- Beer list -->
    <section class=" row justify-content-center g-py-100 g-pos-rel g-bg-darkgray-radialgradient-circle">
      <article class="d-md-table w-80 g-bg-white g-mb-4" v-for="beer in brewery.beers">
        <!-- Article Image -->
        <a class="d-md-table-cell align-middle g-width-130">
          <img class="d-block info-v5-2__image g-ml-minus-1" v-bind:src="beer.image" alt="Image Description">
        </a>
        <!-- End Article Image -->

        <!-- Article Content -->
        <div class="d-md-table-cell align-middle g-py-15 g-px-20">
          <h3 class="h6 g-font-weight-700 text-uppercase">
            <a class="g-color-gray-dark-v2">{{beer.name}}</a>
          </h3>
          <em class="g-color-gray-dark-v5 g-font-style-normal">{{beer.style}}</em>
        </div>
        <!-- End Article Content -->

        <!-- Price -->
        <div class="d-md-table-cell align-middle g-py-5 g-px-20">
          <span class="d-block g-color-gray-dark-v2 g-font-weight-700">{{beer.abv}}%</span>
          <span class="d-block g-color-gray-dark-v5 g-font-size-11 text-uppercase">ABV</span>
        </div>
        <!-- End Price -->

        <!-- Actions -->
        <div class="d-md-table-cell align-middle text-md-right g-pa-20">
          <div class="g-mt-minus-10 g-mx-minus-5">
            <router-link v-bind:to="'/beers/' + beer.id">
              <a class="btn btn-lg u-btn-outline-primary u-btn-hover-v1-4 g-mr-10 g-mb-15" >View Beer</a>
            </router-link>
          </div>
        </div>
        <!-- End Actions -->
      </article>
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
