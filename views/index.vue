<template>
<div class="index">
  <h1>Welcome to Covenant</h1>

  <div v-if="!user">
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
  </div>
  <div v-else>
    <a href="/logout">Log Out</a>
  </div>

</div>
</template>

<script>
export default {
    data: function() {
        return {}
    }
}
</script>

<style lang="css">

</style>
