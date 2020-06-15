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
import BlogBrief from "./BlogBrief"
export default {
    name:"RecentBLogList",
    components:[BlogBrief],
    data(){
        return{
            
        }
    }
};
</script>

<style>
</style>