<template>
  
        
  <div id="blogContent" v-html="blogContentDom">
      

    </div>
  

</template>

<script>
import Engine from "../core/markdownEngine/Engine"
import "../core/markdownEngine/Engine.css"
export default {
    props:["markdownFileContent"],
    data(){
        return{
            name:"BlogContent",
            blogContentDom:"加载中...",
            engine:null

        }
    },
    beforeMount(){
        this.getBlogContent();
    },
    mounted(){
    },
    methods:{
        async getBlogContent(){
            if(this.markdownFileContent===null)
                return;
            try{
            this.engine=new Engine(this.markdownFileContent);
            this.blogContentDom=this.engine.getBlogContentDom();
            }catch(e){
                this.blogContentDom="获取内容失败"
                throw e;
            }
        }
    },
    watch:{
        markdownFileContent(){
            this.getBlogContent();
        }
    }
}
</script>

<style lang="less" scoped>
multiple-code{
    word-wrap:break-word;
    word-break: normal;
    background: black;
}
</style>>

