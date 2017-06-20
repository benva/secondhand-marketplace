<template>
<div id='conversation'>

  <h2>Topic: <a :href="'/listings/' + conversation.listing._id">{{conversation.listing.title}} by {{conversation.listing.designer}}</a></h2>
  <h3>Conversation with {{conversation.from}}</h3>
  <ul>
    <li v-for='message in conversation.messages'>{{message.from}} - {{message.body}} </li>
  </ul>
  <form method='post' :action="'/messages/' + conversation._id + '/reply'">
    <input type="hidden" name='_csrf' :value='csrfToken' />
    <textarea name="text" cols="25" rows='4'></textarea>
    <br />
    <input type='submit' value='Reply...'/>
  </form>
  <!-- block content
    ul
      each message, j in conversation.messages
        li FROM: #{message.from} MSG: #{message.body}
      br
      form(name="reply", method="post", action="/messages/#{conversation._id}/reply")
        input(required, type="hidden", name="_csrf", value=csrfToken)
        textarea(name="text")
        br
        button(type="submit", name="reply") Send Message -->
</div>

</template>

<script>
export default{
  data: function(){
    return {
      conversation: true,
    }
  },
  mounted: function(){
    console.log(this.conversation)
  }
}

</script>

<style>
</style>
