<template>
<div class='login'>
  <h1 id='title'>Login</h1>
  <h5 v-if='error' id='error-styles'>{{error}}</h5>
  <form method='post' action='/login'>
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='text' placeholder='User Name' name='username' required/>
    <br />
    <input type='text' placeholder='Password' name='password' required/>
    <br />
    <input type='submit' />
  </form>
</div>
</template>

<script>
export default {
    data: function() {
        return {
          error: false //for error messages
        }
    }
}
</script>

<style lang='css'>

</style>
