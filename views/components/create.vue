<template>
<div class='create'>
  <h1>List Item</h1>
  <h5 v-if='error'>{{error}}</h5>

  <form method='post' action="/listings/create" enctype="multipart/form-data">
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='text' placeholder='Designer' name='designer' required/>
    <br />
    <input type='text' placeholder='Title' name='title' required/>
    <br />
    <input type='text' placeholder='Price' name='price' required/>
    <br />
    <select v-model="selected">
         <option selected hidden>Categories</option>
         <option value="outerwear">Outerwear</option>
         <option value="tops">Tops</option>
         <option value="bottoms">Bottoms</option>
         <option value="footwear">Footwear</option>
         <option value="Accessories">Accessories</option>
    </select>
    <br />
    <br />


    <input type='submit' />
  </form>
</div>
</template>

<script>
export default {
    data: function() {
        return {
          error: false,
          selected: "Categories"
        }
    }
}
</script>

<style lang='css'>

</style>
