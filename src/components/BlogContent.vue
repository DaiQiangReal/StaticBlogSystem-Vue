<template>
    <div>
        <div id="blogHead">
            <div id="title">
                {{blogHead.title}}
            </div>
            <div id="date">
                创建时间:{{blogHead.date}}
            </div>
            <div id="keyword">
                关键词: {{blogHead.keyword}}
            </div>
  </div>
  <div id="blogContent" v-html="blogContentDom">
      
  </div>
    </div>
  

</template>

<script>
import Engine from "../Utils/markdownEngine/Engine"
export default {
    data(){
        return{
            name:"BlogContent",
            blogPath:"",
            blogHead:"",
            blogContentMarkdown:"",
            blogContentDom:"",
            engine:null

        }
    },
    mounted(){
        let url=window.location.href;
        let reg=/\?[\w\W]+/;
        let parmas=reg.exec(url)[0]?reg.exec(url)[0]:null;
        if(parmas){
            parmas=parmas.slice(1).split("&");
            this.blogPath='./blogs/'+parmas[0].slice(5)+"/"+parmas[1].slice(9);
        }
        this.getBlogContent();
    },
    methods:{
        async getBlogContent(){
            try{
            this.blogContentMarkdown=await (await fetch(this.blogPath)).text();
            this.engine=new Engine(this.blogContentMarkdown);
            this.blogHead=this.engine.getBlogHead();
            this.blogContentDom=this.engine.getBlogContentDom();
            
            }catch(e){
                this.blogContentDom="获取内容失败"
                // throw e;
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>>

