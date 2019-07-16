<template>
  <div class="breweries-signup">
<!--     
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
 -->
    <section class="g-min-height-100vh g-flex-centered g-bg-img-hero g-bg-pos-top-center" style="background-image: url(https://timeincsecure-a.akamaihd.net/rtmp_uds/3281700261001/201903/1518/3281700261001_6010332442001_6010327553001-vs.jpg?pubId=3281700261001&videoId=6010327553001);">
      <div class="container g-py-50 g-pos-rel g-z-index-1">
          <div class="row justify-content-center u-box-shadow-v24">
            <div class="col-sm-10 col-md-9 col-lg-6">
              <div class="g-bg-white rounded g-py-40 g-px-30">
                <header class="text-center mb-4">
                  <h2 class="h2 g-color-black g-font-weight-600"> Brewery Signup</h2>
                </header>

                <!-- Form -->
                <form class="g-py-15" v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder=" Brewery Name" v-model="name">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Address" v-model="address">
                    </div>
                  </div>

                  <div class="mb-4">
                    <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="email" placeholder="johndoe@gmail.com" v-model="email">
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password" placeholder="Password" v-model="password">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password" placeholder="Confirm Password" v-model="passwordConfirmation">
                    </div>
                  </div>

                  <div class="row justify-content-between mb-5">
                    <div class="col align-self-center">
                      <label class="form-check-inline u-check g-color-gray-dark-v5 g-font-size-12 g-pl-25">
                        <input class="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" type="checkbox">
                        <div class="u-check-icon-checkbox-v6 g-absolute-centered--y g-left-0">
                          <i class="fa g-rounded-2" data-check-icon=""></i>
                        </div>
                        I accept the <a href="#">Terms and Conditions</a>
                      </label>
                    </div>
                    <div class="col align-self-center text-right">
                      <button class="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="submit" value="submit">Signup</button>
                    </div>
                  </div>
                </form>
                <!-- End Form -->

                <footer class="text-center">
                  <p class="g-color-gray-dark-v5 g-font-size-13 mb-0">Already have an account? <router-link to="/login"><a class="g-font-weight-600">Login</a></router-link>
                  </p>
                </footer>
              </div>
            </div>
          </div>
      </div>
    </section>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      address: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        address: this.address,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/breweries", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>