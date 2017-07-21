<template>
<div>

<!-- Navigation bar -->
<nav class="navbar">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="/logo.png" alt="Give some life to your forgotten clothing">
    </a>
    <div class="navbar-burger" data-target="navMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="navbar-menu" id="navMenu">
    <div class="navbar-end" v-if="user">
      <a class="navbar-item" :href=" '/users/' + user.username">{{user.username}}</a>
      <a class="navbar-item" href="/listings/create/">Create Listing</a>
      <a class="navbar-item" href='/messages'>Messages</a>
      <a class="navbar-item" href='/logout'>Logout</a>
    </div>
    <div class="navbar-end" v-else>
      <a class="navbar-item" href="/login">Login</a>
      <a class="navbar-item" href="/users/register">Register</a>
    </div>
  </div>
</nav>

<div class="columns">
  <div class="filters column is-one-third">
    <!-- Side filter -->
    <aside class="menu">
      <p class="menu-label">Search</p>
      <input class="input search" type="text" placeholder="Designer, name, etc...">
      <p class="menu-label">Categories</p>
      <ul class="menu-list">
        <li><label class="checkbox"><input type="checkbox"> Outerwear</label></li>
        <li><label class="checkbox"><input type="checkbox"> Tops</label></li>
        <li><label class="checkbox"><input type="checkbox"> Bottoms</label></li>
        <li><label class="checkbox"><input type="checkbox"> Footwear</label></li>
        <li><label class="checkbox"><input type="checkbox"> Accessories</label></li>
      </ul>
      <p class="menu-label">Sizes</p>
      <ul class="menu-list">

      </ul>
      <p class="menu-label">Minimum price</p>
      <input class="input min-max" type="text" placeholder="Min">
      <p class="menu-label">Maximum price</p>
      <input class="input min-max" type="text" placeholder="Max">
      <br><br>
      <button class="button is-dark">Search</button>
    </aside>
  </div>
  <div class="listings column is-two-thirds">
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img src="http://via.placeholder.com/300x300">
            </figure>
          </div>
          <div class="card-content">
            <div class="content is-medium">
              <strong>Rick Owens</strong> Geobaskets
            </div>
            <footer class="card-footer">
              <div class="content is-small">
                $455 Size 10
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img src="http://via.placeholder.com/300x300">
            </figure>
          </div>
          <div class="card-content">
            <div class="content is-medium">
              <strong>Rick Owens</strong> Geobaskets
            </div>
            <footer class="card-footer">
              <div class="content is-small">
                $455 Size 10
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img src="http://via.placeholder.com/300x300">
            </figure>
          </div>
          <div class="card-content">
            <div class="content is-medium">
              <strong>Rick Owens</strong> Geobaskets
            </div>
            <footer class="card-footer">
              <div class="content is-small">
                $455 Size 10
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<!-- search mechanism-->
<!-- <div id='finder'>
  <form method='get' action='/finder'>
    <category-size category-p='Categories' size-p='Size'></category-size>
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
        <td>{{listing.size}}</td>
        <td>{{listing.createdAt}}</td>
        <td><img :src="'/images/' + listing.photos[0]"></td>
      </tr>

    </table>
  </div> -->

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

<!-- <style lang="css">
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
</style> -->
