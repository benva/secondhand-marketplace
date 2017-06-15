<template>
<div class="dashboard">
  <h1>Welcome to your dashboard, {{user.username}}</h1>
      <a href="/logout">Log Out</a>
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
