<template>
    <div id="app">
        <TopBar hightLight="index" />
        <div id="content">
            <div id="recentBlogList">
                <div>最近博文</div>
                <RecentBlogList :start="0" :end="5" />
            </div>
            
            
        </div>
    </div>
</template>

<script>
import TopBar from "../../components/TopBar";
import BlogsList from "../../components/BlogsList.vue";
import RecentBlogList from "../../components/RecentBlogList";
export default {
    name: "App",
    components: {
        TopBar,
        BlogsList,
        RecentBlogList
    }
};
</script>

<style lang="scss" scoped>
#app {
    #content {
        margin: 3rem 0 0 0;
        margin: 0 10vw;
        #recentBlogList{
            width: 40vw;
        }
    }
}
</style>


