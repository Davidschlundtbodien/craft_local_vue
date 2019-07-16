<template>
  <div class="events-new">
    <section class="g-min-height-100vh g-flex-centered g-bg-img-hero g-bg-pos-top-center" style="background-image: url(https://assets.visitmilwaukee.org/visitmke/media/global/Partner%20Images/Gallery%20Size/VM-ThirdSpaceBrewing-Beers.jpg?ext=.jpg&mode=crop&width=1920&height=1080&scale=both);">
      <div class="container g-py-50 g-pos-rel g-z-index-1">
          <div class="row justify-content-center u-box-shadow-v24">
            <div class="col-sm-10 col-md-9 col-lg-6">
              <div class="g-bg-white rounded g-py-40 g-px-30">
                <header class="text-center mb-4">
                  <h2 class="h2 g-color-black g-font-weight-600">Event Scheduling</h2>
                </header>

                <!-- Form -->
                <form class="g-py-15" v-on:submit.prevent="submit()">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Event Title" v-model="newEventTitle">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <datetime class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="datetime" placeholder="Pick a date and time" v-model="newEventScheduledDate" use12-hour auto></datetime>
                    </div>
                  </div>

                  <div class="mb-4">
                    <textarea class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" rows="6" type="text" placeholder="What's the Event for?" v-model="newEventContent">
                    </textarea>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Where is it being held?" v-model="newEventLocation">
                    </div>

                    <div class="col-xs-12 col-sm-6 mb-4">
                      <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="text" placeholder="Image URL" v-model="newEventImage">
                    </div>
                  </div>

                  <!-- Inline Checkboxes -->
                  <h4 class="h6 g-font-weight-700 g-mb-20">Choose your beers for the event</h4>
                  <div class="g-mb-20">
                     <label class="form-check-inline u-check g-pl-25" v-for="beer in beers">
                       <input class="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" type="checkbox" v-bind:id="beer.name" v-bind:value="beer.id" v-model="beerIds">
                       <div class="u-check-icon-checkbox-v6 g-absolute-centered--y g-left-0">
                         <i class="fa" data-check-icon=""></i>
                       </div>
                       {{beer.name}}
                     </label>
                  </div> 

                  <div class="row justify-content-between mb-5">
                    <div class="col align-self-center text-center">
                      <button class="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="submit" value="submit">Schedule Event</button>
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
      beers: [],
      newEventTitle: "",
      newEventScheduledDate: "",
      newEventLocation: "",
      newEventContent: "",
      newEventImage: "",
      beerIds:[]
    };
  },
  created: function() {
    axios.get("/api/breweries/" + localStorage.getItem('user_id')).then(response => {
      this.beers = response.data.beers;
      console.log(this.beers);
    });
  },
  methods: {
    submit: function() {
      var params = {
        title: this.newEventTitle,
        scheduled_date: this.newEventScheduledDate,
        location: this.newEventLocation,
        content: this.newEventContent,
        image: this.newEventImage,
        beer_ids: this.beerIds
      };
      axios.post("/api/events", params).then(response => {
        this.$router.push("/breweries/" + localStorage.getItem('user_id'));
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>
