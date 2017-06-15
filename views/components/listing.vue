<template>
<div class="listing">

<div v-for='photo in listing.photos' class='photos'>
  <img :src=" '/images/' + photo "/>
</div>

<div class='listing-info'>
  <h1>{{listing.designer}}</h1>
  <h2>{{listing.title}}</h2>
  <p>{{listing.description}}</p>
  <p>{{listing.conversion}}</p>
  <p>{{listing.price}}</p>

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
