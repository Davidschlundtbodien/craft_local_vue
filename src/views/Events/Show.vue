<template>
  <div class="events-show">

    <button><router-link v-bind:to="'/events/' + event.id + '/edit'">Edit</router-link></button><br>
    <button v-on:click="destroyEvent(event)">Remove</button><br>

    <img v-bind:src="event.image" alt="Event image">
    <h1>{{ event.title }} || {{event.scheduled_date}}</h1>
    <h2>{{event.location}}</h2>
    <p>{{event.content}}</p>
    <div v-for="beer in event.beers">
      <h4>{{beer.name}}</h4>
      <h4>{{beer.style}} || {{beer.abv}}</h4>
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      event: {}
    };
  },
  created: function() {
    axios.get("/api/events/" + this.$route.params.id).then(response => {
      this.event = response.data;
      console.log(this.event);
    });
  },
  methods: {
    destroyEvent: function(beer) {
      axios.delete("/api/events/" + this.event.id).then(response => {
        console.log("Event Removed", response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>