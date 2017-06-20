<template>
<div class='index-messages'>

<h1 id='title'>Messages Inbox</h1>

<ul>
  <div v-for='item in conversations'>
    <li>
      {{item.from}} : <a :href=" '/messages/' + item._id " >{{item.listing.title}} by {{item.listing.designer}} </a>
    </li>
  </div>

</ul>



</div>

</template>

<script>
export default {
  data: function(){
    return{
      conversations: false,
    }
  },
  mounted: function(){

  }
}
</script>
