<template>
    <div id="main">
        <TopBar :hightLight="classification"/>
        <div id="content">
            <BlogBrief v-for="blog in blogList" :key="blog" :markdownFilePath="'./blogs/'+classification+'/'+blog"/>
        </div>
    </div>
</template>

<script>
import TopBar from "../../components/TopBar"
import BlogBrief from "../../components/BlogBrief"
export default {
    name: "Classification",
    data() {
        return {
            classification:null,
            blogList:[]
        };
    },
    components: {
        TopBar,
        BlogBrief,
    },
    created() {
        let url = window.location.href;
        let reg = /\?classification=.+/;
        let parmas = reg.exec(url)[0] ? reg.exec(url)[0] : null;
        this.classification = parmas.slice(16);

        this.getBlogList();
        
    },
    mounted() {},
    methods: {
        async getBlogList(){
            let nameTxtCountent=await (await fetch("./blogs/"+this.classification+"/name.txt")).text();
            this.blogList=nameTxtCountent.split('\n').map((blogFile)=>blogFile.trim());
        }
    }
};
</script>

<style lang="less" scoped>
#main{
    #content{
        margin-top: 3rem;
    }
}
</style>