<template>
  <div class="error">
    <h3>Error Page</h3>
<ul class='status'>
  <li>{{status}}</li>
  <li>{{error}}</li>
</ul>
  </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>


<style lang="css">
  .error{
    color: red;
  }
</style>
