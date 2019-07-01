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
        <div>
          <label for="brewery id">Brewery id</label>
          <input type="number" class="form-control" id="brewery id" placeholder="Brewery holding event" v-model="newEventBreweryId">
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
      newEventTitle: "",
      newEventScheduledDate: "",
      newEventLocation: "",
      newEventContent: "",
      newEventImage: "",
      newEventBreweryId: ""
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
        name: this.newEventTitle,
        description: this.newEventScheduledDate,
        style: this.newEventLocation,
        image: this.newEventContent,
        abv: this.newEventImage,
        brewery_id: this.newEventBreweryId
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
