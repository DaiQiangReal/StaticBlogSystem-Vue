<template>
  <div id="app">
      <TopBar hightLight="index"/>
      <div id="content"><RecentBlogList :start="0" :end="5"/></div>
      
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

<style lang="scss" scoped>
#app{
    #content{
        margin: 3rem 0 0 0;
    }
}
</style>


