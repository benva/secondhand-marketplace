<template>
<div class="dashboard">
  <h1>Welcome to your dashboard, {{user.username}}</h1>
      <a id='error-styles' href="/logout">Log Out</a>
  <ul class='listings'>
    <li v-for='listing in listings'>
      <a :href="'/listings/' + listing._id">{{listing.designer}}:  {{listing.title}}</a>

    </li>
  </ul>

</div>
</template>

<script>
export default {
    data: function() {
        return {
          listings: {}
        }
    }
}
</script>

<style lang="css">

</style>
