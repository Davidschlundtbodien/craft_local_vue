<template>
  <div class="beers-new">
    <section class="g-min-height-100vh g-flex-centered g-bg-img-hero g-bg-pos-top-center" style="background-image: url(https://timeincsecure-a.akamaihd.net/rtmp_uds/3281700261001/201903/1518/3281700261001_6010332442001_6010327553001-vs.jpg?pubId=3281700261001&videoId=6010327553001);">
      <div class="container g-py-50 g-pos-rel g-z-index-1">
          <div class="row justify-content-center u-box-shadow-v24">
            <div class="col-sm-10 col-md-9 col-lg-6">
              <div class="g-bg-white rounded g-py-40 g-px-30">
                <header class="text-center mb-4">
                  <h2 class="h2 g-color-black g-font-weight-600"> Create a Beer</h2>
                </header>

                <!-- Form -->
                <form class="g-py-15" v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder=" Beer Name" v-model="newBeerName">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="BJCP Style" v-model="newBeerStyle">
                    </div>
                  </div>

                  <div class="row justify-content-center">
                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="ABV" v-model="newBeerAbv">
                    </div>

                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="IBU" v-model="newBeerIbu">
                    </div>

                    <div class="col-xs-12 col-sm-3 mb-3">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="number" placeholder="SRM" v-model="newBeerSrm">
                    </div>
                  </div>

                  <div class="mb-4">
                    <textarea class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" rows="6" type="text" placeholder="Description" v-model="newBeerDescription">
                    </textarea>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Prefered Glassware" v-model="newBeerGlassware">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Image URL" v-model="newBeerImage">
                    </div>
                  </div>

                  <!-- Inline Checkboxes -->
                  <h4 class="h6 g-font-weight-700 g-mb-20">Inline checkboxes</h4>
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
                      <button class="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="submit" value="submit">Create Beer</button>
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
      formats:[],
      newBeerName: "",
      newBeerDescription: "",
      newBeerStyle: "",
      newBeerImage: "",
      newBeerAbv: "",
      newBeerIbu: "",
      newBeerSrm: "",
      newBeerGlassware: "",
      newBeerBreweryId: "",
      formatIds:[]
    };
  },
  created: function() {
    axios.get("/api/formats").then(response => {
      this.formats = response.data;
    });

  },
  methods: {
    submit: function() {
      var params = {
        name: this.newBeerName,
        description: this.newBeerDescription,
        style: this.newBeerStyle,
        image: this.newBeerImage,
        abv: this.newBeerAbv,
        ibu: this.newBeerIbu,
        srm: this.newBeerSrm,
        glassware: this.newBeerGlassware,
        format_ids: this.formatIds
      };
      axios.post("/api/beers", params).then(response => {
        console.log(response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>
