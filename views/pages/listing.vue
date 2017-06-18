<template>
<div class="listing">


  <div v-for='photo in listing.photos' class='photos'>
    <img :src=" '/images/' + photo "/>
  </div>

  <div class='listing-info'>
    <h1>{{listing.designer}}</h1>
    <h2>{{listing.title}}</h2>
    <p>{{listing.description}}</p>
    <p>{{listing.category}}</p>
    <p>{{listing.conversion}}</p>
    <p>{{listing.price}}</p>
    <p><a :href="'/users/'+ listing.seller">{{listing.seller}}</a></p>

    <form v-if='bump.flag && own' method='post' :action="'/listings/'+ listing._id + '/bump' ">
      <input type='hidden' name='_csrf' :value='csrfToken' required/>
      <input type='hidden' name='_method' value='put' required/>
      <input type='submit' value='Bump!'/>
    </form>

    <h4 v-else>{{bump.hours}} Hours and {{bump.mins}} Minutes until the next bump</h4>

  </div>

  <!-- if own -->
  <div v-if='own'>
    <a :href=" '/listings/' + listing._id + '/edit' ">Edit</a>

  </div>




</div>
</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">


</style>
