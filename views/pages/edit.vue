<template>
<div class='edit-page'>

  <h5 v-if='error' id='error-styles'>{{error}}</h5>

  <form method='post' :action="'/listings/' + id + '/edit'">
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='hidden' name='_method' value='put' required/>
    <input type='text' placeholder='Designer' :value='designer' name='designer' required/>
    <br />
    <input type='text' placeholder='Title' :value='listTitle' name='title' required/>
    <br />
    <input type='text' placeholder='Description' :value='description' name='description' required/>
    <br />
    <input type='text' placeholder='Price' :value='price' name='price' required/>
    <br />
    <!-- <input type='file' name='photos' multiple required/> -->
    <!-- <br/> -->
    <category-size :category='category'></category-size>
    <br />
    <br />
    <input type='submit' />
  </form>
    <br />
  <form method='post' :action="'/listings/' + id + '/delete' ">
    <input type='hidden' name='_csrf' :value='csrfToken'/>
    <input type='hidden' name='_method' value='delete'/>
    <input type='submit' value='delete'/>
  </form>

</div>
</template>

<script>
export default {
  data: function() {
    return {
      error: false
    }
  },

}
</script>

<style>

</style>
