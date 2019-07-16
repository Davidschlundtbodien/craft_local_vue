<template>
  <div class="breweries-edit">

    <section class="g-min-height-100vh g-flex-centered g-bg-img-hero g-bg-pos-top-center" style="background-image: url(https://www.allagash.com/wp-content/uploads/homeshow-01-1920x1080.jpg);">
      <div class="container g-py-50 g-pos-rel g-z-index-1">
          <div class="row justify-content-center u-box-shadow-v24">
            <div class="col-sm-10 col-md-9 col-lg-6">
              <div class="g-bg-white rounded g-py-40 g-px-30">
                <header class="text-center mb-4">
                  <h2 class="h2 g-color-black g-font-weight-600"> Editing {{brewery.name}}</h2>
                  <img class="w-50" v-bind:src="brewery.profile_img" alt="Current Profile Image">
                </header>

                <!-- Form -->
                <form class="g-py-15" v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder=" Brewery Name" v-model="brewery.name">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Address" v-model="brewery.address">
                    </div>
                  </div>

                  <div class="mb-4">
                    <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Profile Image URL" v-model="brewery.profile_img">
                  </div>

                  <div class="row justify-content-between mb-5">
                    <div class="col align-self-center text-center">
                      <button class="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="submit" value="submit">Confirm Changes</button>
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
      brewery: {}
    };
  },
  created: function() {
    axios.get("/api/breweries/" + localStorage.getItem('user_id')).then(response => {
      this.brewery = response.data;
      console.log(this.brewery);
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.brewery.name,
        address: this.brewery.address,
        profile_img: this.brewery.profile_img
      };
      axios.patch("/api/breweries/" + localStorage.getItem('user_id'), params).then(response => {
        localStorage.setItem("user_name", this.brewery.name);
        this.$router.push("/breweries/" + this.brewery.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    destroyBrewery: function(brewery) {
      axios.delete("/api/breweries/" + this.brewery.id).then(response => {
        console.log("Brewery Removed", response.data);
        localStorage.removeItem("user_name");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>