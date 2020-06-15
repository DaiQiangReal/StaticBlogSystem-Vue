<template>
    <div id="main">
        <div id="content">
            <div id="blogList">
                <BlogBrief
                    v-for="filename in blogList"
                    :key="filename"
                    :classification="classification"
                    :filename="filename"
                />

                <h1 v-if="blogList.length===0" style="text-align:center">未找到文件</h1>
            </div>
        </div>
    </div>
</template>

<script>
import Engine from "../core/markdownEngine/Engine"
import BlogBrief from "./BlogBrief"
export default {
    name:"RecentBLogList",
    components:[BlogBrief],
    data(){
        return{
            
        }
    },
    created(){
        
    },
    methods:{
         async getBlogUnixTime(classification, filename) {
            let markdownFilePath = "./blogs/" + classification + "/" + filename;
            let markdownFileContent = await (
                await fetch(markdownFilePath)
            ).text();
            let engine = new Engine(markdownFileContent);
            let blogHead = engine.getBlogHead();
            let blogDate = blogHead.date;
            let unixTime = new Date(blogDate).getTime();
            console.log(blogDate);
            console.log(unixTime);
            
            return unixTime;
        },
    }
};
</script>

<style>
</style>