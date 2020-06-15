<template>
  <div id="app">
      <TopBar hightLight="index"/>
      <RecentBlogList :start="0" :end="5"/>
  </div>
</template>

<script>
import TopBar from "../../components/TopBar"
import BlogsList from '../../components/BlogsList.vue'
import RecentBlogList from "../../components/RecentBlogList"
export default {
  name: 'App',
  components: {
      TopBar,
    BlogsList,
    RecentBlogList
  }
}
</script>

<style>
#app {

}
</style>
