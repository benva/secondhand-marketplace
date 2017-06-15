<template>
<div class="index">
  <h1>Welcome to Covenant</h1>

  <div v-if='user'>
    <a :href=" '/users/' + user.username">{{user.username}}</a>
    |
    <a href="/listings/create/">Create Listing</a>
    |
    <a href="/logout">Log Out</a>
  </div>
  <div v-else>
    <a href="/login">Login</a>
    <a href="/users/register">Register</a>
  </div>

  <div class='home-listings'>
    <table>
      <h3>All Listings</h3>
      <tr>
        <th>Title</th>
        <th>Designer</th>
        <th>Price</th>
        <th>Size</th>
        <th>Created At</th>
      </tr>
      <tr v-for='listing in listings'>
        <td>{{listing.title}}</td>
        <td>{{listing.designer}}</td>
        <td>{{listing.price}}</td>
        <td>{{listing.size}}</td>
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
  .home-listings h3{
    color: #2c5050;
  }
</style>
