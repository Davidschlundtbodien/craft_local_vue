<template>
  <div class="events-edit">
    <h1>Editing: {{event.title}}</h1>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" placeholder="Event title" v-model="event.title">
        </div>
        <div>
          <label for="date">Scheduled date</label>
          <input type="text" class="form-control" id="date" placeholder="July 4 2019" v-model="event.scheduled_date">
        </div>
        <div>
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" placeholder="Taproom" v-model="event.location">
        </div>
        <div>
          <label for="content">Content</label>
          <input type="text" class="form-control" id="content" placeholder="Quick summary of event" v-model="event.content">
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" class="form-control" id="image" placeholder="Place an image url here" v-model="event.image">
        </div>
        <div class="container">
          <span v-for="beer in beers"><br>
            <label v-bind:for="beer.name">{{beer.name}}</label>
            <input type="checkbox" v-bind:id="beer.id" v-bind:value="beer.id" v-model="beerIds">
          </span>
        </div>



      <button type="submit">Confirm Changes</button>
    </form>
    <div>
      <button v-on:click="destroyEvent(event)">Remove Event</button>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      event: {},
      beers:[],
      beerIds: []
    };
  },
  created: function() {
    axios.get("/api/events/" + this.$route.params.id).then(response => {
      this.event = response.data;
      console.log(this.event);
      this.event.beers.forEach(beer => {
        this.beerIds.push(beer.id);
      });
    });

    axios.get("/api/breweries/" + localStorage.getItem('user_id')).then(response => {
      this.beers = response.data.beers;
      console.log(this.beers);
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.event.name,
        scheduled_date: this.event.scheduled_date,
        location: this.event.location,
        content: this.event.content,
        image: this.event.image,
        beer_ids: this.beerIds
      };
      axios.patch("/api/events/" + this.event.id, params).then(response => {
        this.$router.push("/events/" + this.event.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    destroyEvent: function(event) {
      axios.delete("/api/events/" + this.event.id).then(response => {
        console.log("Event Cancelled", response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    } 
  }
};
</script>
