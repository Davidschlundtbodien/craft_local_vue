<template>
  <div class="beers-edit">
<!--     <h1>Editing - {{ beer.name }}</h1>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="beer name" v-model="beer.name">
        </div>
        <div>
          <label for="style">Style</label>
          <input type="text" class="form-control" id="style" placeholder="BJCP Style" v-model="beer.style">
        </div>
        <div>
          <label for="glassware">Glassware</label>
          <input type="text" class="form-control" id="glassware" placeholder="Nonic Pint" v-model="beer.glassware">
        </div>
        <div>
          <label for="ibu">IBU</label>
          <input type="number" class="form-control" id="ibu" placeholder="12" v-model="beer.ibu">
        </div>
        <div>
          <label for="srm">SRM</label>
          <input type="number" class="form-control" id="srm" placeholder="4" v-model="beer.srm">
        </div>
        <div>
          <label for="abv">ABV</label>
          <input type="text" class="form-control" id="abv" placeholder="4.7" v-model="beer.abv">
        </div>
        <div>
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" placeholder="Short summary about the beer" v-model="beer.description">
        </div>
        <div>
          <label for="image"><img v-bind:src="beer.image" alt=""></label><br>
          <input type="text" class="form-control" id="image" placeholder="Place an image url here" v-model="beer.image">
        </div>
        <div class="container">
          <span v-for="format in formats"><br>
            <label v-bind:for="format.name">{{format.name}}</label>
            <input type="checkbox" v-bind:id="format.id" v-bind:value="format.id" v-model="formatIds">
          </span>
        </div>

      <button type="submit">Confirm Changes</button>
    </form>

    <div>
      <button v-on:click="destroyBeer(beer)">Remove Beer</button>
    </div> -->

    <section class="g-min-height-100vh g-flex-centered g-bg-img-hero g-bg-pos-top-center" style="background-image: url(https://chamberbusinessnews.com/wp-content/uploads/2019/06/beer-2370783_1920.jpg);">
      <div class="container g-py-50 g-pos-rel g-z-index-1">
          <div class="row justify-content-center u-box-shadow-v24">
            <div class="col-sm-10 col-md-9 col-lg-6">
              <div class="g-bg-white rounded g-py-40 g-px-30">
                <header class="text-center mb-4">
                  <h2 class="h2 g-color-black g-font-weight-600">Editing {{beer.name}}</h2>
                </header>

                <!-- Form -->
                <form class="g-py-15" v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder=" Beer Name" v-model="beer.name">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="BJCP Style" v-model="beer.style">
                    </div>
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="ABV" v-model="beer.abv">
                    </div>

                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="IBU" v-model="beer.ibu">
                    </div>

                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="SRM" v-model="beer.srm">
                    </div>
                  </div>

                  <div class="mb-4">
                    <textarea class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" rows="6" type="text" placeholder="Description" v-model="beer.description">
                    </textarea>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Prefered Glassware" v-model="beer.glassware">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Image URL" v-model="beer.image">
                    </div>
                  </div>

                  <!-- Inline Checkboxes -->
                  <h4 class="h6 g-font-weight-700 g-mb-20">Revise Format Options</h4>
                  <div class="g-mb-20">
                     <label class="form-check-inline u-check g-pl-25" v-for="format in formats">
                       <input class="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" type="checkbox" v-bind:id="format.name" v-bind:value="format.id" v-model="formatIds">
                       <div class="u-check-icon-checkbox-v6 g-absolute-centered--y g-left-0">
                         <i class="fa" data-check-icon=""></i>
                       </div>
                       {{format.name}}
                     </label>
                  </div> 

                  <div class="row justify-content-between mb-5">
                    <div class="col align-self-center text-center">
                      <button class="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="submit" value="submit">Confirm Changes</button>
                      <button class="btn btn-md u-btn-darkred rounded g-py-13 g-px-25" v-on:click="destroyBeer(beer)">Delete Beer</button>
                    </div>
                  </div>
                </form>
                <!-- End Form -->
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      beer: {},
      formats: [],
      formatIds: []
    };
  },
  created: function() {
    axios.get("/api/beers/" + this.$route.params.id).then(response => {
      this.beer = response.data;
      console.log(this.beer);
      this.beer.formats.forEach(format => {
        this.formatIds.push(format.id);
      });

    });
    axios.get("/api/formats").then(response => {
      this.formats = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.beer.name,
        description: this.beer.description,
        style: this.beer.style,
        image: this.beer.image,
        abv: this.beer.abv,
        ibu: this.beer.ibu,
        srm: this.beer.srm,
        glassware: this.beer.glassware,
        format_ids: this.formatIds
      };
      axios.patch("/api/beers/" + this.beer.id, params).then(response => {
        this.$router.push("/beers/" + this.beer.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    destroyBeer: function(beer) {
      axios.delete("/api/beers/" + this.beer.id).then(response => {
        console.log("Beer Removed", response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    } 
  }
};
</script>