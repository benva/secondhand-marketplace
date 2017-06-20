<template>
<div class='index-messages'>

<h1 id='title'>Messages Inbox</h1>

<ul>
  <div v-for='conversation in conversations'>
    <li v-if='user !== conversation.from'>
      {{conversation.from}} : <a :href=" '/messages/' + conversation._id " >{{conversation.listing.title}} by {{conversation.listing.designer}} </a>
    </li>

    <li v-else>
      {{conversation.to}} : <a :href=" '/messages/' + conversation._id " >{{conversation.listing.title}} by {{conversation.listing.designer}} </a>
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
    console.log(this.user)
  }
}
</script>
