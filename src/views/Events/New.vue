<template>
  <div class="events-new">
    <h1>Schedule a New Event</h1>

    <form v-on:submit.prevent="submit()">

        <div>
          <label for="date">Scheduled date</label>
          <datetime type="datetime" placeholder="Click to pick a date!" v-model="newEventScheduledDate" use12-hour auto></datetime>
        </div>
        <div>
          <label for="title">Title:</label>
          <input type="text" class="form-control" placeholder="Event title" v-model="newEventTitle">
        </div>
        <div>
          <label for="location">Location:</label>
          <input type="text" class="form-control" id="location" placeholder="Where the event is held" v-model="newEventLocation">
        </div>
        <div>
          <label for="content">Content:</label>
          <input type="text" class="form-control" placeholder="Quick summary of event" v-model="newEventContent">
        </div>
        <div>
          <label for="image">Image:</label>
          <input type="text" class="form-control" placeholder="Place an image url here" v-model="newEventImage">
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
