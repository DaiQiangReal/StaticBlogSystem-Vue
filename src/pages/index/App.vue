<template>
  <div id="app">
      <TopBar hightLight="index"/>
      <BlogsList :classification="'JS'"/>
  </div>
</template>

<script>
import TopBar from "../../components/TopBar"
import BlogsList from '../../components/BlogsList.vue'

export default {
  name: 'App',
  components: {
      TopBar,
    BlogsList,
  }
}
</script>

<style>
#app {

}
</style>
