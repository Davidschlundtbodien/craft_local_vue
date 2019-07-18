<template>
  <div class="beers-show">
    
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
          <p class="lead"> Glassware: {{beer.glassware}}</p>
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

    <section class="container g-py-20 g-pos-rel">
      <div class="row">
      <div class="col-md-4 g-mb-30 justify-content-center" v-for="format in beer.formats">
        <!-- Article -->
        <article class="u-shadow-v1-5 g-bg-white g-color-black text-center rounded g-px-20 g-py-40 g-mb-5">
          <!-- Article Content -->
          <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">{{format.name}}</h4>
          <p>Pack size : {{format.pack}} | | Case size: {{format.case}}</p>
          <span class="d-block g-color-primary g-font-size-16">{{format.single_unit_volume}} oz</span>
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