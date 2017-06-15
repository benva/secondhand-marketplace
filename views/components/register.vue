<template>
<div class='register'>
  <h1>Registration</h1>
  <h5 v-if='error'>{{error}}</h5>

  <form method='post' action='/users/register'>
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='text' placeholder='User Name' name='username' required/>
    <br />
    <input type='text' placeholder='Password' name='password' required/>
    <br />
    <input type='text' placeholder='Email' name='email' required/>
    <br />
    <input type='submit' />
  </form>
</div>
</template>

<script>
export default {
    data: function() {
        return {
          error: false
        }
    }
}
</script>

<style lang='css'>

</style>
