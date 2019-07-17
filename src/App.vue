<template>
  <div id="app">
    <div id="nav">

      <header id="js-header" class="u-header u-header--sticky-top u-header--show-hide u-header--change-appearance" data-header-fix-moment="500" data-header-fix-effect="slide">
        <div class="u-header__section u-header__section--light g-bg-white g-transition-0_3 g-py-10" data-header-fix-moment-exclude="g-bg-white g-py-10" data-header-fix-moment-classes="g-bg-white-opacity-0_7 u-shadow-v18 g-py-0">
          <nav class="navbar navbar-expand-lg">
            <div class="container">
              <!-- Responsive Toggle Button -->
              <button class="navbar-toggler navbar-toggler-left btn g-line-height-1 g-brd-none g-pa-0 g-pos-abs g-top-3 g-right-0" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
              <span class="hamburger hamburger--slider">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </span>
              </button>
              <!-- End Responsive Toggle Button -->

              <!-- Navigation -->
              <div class="collapse navbar-collapse align-items-center flex-sm-row g-pt-10 g-pt-5--lg" id="navBar">
                <ul class="navbar-nav align-items-lg-center mx-auto text-uppercase g-font-weight-600 u-nav-hover-v1" data-splitted-breakpoint="992">
                  <li class="nav-item g-mx-20--lg" v-if="isLoggedIn()">
                    <router-link to="/beers/new">
                      <a class="nav-link px-0">New Beer</a>
                    </router-link>
                  </li>
                  <li class="nav-item g-mx-20--lg" v-if="isLoggedIn()">
                    <router-link to="/events/new">
                      <a class="nav-link px-0">New Event</a>
                    </router-link>
                  </li>
                  <li class="nav-item g-mx-20--lg" v-if="!isLoggedIn()">
                    <router-link to="/breweries">
                      <a class="nav-link px-0">Signup</a>
                    </router-link>
                  </li>
                  <!-- Logo -->
                  <li class="nav-logo-item g-mx-40--lg">
                    <router-link to="/">
                      <a class="navbar-brand mr-0">
                        <img src="html/assets/img/logo/craftlocal.png" alt="Image Description">
                      </a>
                    </router-link>  
                  </li>
                  <!-- End Logo -->
                  <li class="nav-item g-mx-20--lg" v-if="!isLoggedIn()" >
                    <router-link to="/login">
                      <a class="nav-link px-0">Login</a>
                    </router-link>
                  </li>
                  <li class="nav-item g-mx-20--lg" v-if="isLoggedIn()">
                    <router-link to="/logout">
                      <a class="nav-link px-0">Logout</a>
                    </router-link>
                  </li>
                  <li class="nav-item dropdown g-mx-20--lg" v-if="isLoggedIn()">
                    <a href="#" class="nav-link dropdown-toggle g-px-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ userName() }} </a>
                    <!-- Submenu (Bootstrap) -->
                    <ul class="dropdown-menu rounded-0 g-text-transform-none g-brd-none g-brd-top g-brd-primary g-brd-top-2 g-mt-20 g-mt-10--lg--scrolling">
                      <li class="dropdown-item active">
                        <router-link v-bind:to="'/breweries/' + userId()">
                         <a class="nav-link px-0">Profile</a>
                        </router-link>
                      </li>
                      <li class="dropdown-item">
                        <router-link v-bind:to="'/breweries/' + userId() + '/edit'">
                         <a class="nav-link px-0">Edit</a>
                        </router-link>
                      </li>
                    </ul>
                    <!-- End Submenu (Bootstrap) -->
                  </li>                  
                </ul>
              </div>
              <!-- End Navigation -->
              <div class="d-inline-block g-pos-abs g-top-12 g-right-65 g-pos-rel--lg g-top-0--lg g-right-0--lg g-valign-middle g-ml-30 g-ml-0--lg">
                <a href="#" class="g-font-size-18 g-color-main" aria-haspopup="true" aria-expanded="false" aria-controls="searchform-1" data-dropdown-target="#searchform-1" data-dropdown-type="css-animation" data-dropdown-duration="300" data-dropdown-animation-in="fadeInUp" data-dropdown-animation-out="fadeOutDown">
                  <i class="fa fa-search"></i>
                </a>

                <!-- Search Form -->
                <form id="searchform-1" class="u-searchform-v1 u-dropdown--css-animation g-bg-white g-pa-10 g-mt-25--lg g-mt-15--lg--scrolling u-dropdown--hidden" style="animation-duration: 300ms; right: -15px;">
                  <div class="input-group g-brd-primary--focus">
                    <input type="search" class="form-control rounded-0 u-form-control" placeholder="Search" v-model="searchFilter" list="search-filters">
                    <div class="input-group-addon p-0">
                      <button class="btn rounded-0 btn-primary btn-md g-font-size-14 g-px-18" type="submit">Go</button>
                    </div>
                  </div>
                </form>
                <!-- End Search Form -->
              </div>
            </div>
          </nav>
        </div>
      </header>

    </div>
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      searchFilter: ""
    };
  },
  created: function() {},
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }
    },
    userName: function() {
      return localStorage.getItem("user_name");
    },
    userId: function() {
      return localStorage.getItem("user_id");
    },
    searchClear: function() {
      this.searchFilter = "";
    }

  }
};
</script>