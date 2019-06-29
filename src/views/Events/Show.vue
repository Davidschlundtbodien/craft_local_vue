<template>
  <div class="events-show">
    <h1>{{ event.title }}</h1>
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
      console.log(this.brewery);
    });
  },
  methods: {}
};
</script>