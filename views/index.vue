<template>
<div class="index">
  <h1>Welcome to Covenant</h1>

  <div v-if='user'>
    <a :href=" '/users/' + user.username">{{user.username}}</a>
    |
    <a href="/listings/create/">Create Listing</a>
  </div>
  <div v-else>
    <a href="/login">Login</a>
    |
    <a href="/users/register">Register</a>
  </div>

  <div class='home-listings'>
    <table>
      <h2 id='title'>All Listings</h2>
      <tr id='table-border'>
        <th>Title</th>
        <th>Designer</th>
        <th>Price</th>
        <th>Size</th>
        <th>Created At</th>
      </tr>
      <tr v-for='listing in listings'>
        <td><a :href="'/listings/' + listing._id">{{listing.title}}</a></td>
        <td>{{listing.designer}}</td>
        <td>{{listing.price}}</td>
        <td>{{listing.conversion}}</td>
        <td>{{listing.createdAt}}</td>
      </tr>

    </table>
  </div>

</div>
</template>

<script>
export default {
    data: function() {
        return {
          user: false
        }
    }
}
</script>

<style lang="css">
  .home-listings table{
    margin-top: 5%;
    display: inline-block;
  }
  table{
    border-collapse: collapse;
  }
  #table-border{
    border-bottom: .1em solid #2c3e50;
  }
</style>
