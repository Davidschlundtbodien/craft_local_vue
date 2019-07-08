<template>
  <div class="events-new">
    <h1>Schedule a New Event</h1>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" placeholder="Event title" v-model="newEventTitle">
        </div>
        <div>
          <label for="date">Scheduled date</label>
          <input type="text" class="form-control" id="date" placeholder="July 4 2019" v-model="newEventScheduledDate">
        </div>
        <div>
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" placeholder="Nonic Pint" v-model="newEventLocation">
        </div>
        <div>
          <label for="content">Content</label>
          <input type="text" class="form-control" id="content" placeholder="Quick summary of event" v-model="newEventContent">
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" class="form-control" id="image" placeholder="Place an image url here" v-model="newEventImage">
        </div>
        <div v-for="beer in beers">
          <input type="checkbox" v-bind:id="beer.name" v-bind:value="beer.id" v-model="beerIds">
          <label v-bind:for="beer.name">{{beer.name}}</label>
        </div>



      <button type="submit">Schedule New Event</button>
    </form>
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
      newEventBreweryId: "",
      beerIds:[]
    };
  },
  // needs current user
  created: function() {
    axios.get("/api/breweries/1").then(response => {
      this.beers = response.data.beers;
      console.log(this.beers);
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.newEventTitle,
        scheduled_date: this.newEventScheduledDate,
        location: this.newEventLocation,
        content: this.newEventContent,
        image: this.newEventImage
      };
      axios.post("/api/events", params).then(response => {
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>
