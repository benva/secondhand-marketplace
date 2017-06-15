<template>
<div class="error">
  <h1>Error Page</h1>
  <div class='status'>
    <h3>{{status}}</h3>
    <h3>{{error}}</h3>
    <div>
      <img src="/error/notfound.png" style="width:619px;height:619px;"/>


    </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>


<style lang="css">
  .error{
    color: red;
  }
</style>
