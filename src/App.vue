<template>
  <div id="app">
    <Head/>
    <router-view></router-view>
    <Foot v-show="$route.meta.show" />
  </div>
</template>

<script>
import Head from './components/Head'
import Foot from './components/Foot'


export default {
  name: 'App',
  components: {
    Head,Foot
  },
  //App只会挂载一次，所以在此处请求数据可以避免多次请求重复数据
  mounted() {
    this.$store.dispatch("home/categoryList");
  },
}
</script>

<style>

</style>
