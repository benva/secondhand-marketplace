<template>
<div>
  <h1>Welcome to Covenant</h1>

  <div v-if='user'>
    <a :href=" '/users/' + user.username">{{user.username}}</a>
    <span>|</span>
    <a href="/listings/create/">Create Listing</a>
  </div>

  <div v-else>
    <a href="/login">Login</a>
    <span>|</span>
    <a href="/users/register">Register</a>

  </div>
<br />

<!-- search mechanism-->
<div id='finder'>
  <form method='get' action='/finder'>
    <category-size></category-size>
    <br />
    <input type='text' name='finderSearch' placeholder='Enter designer, item name...'/>
    <br />
    <input type='text' name='minPrice' placeholder='Min Price'>
    <br />
    <input type='text' name='maxPrice' placeholder='Max Price'/>
    <br />
    <input type='submit' value='find' />
  </form>
</div>


  <div class='home-listings'>
    <table>
      <h2 id='title'>All Listings</h2>
      <tr id='table-border'>
        <th>Title</th>
        <th>Designer</th>
        <th>Price</th>
        <th>Category</th>
        <th>Size</th>
        <th>Created At</th>
      </tr>
      <tr v-for='listing in listings'>
        <td><a :href="'/listings/' + listing._id">{{listing.title}}</a></td>
        <td>{{listing.designer}}</td>
        <td>{{listing.price}}</td>
        <td>{{listing.category}}</td>
        <td>{{listing.conversion}}</td>
        <td>{{listing.createdAt}}</td>
      </tr>

    </table>
  </div>

</div>
</template>

<script>
export default{
  data(){
    return{
      error: false,
      user: null
    }
  }
}
</script>

<style lang="css">
  .home-listings table{
    margin-top: 2em;
    display: inline-block;
  }
  table{
    border-collapse: collapse;
    table-layout: fixed;
  }
  #table-border{
    border-bottom: .1em solid #2c3e50;
  }
  tr{
    padding: 10em;
  }
</style>
