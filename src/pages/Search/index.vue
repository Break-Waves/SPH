<template>
  <div>
    <h1>params参数-----{{this.$route.params.keywords}}</h1>
    <h1>query参数-----{{this.$route.query.k}}</h1>
    <TypeNav/>
  </div>
</template>

<script>
export default {
    name:"Search"
}
</script>

<style>

</style>