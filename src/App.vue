<template>
  <div id="app">

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
                        <img src="/assets/img/logo/craftlocal.png" alt="Image Description">
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
                <a class="g-font-size-18 g-color-main" aria-haspopup="true" aria-expanded="false" aria-controls="searchform-1" data-dropdown-target="#searchform-1" data-dropdown-type="css-animation" data-dropdown-duration="300" data-dropdown-animation-in="fadeInUp" data-dropdown-animation-out="fadeOutDown"><i class="fa fa-search"></i></a>

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

    <router-view/>
    
    <footer id="footer">
        <!-- Footer -->
      <div class="g-bg-black-opacity-0_9 g-color-white-opacity-0_8 g-py-60">
          <div class="container">
            <div class="row">
              <!-- Footer Content -->
              <div class="col-lg-3 col-md-6 g-mb-40 g-mb-0--lg">
                <div class="u-heading-v2-3--bottom g-brd-white-opacity-0_8 g-mb-20">
                  <h2 class="u-heading-v2__title h6 text-uppercase mb-0">About Us</h2>
                </div>

                <p>Craft Local aims to expand brand awareness of local independant breweries,w by providing a clear and unified method to display product information to both local and visiting patrons.</p>
              </div>
              <!-- End Footer Content -->

              <!-- Footer Content -->
              <div class="col-lg-3 col-md-6 g-mb-40 g-mb-0--lg">
                <div class="u-heading-v2-3--bottom g-brd-white-opacity-0_8 g-mb-20">
                  <h2 class="u-heading-v2__title h6 text-uppercase mb-0">Latest Updates</h2>
                </div>

                <article>
                  <h3 class="h6 g-mb-2">
                    <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Image Links for beer and events</a>
                  </h3>
                  <div class="small g-color-white-opacity-0_6">July 18, 2019</div>
                </article>

                <hr class="g-brd-white-opacity-0_1 g-my-10">

                <article>
                  <h3 class="h6 g-mb-2">
                    <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">New Interface</a>
                  </h3>
                  <div class="small g-color-white-opacity-0_6">July 17, 2019</div>
                </article>

                <hr class="g-brd-white-opacity-0_1 g-my-10">

                <article>
                  <h3 class="h6 g-mb-2">
                    <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Spaceship Update</a>
                  </h3>
                  <div class="small g-color-white-opacity-0_6">May 4, 2019</div>
                </article>
              </div>
              <!-- End Footer Content -->

              <!-- Footer Content -->
              <div class="col-lg-3 col-md-6 g-mb-40 g-mb-0--lg">
                <div class="u-heading-v2-3--bottom g-brd-white-opacity-0_8 g-mb-20">
                  <h2 class="u-heading-v2__title h6 text-uppercase mb-0">Useful Links</h2>
                </div>

                <nav class="text-uppercase1">
                  <ul class="list-unstyled g-mt-minus-10 mb-0">
                    <li class="g-pos-rel g-brd-bottom g-brd-white-opacity-0_1 g-py-10">
                      <h4 class="h6 g-pr-20 mb-0">
                        <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">About Us</a>
                        <i class="fa fa-angle-right g-absolute-centered--y g-right-0"></i>
                      </h4>
                    </li>
                    <li class="g-pos-rel g-brd-bottom g-brd-white-opacity-0_1 g-py-10">
                      <h4 class="h6 g-pr-20 mb-0">
                        <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Portfolio</a>
                        <i class="fa fa-angle-right g-absolute-centered--y g-right-0"></i>
                      </h4>
                    </li>
                    <li class="g-pos-rel g-brd-bottom g-brd-white-opacity-0_1 g-py-10">
                      <h4 class="h6 g-pr-20 mb-0">
                        <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Our Services</a>
                        <i class="fa fa-angle-right g-absolute-centered--y g-right-0"></i>
                      </h4>
                    </li>
                    <li class="g-pos-rel g-brd-bottom g-brd-white-opacity-0_1 g-py-10">
                      <h4 class="h6 g-pr-20 mb-0">
                        <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Latest Jobs</a>
                        <i class="fa fa-angle-right g-absolute-centered--y g-right-0"></i>
                      </h4>
                    </li>
                    <li class="g-pos-rel g-py-10">
                      <h4 class="h6 g-pr-20 mb-0">
                        <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Contact Us</a>
                        <i class="fa fa-angle-right g-absolute-centered--y g-right-0"></i>
                      </h4>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- End Footer Content -->

              <!-- Footer Content -->
              <div class="col-lg-3 col-md-6">
                <div class="u-heading-v2-3--bottom g-brd-white-opacity-0_8 g-mb-20">
                  <h2 class="u-heading-v2__title h6 text-uppercase mb-0">Our Contacts</h2>
                </div>

                <address class="g-bg-no-repeat g-font-size-12 mb-0" style="background-image: url(../../../assets/img/maps/map2.png);">
                  <!-- Location -->
                  <div class="d-flex g-mb-20">
                    <div class="g-mr-10">
                      <span class="u-icon-v3 u-icon-size--xs g-bg-white-opacity-0_1 g-color-white-opacity-0_6">
                        <i class="fa fa-map-marker"></i>
                      </span>
                    </div>
                    <p class="mb-0">795 Folsom Ave, Suite 600,
                      <br>
                      San Francisco, CA 94107 795
                    </p>
                  </div>
                  <!-- End Location -->

                  <!-- Phone -->
                  <div class="d-flex g-mb-20">
                    <div class="g-mr-10">
                      <span class="u-icon-v3 u-icon-size--xs g-bg-white-opacity-0_1 g-color-white-opacity-0_6">
                        <i class="fa fa-phone"></i>
                      </span>
                    </div>
                    <p class="mb-0">(+123) 456 7890
                      <br>
                      (+123) 456 7891
                    </p>
                  </div>
                  <!-- End Phone -->

                  <!-- Email and Website -->
                  <div class="d-flex g-mb-20">
                    <div class="g-mr-10">
                      <span class="u-icon-v3 u-icon-size--xs g-bg-white-opacity-0_1 g-color-white-opacity-0_6">
                        <i class="fa fa-globe"></i>
                      </span>
                    </div>
                    <p class="mb-0">
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="mailto:info@htmlstream.com">info@htmlstream.com</a>
                      <br>
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">www.htmlstream.com</a>
                    </p>
                  </div>
                  <!-- End Email and Website -->
                </address>
              </div>
              <!-- End Footer Content -->
            </div>
          </div>
      </div>
        <!-- End Footer -->

        <!-- Copyright Footer -->
      <footer class="g-bg-gray-dark-v1 g-color-white-opacity-0_8 g-py-20">
          <div class="container">
            <div class="row">
              <div class="col-md-8 text-center text-md-left g-mb-10 g-mb-0--md">
                <div class="d-lg-flex">
                  <small class="d-block g-font-size-default g-mr-10 g-mb-10 g-mb-0--md">2019 © All Rights Reserved.</small>
                  <ul class="u-list-inline">
                    <li class="list-inline-item">
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Privacy Policy</a>
                    </li>
                    <li class="list-inline-item">
                      <span>|</span>
                    </li>
                    <li class="list-inline-item">
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Terms of Use</a>
                    </li>
                    <li class="list-inline-item">
                      <span>|</span>
                    </li>
                    <li class="list-inline-item">
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">License</a>
                    </li>
                    <li class="list-inline-item">
                      <span>|</span>
                    </li>
                    <li class="list-inline-item">
                      <a class="g-color-white-opacity-0_8 g-color-white--hover" href="#">Support</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-md-4 align-self-center">
                <ul class="list-inline text-center text-md-right mb-0">
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Facebook">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Skype">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-skype"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Linkedin">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Pinterest">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Twitter">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item g-mx-10" data-toggle="tooltip" data-placement="top" title="Dribbble">
                    <a href="#" class="g-color-white-opacity-0_5 g-color-white--hover">
                      <i class="fa fa-dribbble"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </footer>
        <!-- End Copyright Footer -->
    </footer>

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