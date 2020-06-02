<template>
  <div id="app">
      <BlogsList :classification="'JS'"/>
  </div>
</template>

<script>
import BlogsList from './components/BlogsList.vue'

export default {
  name: 'App',
  components: {
    BlogsList,
  }
}
</script>

<style>
#app {

}
</style>
