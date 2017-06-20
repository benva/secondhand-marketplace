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
    <p>{{listing.price}}</p>
    <p>{{conversion}}</p>
    <p><a :href="'/users/'+ listing.seller">{{listing.seller}}</a></p>
  </div>

  <!-- if own -->
  <div v-if='own'>
    <a :href=" '/listings/' + listing._id + '/edit' ">Edit</a>

    <form v-if='bump.flag && own' method='post' :action="'/listings/'+ listing._id + '/bump' ">
      <input type='hidden' name='_csrf' :value='csrfToken' required/>
      <input type='hidden' name='_method' value='put' required/>
      <input type='submit' value='Bump!'/>
    </form>

    <h4 v-else>{{bump.hours}} Hours and {{bump.mins}} Minutes until the next bump</h4>

  </div>

  <!-- just lookin and allow commenting-->
  <div v-if='(message.username !== listing.seller && message)'>
    <br />
    <h4>
      Message
      <a :href="'/users/' + listing.seller">{{listing.seller}}</a>
      about this listing
    </h4>
    <form method='post' :action="'/listings/' + listing._id + '/message'">
      <input type='hidden' name='_csrf' :value='csrfToken' required/>
      <textarea name="text" cols="25" rows='4'></textarea>
      <br />
      <input type='submit' value='Send Message' />
    </form>

  </div>

</div>
</template>

<script>
export default {
    data: function() {
        return {
          bump: {
            hours: '',
            minutes: '',
            flag: null,
            own: false,
            message: '',
            listing: ''
          }
        }
    },
    computed:{
      //converts the ugly sizing to pretty sizing
      conversion: function(){
        let conversion = this.sizing[this.listing.category].find(function(size){
          if (size.value === this[0]) {
            return size;
          }
        }, [this.listing.size])
        return conversion.text
      }
    },
    mounted: function(){

      console.log(this.message.username, 'whoms\'t is logged in')
      console.log(this.listing.seller)
    }
}
</script>

<style lang="css">


</style>
