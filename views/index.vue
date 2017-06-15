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

</style>
