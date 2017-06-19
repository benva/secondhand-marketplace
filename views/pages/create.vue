<template>
<div class='create'>
  <h1 id='title'>List Item</h1>
  <h5 v-if='error' id='error-styles'>{{error}}</h5>

  <form method='post' action='/listings/create' enctype='multipart/form-data'>
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='text' placeholder='Designer' name='designer' required/>
    <br />
    <input type='text' placeholder='Title' name='title' required/>
    <br />
    <textarea rows='4' cols='20' type='text' placeholder='Description' name='description' required></textarea>
    <br />
    <input type='text' placeholder='Price' name='price' required/>
    <br />
    <input type='file' name='photos' multiple required/>
    <br/>
    <category-size category-p='Categories' size-p='Size'></category-size>

    <br />
    <br />

    <input type='submit' />
  </form>
</div>
</template>

<script>
export default{
  data(){
    return{
      error: false,
    }
  }
}
</script>
<style>

</style>
