<template>
  <div class="beers-show">
<!--     <button v-if="isCurrentBrewery()"><router-link v-bind:to="'/beers/' + beer.id + '/edit'">Edit</router-link></button>
    <button v-if="isCurrentBrewery()" v-on:click="destroyBeer(beer)">Remove</button>
    <h1>{{ beer.name }}</h1>
    <img v-bind:src="beer.image" alt="Beer image">
    <h2>{{beer.style}} || {{beer.abv}}% || IBU: {{beer.ibu}} || SRM: {{beer.srm}}</h2>
    <h3>Glassware: {{beer.glassware}}</h3>
    <h3>Released: {{beer.released}}</h3>
    <p>{{beer.description}}</p>

    <div v-for="format in beer.formats" class="container">
      <h3>{{format.name}}</h3>
      <h4>{{format.single_unit_volume}} oz || Pack: {{format.pack}} || Case: {{format.case}}</h4>
    </div>  -->
    

    
    <div class="row justify-content-center g-py-200 g-pos-rel">
        <div class="col-md-4">
          <img class="img-fluid g-height-400" v-bind:src="beer.image" alt="Image Description">
        </div>

        <div class="col-md-4">
          <div class="u-heading-v2-3--bottom g-brd-primary g-mb-30">
            <h2 class="h3 text-uppercase g-font-weight-300 u-heading-v2__title">{{beer.name}}</h2>
          </div>
          <div class="u-heading-v2-3--bottom g-brd-primary g-mb-30">
            <p class="lead">{{beer.description}}</p>
          </div>
          <p class="lead"> {{beer.glassware}}</p>
          <p>Released: {{beer.released}}</p>
          <router-link v-bind:to="'/beers/' + beer.id + '/edit'">
          <a v-if="isCurrentBrewery()" class="btn btn-md u-btn-inset u-btn-outline-primary g-mr-10 g-mb-15">Edit</a>
          </router-link>
        </div>
    </div>


      <!-- Counters -->
    <div class="dzsparallaxer auto-init height-is-based-on-content use-loading" data-options="{direction: 'reverse', settings_mode_oneelement_max_offset: '150'}">
        <div class="divimage dzsparallaxer--target w-100 g-bg-size-cover g-bg-img-hero g-bg-cover g-bg-black-opacity-0_7--after" style="height: 130%; background-image: url(https://www.wheelhousebrewing.com/wp-content/themes/wheelhouse/images/slide1.jpg);"></div>

        <div class="container g-pt-100 g-pb-70">
          <div class="row justify-content-center">
            <div class="col-sm-6 col-lg-3 align-items-end mt-auto g-mb-50">
              <div class="text-center">
                <span class="js-counter g-color-primary g-font-weight-600 g-font-size-60 g-line-height-0_9 mr-2">{{beer.abv}}</span>
                <h3 class="d-inline-block g-color-white g-font-weight-600 g-font-size-22 mb-0">ABV</h3>
              </div>
            </div>

            <div class="col-sm-6 col-lg-3 align-items-end mt-auto g-mb-50">
              <div class="text-center">
                <span class="js-counter g-color-primary g-font-weight-600 g-font-size-60 g-line-height-0_9 mr-2">{{beer.ibu}}</span>
                <h3 class="d-inline-block g-color-white g-font-weight-600 g-font-size-22 mb-0">IBU</h3>
              </div>
            </div>

            <div class="col-sm-6 col-lg-3 align-items-end mt-auto g-mb-50">
              <div class="text-center">
                <span class="js-counter g-color-primary g-font-weight-600 g-font-size-60 g-line-height-0_9 mr-2">{{beer.srm}}</span>
                <h3 class="d-inline-block g-color-white g-font-weight-600 g-font-size-22 mb-0">SRM</h3>
              </div>
            </div>
          </div>
        </div>
    </div>
      <!-- End Counters -->

    <section class="row justify-content-center g-py-100 g-pos-rel g-bg-darkgray-radialgradient-circle">
      <article class="d-md-table w-80 g-bg-white g-mb-3" v-for="format in beer.formats">

        <!-- Article Content -->
        <div class="d-md-table-cell align-middle g-py-15 g-px-20">
          <h3 class="h6 g-font-weight-700 text-uppercase">
            <a class="g-color-gray-dark-v2">{{format.name}}</a>
          </h3>
          <em class="g-color-gray-dark-v5 g-font-style-normal">Pack: {{format.pack}} || Case: {{format.case}}</em>
        </div>
        <!-- End Article Content -->

        <!-- Price -->
        <div class="d-md-table-cell align-middle g-py-5 g-px-20">
          <span class="d-block g-color-gray-dark-v2 g-font-weight-700">{{format.single_unit_volume}}</span>
          <span class="d-block g-color-gray-dark-v5 g-font-size-11 text-uppercase">ounces</span>
        </div>
        <!-- End Price -->
      </article>
    </section>
    

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
    },
    isCurrentBrewery: function() {
      if (this.beer.brewery_id == localStorage.getItem('user_id')) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>