<template>
  <div class="breweries-edit">
<!--     <h1>Editing: {{brewery.name}}</h1>

      <span>Delete this entire Brewery<button v-on:click="destroyBrewery(brewery)">Delete Profile</button></span>

    <form v-on:submit.prevent="submit()">
        <div>
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" placeholder="Brewery Name" v-model="brewery.name">
        </div>
        <div>
          <label for="address">Brewery Address:</label>
          <input type="text" class="form-control" placeholder="Brewery Address" v-model="brewery.address">
        </div>
        <div>
          <label for="profile image">Profile Image:</label>
          <input type="text" class="form-control" placeholder="Choose Profile Image" v-model="brewery.profile_img">
        </div>
      <button type="submit">Confirm Changes</button>
    </form> -->
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      brewery: {}
    };
  },
  created: function() {
    axios.get("/api/breweries/" + localStorage.getItem('user_id')).then(response => {
      this.brewery = response.data;
      console.log(this.brewery);
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.brewery.name,
        address: this.brewery.address,
        profile_img: this.brewery.profile_img
      };
      axios.patch("/api/breweries/" + localStorage.getItem('user_id'), params).then(response => {
        localStorage.setItem("user_name", this.brewery.name);
        this.$router.push("/breweries/" + this.brewery.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    destroyBrewery: function(brewery) {
      axios.delete("/api/breweries/" + this.brewery.id).then(response => {
        console.log("Brewery Removed", response.data);
        localStorage.removeItem("user_name");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>