<template>
  <div class="events-show">
    <img v-bind:src="event.image" alt="Event image">
    <h1>{{ event.title }} || {{event.scheduled_date}}</h1>
    <h2>{{event.location}}</h2>
    <p>{{event.content}}</p>

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
  methods: {}
};
</script>