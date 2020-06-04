<template>
  <div id="main">
      <div>
          {{classification}}
      </div>
      <hr>
      <a v-for="blogName in blogListData" :key="blogName" href="blog.html" target="_blank">
          {{blogName}}
      </a>
  </div>
</template>

<script>
import Engine from "../Utils/markdownEngine/Engine"
export default {
    props:['classification'],
    data(){
        return {
            name:"BlogsList",
            blogListData:null,
            components:{
            },
        }
    },
    computed:{
    
    },
    watch:{
    },
    mounted(){
        this.getBlogsListByClassification();
    },
    methods:{
        async getBlogsListByClassification(){
            if(!this.classification){
                console.log("try again after 100ms");
                setTimeout(this.getBlogsListByClassification,100);
                return;
            }
            let nameTxtCountent=await (await fetch("./blogs/"+this.classification+"/name.txt")).text();
            this.blogListData=nameTxtCountent.split('\n').map((blogFile)=>blogFile.trim())
        },
        async getBlogContentByFilename(blogFileName){
            let text=await (await fetch("./blogs/"+this.classification+"/"+blogFileName)).text();
        }
    },
    
}
</script>

<style lang="less" scoped>
div[id="main"]{
    border: 1px solid gray;
    padding: 1rem;
    width:10rem;
    a{
        display: block;
        text-decoration-line: none;
        margin: 0.2em;
    
        width:100%;
        word-wrap:break-word;;
        word-break: normal;
    }
}
</style>>
