<template>
    <div id="main">
        <div id="content">
            <div id="blogList">
                <BlogBrief
                    v-for="blog in recentBlogList"
                    :key="blog.blogName+blog.time"
                    :classification="blog.classification"
                    :filename="blog.blogName"
                />
                <h1 v-if="recentBlogList.length===0" style="text-align:center">未找到文件</h1>
            </div>
        </div>
    </div>
</template>

<script>
import Engine from "../core/markdownEngine/Engine"
import {getBlogUnixTime,getClassificationList,getBlogListByClassification} from "../core/Utils"
import BlogBrief from "./BlogBrief"
export default {
    name:"RecentBLogList",
    props:["start","end"],
    components:{BlogBrief},
    data(){
        return{
            recentBlogList:[]
        }
    },
    created(){
        this.calculateRecentBlogList();
    },
    methods:{
        async calculateRecentBlogList(){
            let classificationList=await getClassificationList();
            let allBlogList=[];
            for(let classification of classificationList){
                let blogList=await getBlogListByClassification(classification.folderName);  
                for(let blogName of blogList){
                    let time=await getBlogUnixTime(classification.folderName,blogName);
                    allBlogList.push({classification:classification.folderName,blogName,time})
                }
            }
            allBlogList.sort((blog0,blog1)=>blog1.time-blog0.time)
            this.recentBlogList=allBlogList.slice(this.start,this.end);
        },
    }
};
</script>

<style>
</style>