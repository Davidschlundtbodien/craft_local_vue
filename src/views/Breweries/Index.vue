<template>
  <div class="breweries-index">

<!--     <datalist id="search-filters">
      <option v-for="brewery in breweries">{{brewery.name}}</option>
    </datalist>
 -->
    <section class="g-py-100 g-pos-rel">

      <div class="dzsparallaxer height-is-based-on-content g-bg-cover g-bg-black-opacity-0_10">
        <div class="divimage dzsparallaxer--target w-100" style="height: 140%; background: url(http://furnaceroombrewery.com/images/stories/1120x600/beer_ingredient_glass.jpg);"></div>
        <div class="container g-bg-cover__inner g-py-100">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <div class="text-center g-z-index-1 text-uppercase">
                <blockquote class="g-color-white g-font-size-28 g-mb-20">Welcome to
                  <span class="g-color-primary g-font-weight-700">Craft Local</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container justify-content-center g-py-80">
      <!-- Team Block -->
      <div class="row">
        <div class="col-md-4 g-mb-30" v-for="brewery in orderBy(breweries, 'name')">
          <!-- Figure -->
          <figure class="u-shadow-v1-5 g-bg-white g-rounded-4 g-pa-20">
            <div class="d-flex justify-content-start">
              <!-- Figure Image -->
              <router-link v-bind:to="'/breweries/' + brewery.id">
                <img class="g-width-90 g-height-90 rounded-5 g-mr-15" v-bind:src="brewery.profile_img" alt="Image Description">
              </router-link>
              <!-- Figure Image -->

              <div class="d-block">
                <!-- Figure Info -->
                <div class="g-mb-5">
                  <h4 class="h5 g-mb-1">{{brewery.name}}</h4>
                  <em class="d-block g-color-gray-dark-v4 g-font-style-normal g-font-size-13">{{brewery.address}}</em>
                </div>
                <!-- End Figure Info -->

                <!-- Social Icons -->
                <ul class="list-inline mb-0">
                  <li class="list-inline-item g-mx-2">
                    <a class="u-icon-v1 u-icon-slide-up--hover g-color-gray-dark-v4 g-color-facebook--hover g-ml-minus-15" href="#">
                      <i class="g-font-size-default g-line-height-1 u-icon__elem-regular fa fa-facebook"></i>
                      <i class="g-font-size-default g-line-height-0_8 u-icon__elem-hover fa fa-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-2">
                    <a class="u-icon-v1 u-icon-slide-up--hover g-color-gray-dark-v4 g-color-twitter--hover" href="#">
                      <i class="g-font-size-default g-line-height-1 u-icon__elem-regular fa fa-twitter"></i>
                      <i class="g-font-size-default g-line-height-0_8 u-icon__elem-hover fa fa-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-2">
                    <a class="u-icon-v1 u-icon-slide-up--hover g-color-gray-dark-v4 g-color-instagram--hover" href="#">
                      <i class="g-font-size-default g-line-height-1 u-icon__elem-regular fa fa-instagram"></i>
                      <i class="g-font-size-default g-line-height-0_8 u-icon__elem-hover fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
                <!-- End Social Icons -->
              </div>
            </div>

            <hr class="g-brd-gray-light-v4 g-my-15">

            <div class="g-py-10">
              <!-- Figure Contacts -->
              <ul class="list-unstyled g-color-gray-dark-v5 g-font-size-13 g-mb-0">
                <li class="g-mb-10">
                  <i class="g-pos-rel g-mt-1 mr-2 icon-communication-062 u-line-icon-pro"></i>
                  <a href="#">{{brewery.email}}</a>
                </li>
                <li>
                  <i class="g-pos-rel g-top-1 mr-2 icon-electronics-005 u-line-icon-pro"></i>
                  <em class="g-font-style-normal">+(01) 333 44 55</em>
                </li>
              </ul>
              <!-- End Figure Contacts -->
            </div>

            <hr class="g-brd-gray-light-v4 g-my-15">

            <!-- Figure Title -->
            <div class="d-flex justify-content-between align-items-center mb-4">
            
              <h4 class="h6 mb-0" v-on:click="$parent.searchClear()">Latest Beer</h4>
              <router-link v-bind:to="'/breweries/' + brewery.id">
                <a class="u-link-v5 g-brd-around g-brd-gray-light-v3 g-color-black g-color-primary--hover g-font-size-12 rounded g-px-10 g-py-5">View Brewery</a>
              </router-link>
            </div>
            <!-- End Figure Title -->

            <div class="d-flex justify-content-start" v-for="beer in limitBy(orderBy(brewery.beers, 'released', -1), 1)">
              <!-- Figure Image -->
              <router-link v-bind:to="'/beers/' + beer.id">
                <img class="g-width-50 g-height-50 rounded-circle g-mr-15" v-bind:src="beer.image" alt="Image Description">
              </router-link>  
              <!-- Figure Image -->

              <div class="d-block">
                <!-- Figure Info -->
                <div class="g-mb-5">
                  <h3 class="h6 g-font-weight-600 mb-1">
                    <router-link v-bind:to="'/beers/' + beer.id">
                      <a class="g-color-black g-color-primary--hover">{{beer.name}}</a>
                    </router-link>  
                  </h3>
                  <em class="g-color-gray-dark-v4 g-font-style-normal g-font-size-12">Date: </em>
                  <a class="g-font-size-12" href="#">{{beer.released}}</a>
                </div>
                <!-- End Figure Info -->
              </div>
            </div>
          </figure>
          <!-- End Figure -->
        </div>
      </div>
      <!-- End Team Block -->
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
  methods: {}
};
</script>
